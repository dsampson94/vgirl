import Link from 'next/link'
import { useState } from 'react'
import { Button } from './Button'

interface NavItem {
  href: string
  label: string
  icon: string
}

interface MobileNavProps {
  currentUser?: {
    credits: number
    username: string
  }
  onBuyCredits?: () => void
  navItems?: NavItem[]
}

export function MobileNav({ 
  currentUser, 
  onBuyCredits,
  navItems = []
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultNavItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/companions', label: 'Companions', icon: '💫' },
    { href: '/messages', label: 'Messages', icon: '💬' },
    { href: '/store', label: 'Store', icon: '🎁' },
    { href: '/profile', label: 'Profile', icon: '👤' }
  ]

  const items = navItems.length > 0 ? navItems : defaultNavItems

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">V</span>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              VGirl
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {items.slice(0, 4).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-3">
            {/* Credits Display */}
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <span className="text-yellow-400 text-sm">💎</span>
                <span className="text-white text-sm font-medium">{currentUser.credits}</span>
              </div>
            )}

            {/* Buy Credits Button */}
            {onBuyCredits && (
              <Button
                onClick={onBuyCredits}
                size="sm"
                className="hidden sm:flex"
              >
                <span className="text-sm">Buy Credits</span>
                <span>✨</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="space-y-2">
              {items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Info */}
              {currentUser && (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{currentUser.username}</p>
                      <p className="text-white/70 text-xs">{currentUser.credits} credits</p>
                    </div>
                  </div>
                  {onBuyCredits && (
                    <Button onClick={onBuyCredits} size="sm">
                      Buy More
                    </Button>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
