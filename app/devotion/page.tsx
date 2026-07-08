'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Calendar, Sunrise, ArrowLeft, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const devotionsArchive: Record<number, { title: string; verse: string; ref: string; thought: string; prayer: string }> = {
  1: {
    title: "Embracing the Gift of a Fresh Start",
    verse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    ref: "2 Corinthians 5:17",
    thought: "Every single day brings a profound clean slate rooted deeply in the grace of God. No matter what happened yesterday—regardless of the mistakes made, the opportunities missed, or the weights of regret you might be carrying—today opens up as a fresh opportunity to walk boldly in His light, truth, and purpose.\n\nWhen we choose to consciously align our hearts with Christ, our old habits, failures, and identities lose their legal grip over our future. We aren't simply improved versions of our past selves; we are fundamentally transformed from the inside out. This means you have been given a brand new identity, an unblemished slate, and a divine assignment to carry love and hope into the world around you today.\n\nAs you step into your routines, your schoolwork, or your workplace, remind yourself that you are walking in newness of life. Let go of the baggage from last week. God's creative work in you isn't a one-time event; it is a daily renewing process that shapes you into who you were always meant to become.",
    prayer: "Lord God, thank You for making me completely new today. Help me consciously leave past mistakes, anxieties, and regrets behind and step confidently into the future You have carefully prepared for me. Guide my thoughts, anchor my speech, and direct my actions so that I can reflect Your grace to everyone I cross paths with today. Amen."
  },
  2: {
    title: "Mercy Tailored for Your Morning",
    verse: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
    ref: "Lamentations 3:22-23",
    thought: "It can be easy to view God's love and patience as a finite resource—like a battery that drains a little more every time we stumble or fall short. But the scriptures remind us of a beautiful reality: God's mercy does not diminish. Just like the reliable breaking of dawn across the horizon, His grace resets completely every single morning, uniquely designed for the exact challenges you will face today.\n\nGreat is His faithfulness. This means that whatever strength you ran out of yesterday has been fully replenished for today. You do not have to live on yesterday's reserve or worry if you have enough spiritual stamina to make it through the week. \n\nTake a deep breath and accept this gift. Allow His unfailing love to quiet your racing thoughts and anchor your confidence. Because His mercies are infinite, you can face the unknown details of today with total peace, knowing that the Creator of the universe has already gone before you.",
    prayer: "Father, thank You for Your endless, running over mercy. As I begin this morning, help me to rest securely in Your unfailing love rather than relying on my own strength. When things get busy or stressful today, remind me that Your grace is fully sufficient for me. Amen."
  }
}

export default function DevotionPage() {
  const [devotion, setDevotion] = useState<{ title: string; verse: string; ref: string; thought: string; prayer: string } | null>(null)
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const now = new Date()
    setFormattedDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }))

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

  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-24 selection:bg-blue-100">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Upper Navigation Area */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-900 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="flex gap-4 text-gray-400">
            <button className="hover:text-rose-600 transition-colors cursor-pointer"><Heart size={18} /></button>
            <button className="hover:text-blue-600 transition-colors cursor-pointer"><Share2 size={18} /></button>
          </div>
        </div>

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1.5 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sunrise size={12} /> Daily Bread
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs">
            <Calendar size={14} /> {formattedDate}
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-4xl md:text-6xl font-black text-blue-950 tracking-tight mb-12 leading-tight">
          {devotion.title}
        </h1>

        <div className="grid gap-10">
          
          {/* Section 1: Updated Focus Verse Card Component */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <BookOpen size={140} className="absolute right-6 bottom-6 text-gray-50 pointer-events-none" />
            <span className="text-xs font-black tracking-[0.2em] text-blue-800 uppercase block mb-4">The Focus Verse</span>
            <blockquote className="text-2xl md:text-3xl font-serif italic text-blue-950 leading-relaxed mb-6 relative z-10">
              "{devotion.verse}"
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-between sm:items-center relative z-10">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest font-mono">
                — {devotion.ref}
              </p>
              
              {/* Added Button Routing to Your Internal Bible App */}
              <Link 
                href={`/bible?search=${encodeURIComponent(devotion.ref)}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-100 font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all uppercase tracking-wider cursor-pointer"
              >
                <BookOpen size={14} />
                <span>Study Chapter</span>
              </Link>
            </div>
          </motion.div>

          {/* Section 2: Expanded Reflection Essay */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-sm border border-gray-100"
          >
            <h3 className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-6">Today's Perspective</h3>
            <div className="text-gray-800 text-lg md:text-xl leading-relaxed space-y-6 font-light whitespace-pre-line">
              {devotion.thought}
            </div>
          </motion.div>

          {/* Section 3: Deep Guided Prayer */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-10 md:p-14 rounded-[2.5rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent)] pointer-events-none" />
            <h3 className="text-xs font-black tracking-[0.2em] text-blue-300 uppercase mb-4">A Prayer to Carry With You</h3>
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-blue-50/90">
              "{devotion.prayer}"
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  )
}