import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ReactNode } from 'react'
import Link from 'next/link'
import TopMenu from '@/components/TopMenu'
import InstallPrompt from '@/components/InstallPrompt'
import WelcomeOverlay from '@/components/WelcomeOverlay'

export const metadata = {
  title: 'Thinnora – Reflect Clearly, Decide Calmly',
  description: 'A calm, AI-guided reflection space for clarity before action. Not chat. Not advice. Just intentional stillness.',
  keywords: ['Thinnora', 'decision clarity', 'guided reflection', 'mindful tech', 'inner wisdom', 'reflective AI'],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  openGraph: {
    title: 'Thinnora – Reflect Clearly, Decide Calmly',
    description: 'A guided space for slowing down and returning to your own wisdom. Try it free.',
    url: 'https://www.thinnora.space',
    siteName: 'Thinnora',
    images: [
      {
        url: 'https://www.thinnora.space/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Thinnora interface over a soft sky gradient'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinnora – Reflect Clearly',
    description: 'A calm, AI-guided space for intentional reflection.',
    images: ['https://www.thinnora.space/og-preview.jpg']
  }
}


function FloatingHeader() {
  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-3 backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl">
      <Link href="/">
        <img
          src="/thinnora-logo.png"
          alt="Thinnora Logo"
          className="h-20 cursor-pointer hover:opacity-80 transition"
        />
      </Link>
      <div className="leading-snug">
        <p className="text-xl font-bold text-sky-800">Thinnora</p>
        <p className="text-base italic text-sky-700">Detach. Decide. Do.</p>
      </div>
    </div>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
          <meta name="theme-color" content="#0a0a0a" />
        </head>
        <body className="min-h-screen bg-fixed bg-cover bg-center text-white font-sans perkspotbx">
          <FloatingHeader />
          <TopMenu />
          <InstallPrompt />
          <WelcomeOverlay />
          <main className="px-4 md:px-8 max-w-3xl mx-auto pt-40">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}