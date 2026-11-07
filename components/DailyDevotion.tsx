// app/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { Quote, ArrowUpRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { CURATED_VERSE_POOL } from '@/app/data/verse'

// Official abbreviations required by the Scripture API
const BOOK_ABBREVIATIONS: { [key: string]: string } = {
  "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM", "Deuteronomy": "DEU",
  "Joshua": "JSH", "Judges": "JDG", "Ruth": "RUT", "1 Samuel": "1SA", "2 Samuel": "2SA",
  "1 Kings": "1KI", "2 Kings": "2KI", "1 Chronicles": "1CH", "2 Chronicles": "2CH",
  "Ezra": "EZR", "Nehemiah": "NEH", "Esther": "EST", "Job": "JOB", "Psalms": "PSA",
  "Proverbs": "PRO", "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA",
  "Jeremiah": "JER", "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN",
  "Hosea": "HOS", "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON",
  "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB", "Zephaniah": "ZEP", "Haggai": "HAG",
  "Zechariah": "ZEC", "Malachi": "MAL", "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK",
  "John": "JHN", "Acts": "ACT", "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO",
  "Galatians": "GAL", "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
  "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI", "2 Timothy": "2TI",
  "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB", "James": "JAS", "1 John": "1JO",
  "2 John": "2JO", "3 John": "3JO", "Jude": "JUD", "Revelation": "REV"
}

export default function CuratedDailyVerseHub() {
  const [verse, setVerse] = useState({ reference: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dayOffset, setDayOffset] = useState(0)

  useEffect(() => {
    const fetchCuratedDailyVerse = async () => {
      try {
        setLoading(true)
        setError(false)

        // 1. Calculate time index relative to Europe/Amsterdam
        const amsterdamString = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
        const nowInNL = new Date(amsterdamString)
        nowInNL.setDate(nowInNL.getDate() + dayOffset)

        const startOfNLYear = new Date(nowInNL.getFullYear(), 0, 0)
        const diff = nowInNL.getTime() - startOfNLYear.getTime()
        const oneDay = 1000 * 60 * 60 * 24
        const dayOfYear = Math.floor(diff / oneDay)

        let targetIndex = dayOfYear % CURATED_VERSE_POOL.length
        if (targetIndex < 0) targetIndex += CURATED_VERSE_POOL.length
        
        // 2. Select the daily reference from your 365 verse pool
        const selectedReference = CURATED_VERSE_POOL[targetIndex]

        // 3. Set the offline state using the reference from your verse.ts
        setVerse({
          reference: selectedReference,
          text: "Thy word is a lamp unto my feet, and a light unto my path."
        })
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCuratedDailyVerse()
  }, [dayOffset])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-sans">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase animate-pulse">Loading Scripture...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-24 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Hero Card Container */}
        <div className="w-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2.5rem] p-10 md:p-16 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-blue-800 min-h-[50vh]">
          
          <div className="absolute top-0 right-0 p-12 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none select-none">
            <Quote size={320} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 relative z-10">
                <button 
                  onClick={() => setDayOffset(prev => prev - 1)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  <ChevronLeft size={16} />
                  <span>Previous Day</span>
                </button>
                
                <button 
                  onClick={() => setDayOffset(prev => prev + 1)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  <span>Next Day</span>
                  <ChevronRight size={16} />
                </button>

                {dayOffset !== 0 && (
                  <button 
                    onClick={() => setDayOffset(0)}
                    className="text-[10px] text-blue-300 hover:underline ml-2"
                  >
                    Back to Today
                  </button>
                )}
              </div>

              <Link 
                href="/bible"
                className="group flex items-center gap-1 text-xs font-bold text-blue-300 transition-all"
              >
                <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">Open Full Bible</span>
                <BookOpen size={16} />
              </Link>
            </div>

            {error ? (
              <p className="text-sm text-amber-300 font-medium bg-white/5 p-4 rounded-xl">
                Could not stream translation from official servers. Verify your NEXT_PUBLIC_BIBLE_API_KEY environment configuration.
              </p>
            ) : (
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed italic opacity-95 text-blue-50 transition-colors max-w-5xl tracking-wide">
                "{verse.text}"
              </p>
            )}
          </div>

          <div className="mt-16 border-t border-white/10 pt-8 text-sm font-mono tracking-wider font-bold text-blue-300 uppercase flex justify-between items-center">
            <span className="text-xl font-serif italic font-normal text-white">— {verse.reference}</span>
            <span className="text-[10px] font-mono font-bold text-blue-300 bg-white/10 px-2 py-1 rounded">
              Official NIV Translation
            </span>
          </div>
        </div>

      </div>
    </main>
  )
}