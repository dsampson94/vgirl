import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - VGirl',
  description: 'Sign in to your VGirl account to access your AI companions, exclusive content, and personalized experiences.',
  openGraph: {
    title: 'Login - VGirl',
    description: 'Sign in to your VGirl account to access your AI companions, exclusive content, and personalized experiences.',
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
