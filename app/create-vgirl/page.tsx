'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateVGirlPage() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
    tags: '',
    maturity: 'SAFE',
    personality: {
      traits: [],
      interests: [],
      communicationStyle: 'friendly'
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/vgirls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ownerId: 'temp-user-id', // In production, get from auth context
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          creationCostCents: 1000, // $10 cost
        }),
      })

      if (response.ok) {
        const vgirl = await response.json()
        router.push(`/vgirls/${vgirl.id}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create VGirl')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePersonalityChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [field]: value
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create New VGirl</h1>
            </div>
            
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              Cancel
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter VGirl name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maturity Level
                </label>
                <select
                  name="maturity"
                  value={formData.maturity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="SAFE">Safe</option>
                  <option value="NSFW">NSFW</option>
                  <option value="EXPLICIT">Explicit</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                placeholder="Describe your VGirl..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                placeholder="anime, cute, fantasy (comma separated)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas
              </p>
            </div>
          </div>

          {/* Personality Configuration */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Personality</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Style
                </label>
                <select
                  value={formData.personality.communicationStyle}
                  onChange={(e) => handlePersonalityChange('communicationStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="friendly">Friendly</option>
                  <option value="flirty">Flirty</option>
                  <option value="shy">Shy</option>
                  <option value="confident">Confident</option>
                  <option value="mysterious">Mysterious</option>
                  <option value="playful">Playful</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Personality Traits
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Sweet', 'Sarcastic', 'Intellectual', 'Adventurous', 'Artistic', 'Sporty', 'Romantic', 'Humorous', 'Caring'].map((trait) => (
                    <label key={trait} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        onChange={(e) => {
                          const traits = formData.personality.traits || []
                          if (e.target.checked) {
                            handlePersonalityChange('traits', [...traits, trait])
                          } else {
                            handlePersonalityChange('traits', traits.filter(t => t !== trait))
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">{trait}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Interests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Gaming', 'Music', 'Movies', 'Books', 'Travel', 'Food', 'Fashion', 'Technology', 'Nature'].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        onChange={(e) => {
                          const interests = formData.personality.interests || []
                          if (e.target.checked) {
                            handlePersonalityChange('interests', [...interests, interest])
                          } else {
                            handlePersonalityChange('interests', interests.filter(i => i !== interest))
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Generation Preview */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">AI Generation Preview</h2>
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {formData.name || 'Your VGirl'}
              </h3>
              <p className="text-gray-500 mb-4">
                {formData.bio || 'Bio will appear here...'}
              </p>
              <div className="flex justify-center space-x-2">
                {formData.tags.split(',').filter(Boolean).slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Creation Cost: $10.00
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This will deduct 1000 credits from your account or charge $10.00 if you don't have enough credits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md text-sm font-medium hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating VGirl...
                </div>
              ) : (
                'Create VGirl'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
