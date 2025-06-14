import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ReactNode } from 'react'
import Link from 'next/link'
import TopMenu from '@/components/TopMenu'

export const metadata = {
  title: 'Thinnora – Decision Clarity Coach',
  description: 'Detach. Decide. Do.',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
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
          <main className="px-4 md:px-8 max-w-3xl mx-auto pt-40">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}