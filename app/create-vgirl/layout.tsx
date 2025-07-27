import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create VGirl - VGirl',
  description: 'Design and create your own AI virtual companion. Customize personality, appearance, and traits to build the perfect AI girlfriend experience.',
  openGraph: {
    title: 'Create VGirl - VGirl',
    description: 'Design and create your own AI virtual companion. Customize personality, appearance, and traits to build the perfect AI girlfriend experience.',
  },
}

export default function CreateVGirlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
