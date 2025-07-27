'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-white">VGirl</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/auth/login" className="text-white hover:text-purple-300">
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl hover:opacity-90"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Meet Your Perfect
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Create meaningful connections with AI companions designed to understand and support you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/dashboard"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg hover:bg-white/10"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose VGirl?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/10 text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-white mb-3">Unique Personalities</h3>
              <p className="text-white/80">Each AI companion has their own personality and interests.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/10 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-3">Natural Conversations</h3>
              <p className="text-white/80">Advanced AI that understands and remembers you.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/10 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">Private & Secure</h3>
              <p className="text-white/80">Your conversations are private and secure.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
