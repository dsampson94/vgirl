import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - VGirl',
  description: 'Manage your VGirl account, view your AI companions, track your activities, and access exclusive content from your personal dashboard.',
  openGraph: {
    title: 'Dashboard - VGirl',
    description: 'Manage your VGirl account, view your AI companions, track your activities, and access exclusive content from your personal dashboard.',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
