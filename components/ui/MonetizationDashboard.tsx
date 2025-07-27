'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { Modal } from './Modal'
import { SUBSCRIPTION_TIERS, CREDIT_PACKAGES } from '@/lib/pricing'
import { getUserPermissions, getUserBadges, getNextUpgradeOption } from '@/lib/user-permissions'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

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

interface MonetizationDashboardProps {
  user: User
  onPurchaseComplete?: () => void
}

export function MonetizationDashboard({ user, onPurchaseComplete }: MonetizationDashboardProps) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedCredits, setSelectedCredits] = useState<string | null>(null)

  const permissions = getUserPermissions(user as any)
  const badges = getUserBadges(user as any)
  const nextUpgrade = getNextUpgradeOption(user as any)
  const currentTier = SUBSCRIPTION_TIERS[user.subscriptionTier as keyof typeof SUBSCRIPTION_TIERS]

  const handlePayPalApprove = async (data: any, actions: any, type: 'subscription' | 'credits') => {
    try {
      const order = await actions.order.capture()
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount: type === 'subscription' ? 
            SUBSCRIPTION_TIERS[selectedPlan as keyof typeof SUBSCRIPTION_TIERS]?.price :
            CREDIT_PACKAGES.find(p => p.id === selectedCredits)?.price,
          paypalOrderId: order.id,
          type: type === 'subscription' ? 'SUBSCRIPTION' : 'CREDIT_PURCHASE',
          details: type === 'subscription' ? { tier: selectedPlan } : { package: selectedCredits }
        })
      })

      if (response.ok) {
        alert(type === 'subscription' ? 'Subscription upgraded successfully!' : 'Credits purchased successfully!')
        setShowSubscriptionModal(false)
        setShowCreditsModal(false)
        onPurchaseComplete?.()
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* User Status Card */}
      <Card className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${currentTier.color} opacity-10`}></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{user.username}</h3>
                <div className="flex items-center space-x-2">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${badge.color} flex items-center gap-1`}
                    >
                      <span>{badge.icon}</span>
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{user.credits}</p>
              <p className="text-white/70 text-sm">Credits</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-white">
                {user.messagesLeft === -1 ? '∞' : user.messagesLeft}
              </p>
              <p className="text-white/70 text-xs">Messages Left</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{currentTier.name}</p>
              <p className="text-white/70 text-xs">Current Plan</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">${(user.totalSpent / 100).toFixed(2)}</p>
              <p className="text-white/70 text-xs">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-400">Active</p>
              <p className="text-white/70 text-xs">Status</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card hover className="cursor-pointer" onClick={() => setShowCreditsModal(true)}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white mb-1">Buy Credits</h4>
              <p className="text-white/70 text-sm">Get more credits to continue chatting</p>
            </div>
            <div className="text-3xl">💎</div>
          </div>
        </Card>

        {nextUpgrade && (
          <Card hover className="cursor-pointer relative overflow-hidden" onClick={() => setShowSubscriptionModal(true)}>
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
              UPGRADE
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white mb-1">Upgrade to {SUBSCRIPTION_TIERS[nextUpgrade.tier as keyof typeof SUBSCRIPTION_TIERS].name}</h4>
                <p className="text-white/70 text-sm">{nextUpgrade.urgency}</p>
              </div>
              <div className="text-3xl">🚀</div>
            </div>
          </Card>
        )}
      </div>

      {/* Subscription Plans Modal */}
      <Modal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        title="Choose Your Plan"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(SUBSCRIPTION_TIERS).filter(([key]) => key !== 'FREE').map(([key, tier]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                selectedPlan === key
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                  POPULAR
                </div>
              )}
              <div className="text-center mb-3">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-3xl font-bold text-white">${tier.price}</p>
                <p className="text-white/70 text-sm">per month</p>
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="text-white/90 text-sm flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
            currency: "USD"
          }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                const plan = SUBSCRIPTION_TIERS[selectedPlan as keyof typeof SUBSCRIPTION_TIERS]
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: {
                      currency_code: "USD",
                      value: plan.price.toString()
                    },
                    description: `${plan.name} Subscription - Monthly`
                  }]
                })
              }}
              onApprove={(data, actions) => handlePayPalApprove(data, actions, 'subscription')}
              onError={(err) => {
                console.error('PayPal error:', err)
                alert('Payment failed. Please try again.')
              }}
            />
          </PayPalScriptProvider>
        )}
      </Modal>

      {/* Credits Modal */}
      <Modal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        title="Buy Credits"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedCredits(pkg.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                selectedCredits === pkg.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                  BEST VALUE
                </div>
              )}
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                <p className="text-2xl font-bold text-white">{pkg.credits + pkg.bonus} Credits</p>
                {pkg.bonus > 0 && (
                  <p className="text-green-400 text-sm">+{pkg.bonus} Bonus!</p>
                )}
                <p className="text-white/70 text-lg font-bold">${pkg.price}</p>
              </div>
              <p className="text-white/70 text-sm text-center">{pkg.description}</p>
            </div>
          ))}
        </div>

        {selectedCredits && (
          <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
            currency: "USD"
          }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                const pkg = CREDIT_PACKAGES.find(p => p.id === selectedCredits)!
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: {
                      currency_code: "USD",
                      value: pkg.price.toString()
                    },
                    description: `${pkg.name} - ${pkg.credits + pkg.bonus} Credits`
                  }]
                })
              }}
              onApprove={(data, actions) => handlePayPalApprove(data, actions, 'credits')}
              onError={(err) => {
                console.error('PayPal error:', err)
                alert('Payment failed. Please try again.')
              }}
            />
          </PayPalScriptProvider>
        )}
      </Modal>
    </div>
  )
}
