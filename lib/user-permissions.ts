import { SUBSCRIPTION_TIERS, USER_ROLES, type SubscriptionTier, type UserRole } from '@/lib/pricing'

interface User {
  id: string
  username: string
  role: UserRole
  subscriptionTier: SubscriptionTier
  credits: number
  messagesLeft: number
  totalSpent: number
}

export function getUserPermissions(user: User) {
  const tier = SUBSCRIPTION_TIERS[user.subscriptionTier]
  const isCreator = user.role === USER_ROLES.CREATOR
  const isAdmin = user.role === USER_ROLES.ADMIN
  const isPremium = user.subscriptionTier !== 'FREE'
  
  return {
    // Messaging permissions
    canSendMessages: user.messagesLeft > 0 || user.subscriptionTier === 'VIP',
    dailyMessageLimit: tier.dailyMessages,
    messageCreditsRequired: user.subscriptionTier === 'VIP' ? 0 : 1,
    
    // Content permissions
    canCreateCompanions: isCreator || isAdmin || user.subscriptionTier === 'PREMIUM' || user.subscriptionTier === 'VIP',
    canAccessPremiumCompanions: isPremium || isAdmin,
    canAccessVIPCompanions: user.subscriptionTier === 'VIP' || isAdmin,
    
    // Monetization permissions
    canEarnRevenue: isCreator || isAdmin,
    canCustomizePersonality: user.subscriptionTier === 'PREMIUM' || user.subscriptionTier === 'VIP' || isAdmin,
    
    // Platform permissions
    isAdmin,
    isCreator,
    isPremium,
    
    // Feature access
    hasAdvancedChat: isPremium || isAdmin,
    hasPrioritySupport: isPremium || isAdmin,
    hasEarlyAccess: user.subscriptionTier === 'VIP' || isAdmin
  }
}

export function getUserBadges(user: User) {
  const badges = []
  
  if (user.role === USER_ROLES.ADMIN) {
    badges.push({ text: 'Admin', color: 'bg-red-500', icon: '👑' })
  }
  
  if (user.role === USER_ROLES.CREATOR) {
    badges.push({ text: 'Creator', color: 'bg-purple-500', icon: '✨' })
  }
  
  if (user.subscriptionTier === 'VIP') {
    badges.push({ text: 'VIP', color: 'bg-yellow-500', icon: '👑' })
  } else if (user.subscriptionTier === 'PREMIUM') {
    badges.push({ text: 'Premium', color: 'bg-purple-500', icon: '💎' })
  } else if (user.subscriptionTier === 'BASIC') {
    badges.push({ text: 'Basic', color: 'bg-blue-500', icon: '⭐' })
  }
  
  // Spending tier badges
  if (user.totalSpent >= 10000) { // $100+
    badges.push({ text: 'Diamond', color: 'bg-cyan-500', icon: '💎' })
  } else if (user.totalSpent >= 5000) { // $50+
    badges.push({ text: 'Gold', color: 'bg-yellow-500', icon: '🏆' })
  } else if (user.totalSpent >= 2000) { // $20+
    badges.push({ text: 'Silver', color: 'bg-gray-400', icon: '🥈' })
  }
  
  return badges
}

export function getNextUpgradeOption(user: User) {
  const currentTier = user.subscriptionTier
  
  switch (currentTier) {
    case 'FREE':
      return {
        tier: 'BASIC',
        benefits: ['50 daily messages', '100 bonus credits', 'Premium companions'],
        urgency: 'Limited time: First month 50% off!'
      }
    case 'BASIC':
      return {
        tier: 'PREMIUM',
        benefits: ['150 daily messages', 'Create companions', 'Exclusive access'],
        urgency: 'Most popular upgrade!'
      }
    case 'PREMIUM':
      return {
        tier: 'VIP',
        benefits: ['Unlimited messages', 'VIP companions', 'Early access'],
        urgency: 'Join the elite VIP club!'
      }
    default:
      return null
  }
}

export function calculateMessageCost(user: User, vgirl: any) {
  const permissions = getUserPermissions(user)
  
  // VIP users get free messages
  if (user.subscriptionTier === 'VIP') return 0
  
  // Base cost from VGirl settings or default
  const baseCost = vgirl?.messagePrice || 1
  
  // Premium users get discounts
  if (user.subscriptionTier === 'PREMIUM') return Math.max(1, baseCost * 0.8)
  if (user.subscriptionTier === 'BASIC') return Math.max(1, baseCost * 0.9)
  
  return baseCost
}
