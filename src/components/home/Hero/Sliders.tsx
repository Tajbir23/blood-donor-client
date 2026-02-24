'use client'
import { useMemo, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

interface SlideProps {
  image: string
  title: string
  description: string
  isRoute?: boolean
  route?: string
  buttonText?: string
}

interface UserQuery {
  user: { _id?: string }
}

export default function Sliders({ slides }: { slides: SlideProps[] }) {
  const [current, setCurrent] = useState(0)
  const qc       = useQueryClient()
  const user     = useMemo(() => qc.getQueryData<UserQuery>(['user']), [qc])
  const loggedIn = !!user?.user?._id

  /* Auto-advance */
  useEffect(() => {
    if (!slides?.length) return
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [slides?.length])

  if (!slides?.length) {
    /* Fallback static hero when slider data unavailable */
    return (
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900 via-red-800 to-stone-900 min-h-[480px] flex items-center justify-center text-white text-center px-6">
        <div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-shadow-md">
            রক্ত দিন, জীবন বাঁচান
          </h1>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">বাংলাদেশের সবচেয়ে বড় রক্তদান প্ল্যাটফর্মে স্বাগতম</p>
          <Link href="/register" className="bg-white text-red-700 font-semibold px-8 py-3 rounded hover:bg-red-50 transition-colors text-sm">
            এখনই যোগ দিন
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden rounded-xl shadow-lg" style={{ height: 'clamp(360px, 55vw, 600px)' }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
          {/* Gradient overlay — stronger at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center text-white z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-shadow-lg mb-3 max-w-3xl leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl mb-6 text-shadow-sm">
              {slide.description}
            </p>

            {i === current && (
              <div className="flex flex-wrap gap-3 justify-center">
                {slide.isRoute && slide.route && (
                  <Link href={slide.route}
                    className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors border border-red-600">
                    {slide.buttonText || 'আরও জানুন'}
                  </Link>
                )}
                {!loggedIn && (
                  <>
                    <Link href="/register"
                      className="bg-white text-red-700 hover:bg-red-50 font-semibold px-6 py-2.5 rounded text-sm transition-colors">
                      রেজিস্ট্রেশন করুন
                    </Link>
                    <Link href="/login"
                      className="border border-white/60 text-white hover:bg-white/10 font-medium px-6 py-2.5 rounded text-sm transition-colors">
                      লগইন করুন
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        aria-label="পূর্ববর্তী"
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-red-700 transition-colors flex items-center justify-center text-white border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        aria-label="পরবর্তী"
        onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-red-700 transition-colors flex items-center justify-center text-white border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`স্লাইড ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  )
}

