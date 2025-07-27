'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LoadingScreen } from '@/components/ui/Loading'
import { UserSpecificDashboard } from '@/components/ui/UserSpecificDashboard'

interface User {
  id: string
  username: string
  email: string
  role: string
  credits: number
  subscriptionTier: string
  messagesLeft: number
  lastActive: string
}

interface VGirl {
  id: string
  name: string
  bio?: string
  _count: {
    subscribers: number
  }
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [vgirls, setVgirls] = useState<VGirl[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for now - replace with real API calls
        setCurrentUser({
          id: '1',
          username: 'Demo User',
          email: 'demo@example.com',
          role: 'USER',
          credits: 25,
          subscriptionTier: 'FREE',
          messagesLeft: 8,
          lastActive: new Date().toISOString()
        })

        setVgirls([
          {
            id: '1',
            name: 'Luna',
            bio: 'Mystical and wise companion',
            _count: { subscribers: 150 }
          },
          {
            id: '2', 
            name: 'Aria',
            bio: 'Energetic and creative',
            _count: { subscribers: 89 }
          }
        ])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const startChat = async (vgirlId: string) => {
    // In a real app, this would create a conversation
    window.location.href = `/chat/${vgirlId}`
  }

  if (loading) {
    return <LoadingScreen message="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="px-4 py-6 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Welcome back, {currentUser?.username}! 👋
              </h1>
              <p className="text-white/70 mt-1">
                You have {currentUser?.credits} credits and {currentUser?.messagesLeft} messages left today
              </p>
            </div>
            <Button as={Link} href="/create-vgirl">
              Create Companion ✨
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 pb-6 md:px-6 lg:px-8 md:pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* User-Specific Features */}
          <UserSpecificDashboard 
            user={currentUser ? {
              id: currentUser.id,
              username: currentUser.username,
              role: currentUser.role,
              subscriptionTier: currentUser.subscriptionTier,
              credits: currentUser.credits,
              messagesLeft: currentUser.messagesLeft,
              totalSpent: 0,
              lastActive: currentUser.lastActive
            } : {
              id: '',
              username: 'Guest',
              role: 'USER',
              subscriptionTier: 'FREE',
              credits: 0,
              messagesLeft: 0,
              totalSpent: 0,
              lastActive: new Date().toISOString()
            }}
            onUpgrade={() => alert('Upgrade feature coming soon!')}
          />

          {/* Companions Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Companions</h2>
              <Link href="/create-vgirl" className="text-purple-400 hover:text-purple-300 text-sm">
                Create new →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vgirls.map(vgirl => (
                <Card key={vgirl.id} hover>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                      💫
                    </div>
                    <h3 className="text-lg font-bold text-white">{vgirl.name}</h3>
                    <p className="text-white/70 text-sm mt-1">{vgirl.bio}</p>
                    <p className="text-white/50 text-xs mt-2">{vgirl._count.subscribers} subscribers</p>
                  </div>
                  
                  <Button
                    onClick={() => startChat(vgirl.id)}
                    fullWidth
                    size="sm"
                  >
                    Start Chat 💬
                  </Button>
                </Card>
              ))}
              
              {vgirls.length === 0 && (
                <div className="col-span-full">
                  <Card className="text-center py-12">
                    <div className="text-6xl mb-4">💫</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Companions Yet</h3>
                    <p className="text-white/70 mb-6">Create your first AI companion to get started!</p>
                    <Button as={Link} href="/create-vgirl">
                      Create Your First Companion ✨
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card hover className="text-center p-6">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-white mb-1">Explore</h3>
                <p className="text-white/70 text-sm">Discover new companions</p>
              </Card>

              <Card hover className="text-center p-6">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-bold text-white mb-1">Analytics</h3>
                <p className="text-white/70 text-sm">View your activity</p>
              </Card>

              <Card hover className="text-center p-6">
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="font-bold text-white mb-1">Settings</h3>
                <p className="text-white/70 text-sm">Customize preferences</p>
              </Card>

              <Card hover className="text-center p-6">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-bold text-white mb-1">Premium</h3>
                <p className="text-white/70 text-sm">Upgrade your account</p>
              </Card>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
