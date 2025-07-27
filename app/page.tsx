import { Metadata } from 'next'
import LandingPage from './landing'

export const metadata: Metadata = {
  title: 'VGirl - Premium AI Virtual Companions',
  description: 'Create, customize, and interact with premium AI virtual companions. Join VGirl for immersive conversations, exclusive content, and personalized AI experiences.',
  keywords: ['AI companions', 'virtual girlfriends', 'AI chat', 'premium content', 'digital relationships', 'virtual dating', 'AI personalities'],
  openGraph: {
    title: 'VGirl - Premium AI Virtual Companions',
    description: 'Create, customize, and interact with premium AI virtual companions. Join VGirl for immersive conversations, exclusive content, and personalized AI experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VGirl - Premium AI Virtual Companions',
      },
    ],
  },
}

export default function Home() {
  return <LandingPage />
}
