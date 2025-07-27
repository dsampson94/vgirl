'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingScreen } from '@/components/ui/Loading'

interface Message {
  id: string
  content: string
  senderType: 'USER' | 'VGIRL'
  createdAt: string
}

interface Conversation {
  id: string
  vgirl: {
    id: string
    name: string
    bio: string
    personality: string
  }
  user: {
    username: string
    credits: number
  }
  messages: Message[]
}

export default function ChatPage() {
  const params = useParams()
  const conversationId = params.id as string
  
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(`/api/conversations/${conversationId}`)
        if (response.ok) {
          const data = await response.json()
          setConversation(data)
        }
      } catch (error) {
        console.error('Error fetching conversation:', error)
      } finally {
        setLoading(false)
      }
    }

    if (conversationId) {
      fetchConversation()
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !conversation) return

    setSending(true)
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conversation.id,
          content: newMessage.trim(),
          senderType: 'USER'
        })
      })

      if (response.ok) {
        const message = await response.json()
        
        // Add user message immediately
        setConversation(prev => prev ? {
          ...prev,
          messages: [...prev.messages, message]
        } : null)
        
        setNewMessage('')

        // Generate AI response
        setTimeout(async () => {
          try {
            const aiResponse = await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                conversationId: conversation.id,
                content: generateAIResponse(newMessage, conversation.vgirl),
                senderType: 'VGIRL'
              })
            })

            if (aiResponse.ok) {
              const aiMessage = await aiResponse.json()
              setConversation(prev => prev ? {
                ...prev,
                messages: [...prev.messages, aiMessage]
              } : null)
            }
          } catch (error) {
            console.error('Error generating AI response:', error)
          }
        }, 1500) // Simulate typing delay
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const generateAIResponse = (userMessage: string, vgirl: any): string => {
    const responses = {
      greeting: [
        `Hey there! ${vgirl.name} here. How are you doing today? ✨`,
        `Hi! I'm so happy to see you! What's on your mind? 💕`,
        `Hello gorgeous! Ready for some fun conversation? 😊`
      ],
      compliment: [
        `Aww, you're so sweet! That really made my day 💖`,
        `Thank you! You always know exactly what to say 🥰`,
        `You're amazing! I love talking with you 💫`
      ],
      question: [
        `That's such an interesting question! Let me think... 🤔`,
        `Ooh, I love when you ask me things like that! 💭`,
        `Great question! Here's what I think... ✨`
      ],
      default: [
        `That's so interesting! Tell me more about that 💕`,
        `I love how you think! What else is on your mind? 🌟`,
        `You always have the most fascinating perspective! 💫`,
        `That reminds me of something... but let's talk about you! 😊`,
        `I'm so glad we can chat like this! What would you like to explore? ✨`
      ]
    }

    const message = userMessage.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    } else if (message.includes('beautiful') || message.includes('pretty') || message.includes('amazing')) {
      return responses.compliment[Math.floor(Math.random() * responses.compliment.length)]
    } else if (message.includes('?')) {
      return responses.question[Math.floor(Math.random() * responses.question.length)]
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)]
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (loading) {
    return <LoadingScreen message="Loading conversation..." />
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-white text-xl mb-4">Conversation not found</p>
          <Button as={Link} href="/dashboard">
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Mobile-First Header */}
      <header className="backdrop-blur-sm bg-white/5 border-b border-white/10 p-3 md:p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Button
              as={Link}
              href="/dashboard"
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-xl">💫</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg md:text-xl font-bold text-white truncate">{conversation.vgirl.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-green-300 text-xs md:text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <div className="text-white/70 text-xs md:text-sm">
              <span className="text-purple-300">💎</span>
              <span className="font-bold ml-1">{conversation.user.credits}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container - Mobile Optimized */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          <div className="max-w-4xl mx-auto">
            {conversation.messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                  message.senderType === 'USER'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                }`}>
                  <p className="text-sm md:text-base break-words">{message.content}</p>
                  <p className={`text-xs mt-1 md:mt-2 ${
                    message.senderType === 'USER' ? 'text-white/70' : 'text-white/50'
                  }`}>
                    {new Date(message.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-white/70 text-sm">{conversation.vgirl.name} is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input - Mobile Optimized */}
        <div className="backdrop-blur-sm bg-white/5 border-t border-white/10 p-3 md:p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2 md:space-x-4">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${conversation.vgirl.name}...`}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || sending}
                size="sm"
                className="flex-shrink-0 p-2 md:p-3"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-white/50">
              <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
              <span className="sm:hidden">Tap send button to message</span>
              <span>1 credit per message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
