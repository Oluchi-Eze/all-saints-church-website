'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Calendar, Quote, Heart, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface DevotionData {
  reference: string
  text: string
  focus: string
  title: string
  writeup: string
  action: string
}

export default function FullyAIGeneratedDevotionPage() {
  const [data, setData] = useState<DevotionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchLiveDevotion() {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch('/api/devotion')
        if (!res.ok) throw new Error("Server error")
        const devotionJson = await res.json()
        setData(devotionJson)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveDevotion()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-sans">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase animate-pulse">AI-Generating Today's Reflection...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-sans p-4 text-center">
        <p className="text-sm text-red-600 font-semibold">Failed to generate live devotional feed. Please try again shortly.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-12 pb-24 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8 items-stretch">
          
          {/* Verse of the Day Card - Fully AI Selected & Formatted */}
          <Link 
            href={`/bible?search=${encodeURIComponent(data.reference)}`}
            className="w-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-blue-800 group hover:scale-[1.005] transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-12 transform translate-x-6 -translate-y-6 opacity-5 pointer-events-none">
              <Quote size={260} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  <BookOpen size={14} /> Verse of the Day (AI Chosen)
                </div>
                <ArrowUpRight size={22} className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-serif text-2xl md:text-3xl leading-relaxed italic opacity-95 group-hover:text-blue-100 transition-colors max-w-4xl">
                "{data.text}"
              </p>
            </div>
            <div className="mt-12 border-t border-white/10 pt-6 text-sm font-mono tracking-wider font-bold text-blue-300 uppercase flex justify-between items-center">
              <span className="text-base font-serif italic font-normal text-white">— {data.reference}</span>
              <span className="text-xs font-sans tracking-normal font-normal opacity-60 group-hover:opacity-100 transition-opacity">Read Entire Chapter →</span>
            </div>
          </Link>

          {/* Devotion Card - Completely Unique Daily AI Output */}
          <Link
            href="/devotion"
            className="w-full bg-white rounded-[2rem] p-8 md:p-12 border border-gray-200 shadow-md flex flex-col justify-between group hover:border-gray-300 hover:scale-[1.005] transition-all cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-wider">
                  <Calendar size={16} className="text-blue-900" /> Today's Meditation
                </span>
                <span className="text-xs bg-amber-50 text-amber-800 font-black tracking-widest uppercase px-3.5 py-1.5 rounded-lg border border-amber-100">
                  {data.focus}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight mb-6 group-hover:text-blue-900 transition-colors flex items-center justify-between">
                <span>{data.title}</span>
                <ArrowUpRight size={24} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </h3>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-light max-w-4xl">
                {data.writeup}
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm md:text-base text-gray-700 font-medium max-w-4xl">
                <span className="block font-black text-xs uppercase text-blue-900 tracking-wider mb-2">Daily Application:</span>
                {data.action}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-red-400 fill-red-400" /> 
                <span>Freshly generated every 24 hours.</span>
              </div>
              <span className="text-blue-950 font-bold text-sm group-hover:underline">Open Devotional tab</span>
            </div>
          </Link>

        </div>
      </div>
    </main>
  )
}