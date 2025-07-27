import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VGirl - Premium AI Virtual Companions",
    template: "%s | VGirl"
  },
  description: "Create, customize, and interact with premium AI virtual companions. Join VGirl for immersive conversations, exclusive content, and personalized AI experiences.",
  keywords: ["AI companions", "virtual girlfriends", "AI chat", "premium content", "digital relationships", "virtual dating", "AI personalities"],
  authors: [{ name: "VGirl Platform" }],
  creator: "VGirl",
  publisher: "VGirl",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://vgirl.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'VGirl - Premium AI Virtual Companions',
    description: 'Create, customize, and interact with premium AI virtual companions. Join VGirl for immersive conversations, exclusive content, and personalized AI experiences.',
    siteName: 'VGirl',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VGirl - Premium AI Virtual Companions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VGirl - Premium AI Virtual Companions',
    description: 'Create, customize, and interact with premium AI virtual companions. Join VGirl for immersive conversations, exclusive content, and personalized AI experiences.',
    images: ['/twitter-image.jpg'],
    creator: '@vgirlapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
