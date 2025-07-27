export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    credits: 10,
    dailyMessages: 10,
    features: [
      '10 free messages daily',
      'Access to public companions',
      'Basic chat features'
    ],
    color: 'from-gray-400 to-gray-500',
    popular: false
  },
  BASIC: {
    name: 'Basic',
    price: 9.99,
    credits: 100,
    dailyMessages: 50,
    features: [
      '50 messages daily',
      '100 bonus credits',
      'Priority support',
      'Access to premium companions'
    ],
    color: 'from-blue-400 to-blue-500',
    popular: false
  },
  PREMIUM: {
    name: 'Premium',
    price: 19.99,
    credits: 250,
    dailyMessages: 150,
    features: [
      '150 messages daily',
      '250 bonus credits',
      'Exclusive companions access',
      'Custom companion creation',
      'Priority chat responses'
    ],
    color: 'from-purple-400 to-purple-500',
    popular: true
  },
  VIP: {
    name: 'VIP',
    price: 39.99,
    credits: 500,
    dailyMessages: -1, // Unlimited
    features: [
      'Unlimited messages',
      '500 bonus credits monthly',
      'VIP-only companions',
      'Early access to new features',
      'Custom companion personalities',
      'Priority customer support'
    ],
    color: 'from-yellow-400 to-orange-500',
    badge: '👑',
    popular: false
  }
} as const

export const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 50,
    price: 4.99,
    bonus: 0,
    description: 'Perfect for casual conversations',
    popular: false
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    credits: 150,
    price: 12.99,
    bonus: 25,
    description: 'Most popular choice - best value!',
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    credits: 300,
    price: 24.99,
    bonus: 75,
    description: 'For power users and creators',
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    credits: 650,
    price: 49.99,
    bonus: 150,
    description: 'Maximum value with huge bonus',
    popular: false
  }
] as const

export const USER_ROLES = {
  USER: 'USER',
  CREATOR: 'CREATOR', // Can create VGirls and earn revenue
  PREMIUM: 'PREMIUM', // Upgraded user with benefits
  ADMIN: 'ADMIN'
} as const

export const MONETIZATION_FEATURES = {
  // Message costs by tier
  MESSAGE_COSTS: {
    FREE: 1,
    BASIC: 1,
    PREMIUM: 1,
    VIP: 0 // Free messages for VIP
  },
  
  // Revenue sharing for creators
  CREATOR_REVENUE_SHARE: 0.7, // 70% to creator, 30% to platform
  
  // Engagement bonuses
  DAILY_LOGIN_BONUS: 5, // 5 free credits for daily login
  REFERRAL_BONUS: 25, // 25 credits for successful referral
  
  // Gamification
  ACHIEVEMENT_REWARDS: {
    FIRST_CHAT: 10,
    DAILY_STREAK_7: 20,
    DAILY_STREAK_30: 100,
    REFERRED_FRIEND: 25,
    VIP_UPGRADE: 100
  }
} as const

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS
export type UserRole = keyof typeof USER_ROLES
