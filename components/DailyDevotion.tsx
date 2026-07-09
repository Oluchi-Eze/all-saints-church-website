'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Calendar, Quote, Heart, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const VERSES = [
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
  { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
  { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." }
]

const TOPICS = [
  { focus: "Divine Guidance", title: "Stepping into the Unseen", writeup: "When the path ahead looks covered in fog, remember that your next step doesn't require complete visibility—it only requires complete trust. God's word is a lamp unto your feet, illuminating just enough ground for you to walk faithfully today without stumbling over tomorrow's worries." },
  { focus: "Rest & Renewal", title: "The Sanctuary of Silence", writeup: "In a culture that measures your worth by your constant production, grace invites you to sit still. True strength isn't forged in constant movement, but in quiet moments of surrender where you allow your soul to be filled, recharged, and anchored by eternal peace." },
  { focus: "Unshakable Faith", title: "Anchored in the Storm", writeup: "Winds will blow and waves will crash against your current season, but the depth of your anchor determines your stability. Your foundation isn't built on a lack of trouble, but on the presence of a Savior who speaks peace directly over the wildest tempests in your life." },
  { focus: "Purpose & Calling", title: "Crafted for Intention", writeup: "You are not an accident, nor are you passing through this specific season by mistake. Every detail of your story is being woven into a larger, beautiful tapestry of restoration. Step boldly into your day knowing that your interactions carry eternal significance." },
  { focus: "Grace & Mercy", title: "The Beautiful Exchange", writeup: "Yesterday's failures do not have the power to dictate today's identity. Mercy met you at midnight, offering a completely blank canvas. Trade your heavy weights of guilt for the lightweight garment of praise, and walk freely in the love already secured for you." }
]

const APPLICATIONS = [
  "Take 5 minutes of complete silence today to hand over your primary stressor directly to God.",
  "Reach out to someone in your circles today and offer a word of genuine, life-giving encouragement.",
  "Write down three things you are actively grateful for, focusing on small details you normally overlook.",
  "Intentionally step back from a fast-paced situation today to breathe deeply and pray for wisdom before reacting."
]

export default function DevotionPage() {
  const [votd, setVotd] = useState({ reference: '', text: '' })
  const [devotion, setDevotion] = useState({ title: '', focus: '', writeup: '', action: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const amsterdamString = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
    const nowInNL = new Date(amsterdamString)
    const startOfNLYear = new Date(nowInNL.getFullYear(), 0, 0)
    const diff = nowInNL.getTime() - startOfNLYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    const verseIndex = Math.abs(dayOfYear) % VERSES.length
    const topicIndex = Math.abs(dayOfYear) % TOPICS.length
    const actionIndex = Math.abs(dayOfYear + 2) % APPLICATIONS.length

    setVotd(VERSES[verseIndex])
    setDevotion({
      title: TOPICS[topicIndex].title,
      focus: TOPICS[topicIndex].focus,
      writeup: TOPICS[topicIndex].writeup,
      action: APPLICATIONS[actionIndex]
    })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-sans">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase animate-pulse">Loading Devotion...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-12 pb-24 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-6 items-stretch">
          
          <Link 
            href={`/bible?search=${encodeURIComponent(votd.reference)}`}
            className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-blue-800 group hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
              <Quote size={180} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <BookOpen size={12} /> Verse of the Day
                </div>
                <ArrowUpRight size={16} className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-serif text-lg leading-relaxed italic opacity-95 group-hover:text-blue-100 transition-colors">
                "{votd.text}"
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 text-xs font-mono tracking-wider font-bold text-blue-300 uppercase flex justify-between items-center">
              <span>— {votd.reference}</span>
              <span className="text-[9px] font-sans tracking-normal font-normal opacity-60 group-hover:opacity-100 transition-opacity">Read Chapter →</span>
            </div>
          </Link>

          <Link
            href="/devotion"
            className="md:col-span-3 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between group hover:border-gray-300 hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <Calendar size={14} className="text-blue-900" /> Today's Meditation
                </span>
                <span className="text-[10px] bg-amber-50 text-amber-800 font-black tracking-widest uppercase px-2.5 py-1 rounded-md border border-amber-100">
                  {devotion.focus}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-blue-950 tracking-tight mb-3 group-hover:text-blue-900 transition-colors flex items-center justify-between">
                <span>{devotion.title}</span>
                <ArrowUpRight size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light">
                {devotion.writeup}
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-xs text-gray-700 font-medium">
                <span className="block font-black text-[10px] uppercase text-blue-900 tracking-wider mb-1">Daily Application:</span>
                {devotion.action}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Heart size={12} className="text-red-400 fill-red-400" /> 
                <span>Locked to Amsterdam Midnight Time.</span>
              </div>
              <span className="text-blue-950 font-bold text-xs group-hover:underline">Open Devotional tab</span>
            </div>
          </Link>

        </div>
      </div>
    </main>
  )
}