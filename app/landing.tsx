'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            <span className="text-2xl font-bold text-white">VGirl</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-white hover:text-pink-300 transition-colors">
              Features
            </Link>
            <Link href="#gallery" className="text-white hover:text-pink-300 transition-colors">
              Gallery
            </Link>
            <Link href="#pricing" className="text-white hover:text-pink-300 transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-white hover:text-pink-300 transition-colors">
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-purple-900/95 backdrop-blur-sm border-t border-purple-700">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block text-white hover:text-pink-300 transition-colors">
                Features
              </Link>
              <Link href="#gallery" className="block text-white hover:text-pink-300 transition-colors">
                Gallery
              </Link>
              <Link href="#pricing" className="block text-white hover:text-pink-300 transition-colors">
                Pricing
              </Link>
              <Link href="/auth/login" className="block text-white hover:text-pink-300 transition-colors">
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-center hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Create Your Perfect
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> AI Girl</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto">
            Generate stunning AI companions with advanced personality, engage in conversations, and build your dream collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Start Creating Now
            </Link>
            <Link 
              href="#gallery"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-900 transition-all"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-pink-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Generation</h3>
              <p className="text-purple-200">Create unique AI girls with advanced neural networks and customize every detail</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Conversations</h3>
              <p className="text-purple-200">Engage in meaningful conversations with personality-driven AI companions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Monetization</h3>
              <p className="text-purple-200">Create premium content, sell subscriptions, and earn from your AI creations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Featured Creations
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:transform hover:scale-105 transition-all">
                <div className="aspect-square bg-gradient-to-br from-pink-400 to-purple-600"></div>
                <div className="p-4">
                  <h3 className="text-white font-semibold">AI Girl {i}</h3>
                  <p className="text-purple-200 text-sm">by Creator{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Create Your Dream AI Girl?
          </h2>
          <p className="text-xl text-purple-200 mb-12">
            Join thousands of creators building the future of AI companions
          </p>
          <Link 
            href="/auth/register"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            <span className="text-2xl font-bold text-white">VGirl</span>
          </div>
          <p className="text-purple-200">© 2025 VGirl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
