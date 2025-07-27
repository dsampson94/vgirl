'use client'

import { Card } from './Card'
import { Button } from './Button'
import { MonetizationDashboard } from './MonetizationDashboard'
import { getUserPermissions } from '@/lib/user-permissions'

interface User {
  id: string
  username: string
  role: string
  subscriptionTier: string
  credits: number
  messagesLeft: number
  totalSpent: number
  lastActive: string
}

interface UserSpecificDashboardProps {
  user: User
  onUpgrade?: () => void
}

export function UserSpecificDashboard({ user, onUpgrade }: UserSpecificDashboardProps) {
  const permissions = getUserPermissions(user as any)
  
  // Free tier users see upgrade prompts and limited features
  if (user.subscriptionTier === 'FREE') {
    return (
      <div className="space-y-6">
        {/* Welcome message with upgrade prompt */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to VGirl AI! 🌟</h2>
            <p className="text-white/80 mb-4">
              You have {user.messagesLeft} free messages remaining today.
            </p>
            <Button onClick={onUpgrade} className="bg-gradient-to-r from-purple-500 to-pink-500">
              Upgrade for Unlimited Access ✨
            </Button>
          </div>
        </Card>

        {/* Limited feature showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="text-center opacity-60">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="font-bold text-white mb-2">Basic Companions</h3>
              <p className="text-white/70 text-sm">Access to 3 public companions</p>
              <div className="mt-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2">
                <p className="text-yellow-300 text-xs">Upgrade for custom companions!</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center opacity-60">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-bold text-white mb-2">Limited Messages</h3>
              <p className="text-white/70 text-sm">10 messages per day</p>
              <div className="mt-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2">
                <p className="text-yellow-300 text-xs">Upgrade for unlimited chatting!</p>
              </div>
            </div>
          </Card>
        </div>

        <MonetizationDashboard user={user} />
      </div>
    )
  }

  // Basic tier users see moderate features with premium upgrade prompts
  if (user.subscriptionTier === 'BASIC') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Basic Member 💎</h2>
              <p className="text-white/80">
                {user.messagesLeft} messages remaining today
              </p>
            </div>
            <Button variant="secondary" onClick={onUpgrade}>
              Upgrade to Premium
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold text-white">Custom Companions</h3>
              <p className="text-white/70 text-sm">Create up to 3 companions</p>
            </div>
          </Card>

          <Card className="relative">
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              PREMIUM
            </div>
            <div className="text-center opacity-60">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold text-white">Group Chats</h3>
              <p className="text-white/70 text-sm">Premium feature</p>
            </div>
          </Card>

          <Card className="relative">
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              PREMIUM
            </div>
            <div className="text-center opacity-60">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-white">Advanced AI</h3>
              <p className="text-white/70 text-sm">Premium feature</p>
            </div>
          </Card>
        </div>

        <MonetizationDashboard user={user} />
      </div>
    )
  }

  // Premium tier users see full features with VIP upgrade prompts
  if (user.subscriptionTier === 'PREMIUM') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Premium Member ⭐</h2>
              <p className="text-white/80">Unlimited messages • All features unlocked</p>
            </div>
            <Button variant="ghost" onClick={onUpgrade} className="border-yellow-500 text-yellow-400">
              Upgrade to VIP 👑
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold text-white">Unlimited Companions</h3>
              <p className="text-green-400 text-sm">✓ Unlocked</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold text-white">Group Chats</h3>
              <p className="text-green-400 text-sm">✓ Unlocked</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-white">Advanced AI</h3>
              <p className="text-green-400 text-sm">✓ Unlocked</p>
            </div>
          </Card>

          <Card className="relative">
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              VIP
            </div>
            <div className="text-center opacity-60">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-white">Revenue Share</h3>
              <p className="text-white/70 text-sm">VIP feature</p>
            </div>
          </Card>
        </div>

        <MonetizationDashboard user={user} />
      </div>
    )
  }

  // VIP tier users see all features and analytics
  if (user.subscriptionTier === 'VIP') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">VIP Member 👑</h2>
              <p className="text-white/80">All premium features • Revenue sharing enabled</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-center">
                <p className="text-sm text-white/70">Monthly Earnings</p>
                <p className="text-lg font-bold text-green-400">$124.50</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold text-white">Everything</h3>
              <p className="text-green-400 text-sm">✓ Unlocked</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-white">Revenue Share</h3>
              <p className="text-green-400 text-sm">✓ 70/30 Split</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-white">Analytics</h3>
              <p className="text-green-400 text-sm">✓ Advanced</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-white">Custom APIs</h3>
              <p className="text-green-400 text-sm">✓ Available</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍💻</div>
              <h3 className="font-bold text-white">Dev Access</h3>
              <p className="text-green-400 text-sm">✓ Direct</p>
            </div>
          </Card>
        </div>

        {/* VIP Analytics Dashboard */}
        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Creator Analytics 📊</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1,234</p>
              <p className="text-white/70 text-sm">Total Chats</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-white/70 text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">$1,247</p>
              <p className="text-white/70 text-sm">Total Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">4.8⭐</p>
              <p className="text-white/70 text-sm">Avg Rating</p>
            </div>
          </div>
        </Card>

        <MonetizationDashboard user={user} />
      </div>
    )
  }

  // Fallback for unknown subscription tiers
  return <MonetizationDashboard user={user} />
}
