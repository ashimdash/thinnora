'use client'

import { useRouter } from 'next/navigation'
import Head from 'next/head'

export default function AboutPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>About Thinnora</title>
        <meta name="description" content="Thinnora is a mindful reflection platform to help people reclaim time and reconnect with what matters." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Thinnora",
              "description": "Thinnora is a mindful reflection platform that helps people reclaim time from digital distractions and reconnect with what matters.",
              "image": "https://thinnora.space/assets/og-image.jpg", // Replace if different
              "brand": {
                "@type": "Brand",
                "name": "Thinnora"
              },
              "url": "https://thinnora.space",
              "creator": {
                "@type": "Person",
                "name": "Ashim Dash",
                "url": "https://github.com/ashimdash"
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "5.00",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </Head>

      <div className="max-w-2xl mx-auto px-4 pt-20 text-black space-y-6">
        <h1 className="text-3xl font-bold text-sky-900 drop-shadow-sm">
          About Thinnora
        </h1>

        <p className="text-lg text-black/80">
          <strong>Thinnora</strong> is a calm, AI-powered space for intentional reflection and decision clarity.
          It’s not just another journaling app — it’s a quiet moment with yourself, guided by emotionally aware AI.
        </p>

        <p className="text-base text-black/70 leading-relaxed">
          <strong>Choose from two distinct guides:</strong>
        </p>

        <ul className="list-disc pl-6 text-base italic text-sky-700/80 space-y-1"> 
          <li>
            <strong className="text-cyan-200 font-medium drop-shadow">🧘 Gia</strong> <strong>offers gentle, intuitive, emotionally attuned guidance.</strong>
          </li>
          <li>
            <strong className="text-indigo-600 font-medium drop-shadow">🧠 Vian</strong> <strong>provides calm, logical, clarity-focused decision support.</strong>
          </li>
        </ul>

        <p className="text-base text-black/80">
          <strong>Thinnora is designed for people who are processing big questions — career shifts, emotional decisions,
          personal growth — and want their thoughts reflected back with care and clarity.</strong>
        </p>

        <blockquote className="border-l-4 border-white/30 pl-4 text-black/70 italic text-sm">
          <p className="mb-2"><strong>Thinnora is a space, not a tool.</strong></p>
          <p>
              <strong className="text-base italic text-sky-700/80">
              "You don’t need the perfect question — Thinnora knows what to ask."
              </strong>
          </p>
        </blockquote>

        <div className="pt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            ⬅ Back to Start
          </button>
        </div>
      </div>
    </>
  )
}
