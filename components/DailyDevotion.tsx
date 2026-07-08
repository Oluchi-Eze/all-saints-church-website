'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Sun, Sunrise, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const devotionsArchive: Record<number, { verse: string; ref: string; thought: string; prayer: string }> = {
  1: {
    verse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    ref: "2 Corinthians 5:17",
    thought: "Every day brings a clean slate in the grace of God. No matter what happened yesterday, today is a fresh opportunity to walk in His light and purpose.",
    prayer: "Lord, thank You for making me new today. Help me leave past mistakes behind and step into the future You have prepared for me. Amen."
  },
  2: {
    verse: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
    ref: "Lamentations 3:22-23",
    thought: "God's love isn't a finite resource. Just like the sunrise, His mercy resets every single morning specifically tailored for your day ahead.",
    prayer: "Father, thank You for Your endless mercy. As I start this morning, let me rest securely in Your unfailing love. Amen."
  }
}

export default function DailyDevotion() {
  const router = useRouter()
  const [devotion, setDevotion] = useState<{verse: string; ref: string; thought: string; prayer: string} | null>(null)

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    if (devotionsArchive[dayOfYear]) {
      setDevotion(devotionsArchive[dayOfYear])
    } else {
      const cyclicalIndex = (dayOfYear % Object.keys(devotionsArchive).length) || 1
      setDevotion(devotionsArchive[cyclicalIndex] || devotionsArchive[1])
    }
  }, [])

  if (!devotion) return null

  // Handler for the Bible navigation
  const handleBibleRedirect = () => {
    router.push(`/bible?search=${encodeURIComponent(devotion.ref)}`)
  }

  // Handler for the Devotion page navigation
  const handleDevotionRedirect = () => {
    router.push('/devotion')
  }

  return (
    <div className="grid md:grid-cols-5 gap-8 items-stretch select-none">
      
      {/* Left Column: Verse of the Day Card (Leads strictly to /bible) */}
      <motion.div 
        whileHover={{ y: -4 }}
        onClick={handleBibleRedirect}
        className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-between relative overflow-hidden border border-blue-800 cursor-pointer group/verse hover:shadow-2xl transition-all"
      >
        <div className="absolute right-[-20px] top-[-20px] text-white/5 pointer-events-none">
          <BookOpen size={200} />
        </div>
        <div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit mb-6">
            <Sun size={14} className="text-amber-400" /> Verse of the Day
          </div>
          
          <h3 className="block text-xl md:text-2xl font-serif italic leading-relaxed tracking-wide text-white group-hover/verse:text-blue-200 transition-colors relative z-10 dynamic-link">
            "{devotion.verse}"
            <ArrowUpRight size={16} className="inline ml-1 opacity-60 group-hover/verse:translate-x-0.5 group-hover/verse:-translate-y-0.5 transition-transform" />
          </h3>
        </div>
        <p className="mt-6 text-sm font-bold text-blue-300 uppercase tracking-widest relative z-10">
          — {devotion.ref}
        </p>
      </motion.div>

      {/* Right Column: Devotional Word & Prayer (Leads strictly to /devotion) */}
      <motion.div 
        whileHover={{ y: -4 }}
        onClick={handleDevotionRedirect}
        className="md:col-span-3 bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-[2rem] shadow-sm flex flex-col justify-between cursor-pointer group/devotion hover:border-blue-200 hover:shadow-md transition-all"
      >
        <div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit mb-6">
            <Sunrise size={14} /> Morning Devotion
          </div>
          <h4 className="text-xl font-bold text-blue-950 mb-3 tracking-tight group-hover/devotion:text-blue-900 transition-colors">
            Today's Reflection
          </h4>
          <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
            {devotion.thought}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200/60 bg-blue-50/50 p-5 rounded-2xl">
          <h5 className="text-xs font-black tracking-widest text-blue-900 uppercase mb-2">Morning Prayer</h5>
          <p className="text-gray-600 italic text-sm leading-relaxed line-clamp-2">
            {devotion.prayer}
          </p>
        </div>
      </motion.div>

    </div>
  )
}