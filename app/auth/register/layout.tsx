import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - VGirl',
  description: 'Create your VGirl account and start exploring premium AI companions, exclusive content, and personalized digital relationships.',
  openGraph: {
    title: 'Register - VGirl',
    description: 'Create your VGirl account and start exploring premium AI companions, exclusive content, and personalized digital relationships.',
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
