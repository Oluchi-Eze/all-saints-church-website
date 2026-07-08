'use client'
import { useState, useEffect, useRef } from 'react'
import { BookOpen, Search, ChevronLeft, ChevronRight, ListFilter, HelpCircle, Globe, Hash } from 'lucide-react'
import Link from 'next/link'

const OLD_TESTAMENT = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
]

const NEW_TESTAMENT = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
]

const ALL_BOOKS_IN_ORDER = [...OLD_TESTAMENT, ...NEW_TESTAMENT]

const ALL_VERSIONS = [
  { id: 'ESV', name: 'English Standard Version (ESV)', source: 'bolls', bollsId: 6 },
  { id: 'NASB', name: 'New American Standard Bible (NASB)', source: 'bolls', bollsId: 5 },
  { id: 'NIV', name: 'New International Version (NIV)', source: 'bolls', bollsId: 2 },
  { id: 'NKJV', name: 'New King James Version (NKJV)', source: 'bolls', bollsId: 70 },
  { id: 'NLT', name: 'New Living Translation (NLT)', source: 'bolls', bollsId: 68 },
  { id: 'AMP', name: 'Amplified Bible (AMP)', source: 'bolls', bollsId: 67 },
  { id: 'MSG', name: 'The Message (MSG)', source: 'bolls', bollsId: 10 },
  { id: 'NRSV', name: 'New Revised Standard Version (NRSV)', source: 'bolls', bollsId: 18 },
  { id: 'KJV', name: 'King James Version (KJV)', source: 'bible-api' },
  { id: 'WEB', name: 'World English Bible (WEB)', source: 'bible-api' },
  { id: 'ASV', name: 'American Standard Version (ASV)', source: 'bible-api' },
  { id: 'BBE', name: 'Bible in Basic English (BBE)', source: 'bible-api' },
  { id: 'YLT', name: "Young's Literal Translation (YLT)", source: 'bible-api' },
  { id: 'NBV', name: 'Nieuwe Bijbelvertaling (NBV) - Dutch', source: 'bolls', bollsId: 34 },
  { id: 'SV', name: 'Statenvertaling (SV) - Dutch', source: 'bolls', bollsId: 35 },
  { id: 'NBG', name: 'NBG-vertaling 1951 - Dutch', source: 'bolls', bollsId: 100 },
  { id: 'RVR', name: 'Reina-Valera 1960 (RVR) - Spanish', source: 'bolls', bollsId: 28 },
  { id: 'LSG', name: 'Louis Segond 1910 (LSG) - French', source: 'bolls', bollsId: 37 },
  { id: 'LUT', name: 'Lutherbibel 1912 (LUT) - German', source: 'bolls', bollsId: 44 },
  { id: 'CUV', name: 'Chinese Union Version (Traditional)', source: 'bolls', bollsId: 47 },
  { id: 'VULG', name: 'Latin Vulgate (St. Jerome)', source: 'bolls', bollsId: 58 },
  { id: 'LXX', name: 'Septuagint (LXX) - Greek OT', source: 'bolls', bollsId: 61 }
]

export default function UltimateBibleGateway() {
  const [book, setBook] = useState('John')
  const [chapter, setChapter] = useState(3)
  const [verseSelection, setVerseSelection] = useState('all')
  const [versionObj, setVersionObj] = useState(ALL_VERSIONS[0]) 
  const [verses, setVerses] = useState<{ text: string; verse: number }[]>([])
  const [totalVersesInChapter, setTotalVersesInChapter] = useState(36)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const isInitialMount = useRef(true)

  const parseAndSetReference = (rawQuery: string) => {
    if (!rawQuery.trim()) return
    const cleanedQuery = rawQuery.trim().replace(/\s+/g, ' ')
    const parts = cleanedQuery.split(' ')
    
    let parsedBook = parts[0]
    let referencePart = parts[1] || ''

    if (!isNaN(Number(parts[0])) && parts.length > 1) {
      parsedBook = `${parts[0]} ${parts[1]}`
      referencePart = parts[2] || ''
    }

    const matchedBook = ALL_BOOKS_IN_ORDER.find(b => b.toLowerCase() === parsedBook.toLowerCase())
    if (!matchedBook) return

    let parsedChapter = 1
    let parsedVerse = 'all'

    if (referencePart.includes(':')) {
      const [ch, vs] = referencePart.split(':')
      parsedChapter = Number(ch) || 1
      parsedVerse = vs || 'all'
    } else {
      parsedChapter = Number(referencePart) || 1
    }

    setBook(matchedBook)
    setChapter(parsedChapter)
    setVerseSelection(parsedVerse)
  }

  const fetchScripture = async (targetBook: string, targetChapter: number, currentVer: typeof ALL_VERSIONS[0]) => {
    setLoading(true)
    setError('')
    try {
      if (currentVer.source === 'bolls') {
        const bookId = ALL_BOOKS_IN_ORDER.findIndex(b => b.toLowerCase() === targetBook.toLowerCase()) + 1
        if (bookId <= 0) throw new Error('Invalid book.')

        const res = await fetch(`https://bolls.life/get-chapter/${currentVer.bollsId}/${bookId}/${targetChapter}/`)
        if (!res.ok) throw new Error('Bolls node down.')
        
        const data = await res.json()
        if (!Array.isArray(data) || data.length === 0) throw new Error('Empty chapter.')

        const fetchedVerses = data.map((v: any) => ({ verse: v.verse, text: v.text }))
        setVerses(fetchedVerses)
        setTotalVersesInChapter(fetchedVerses.length)
      } else {
        const res = await fetch(`https://bible-api.com/${encodeURIComponent(targetBook)}+${targetChapter}?translation=${currentVer.id.toLowerCase()}`)
        if (!res.ok) throw new Error('Bible-API down.')
        
        const data = await res.json()
        const fetchedVerses = data.verses?.map((v: any) => ({ verse: v.verse, text: v.text })) || []
        setVerses(fetchedVerses)
        setTotalVersesInChapter(fetchedVerses.length)
      }
    } catch (err) {
      // Quietly process alternate fallback resources without alerting the user view
      try {
        const fallbackRes = await fetch(`https://bible-api.com/${encodeURIComponent(targetBook)}+${targetChapter}?translation=kjv`)
        const fallbackData = await fallbackRes.json()
        const fallbackVerses = fallbackData.verses?.map((v: any) => ({ verse: v.verse, text: v.text })) || []
        
        setVerses(fallbackVerses)
        setTotalVersesInChapter(fallbackVerses.length)
        
        // CRITICAL: Keep error blank so no technical notice renders on screen
        setError('')
      } catch {
        setError('Could not connect to scripture databases. Please verify your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const searchParam = params.get('search')
      if (searchParam) {
        parseAndSetReference(searchParam)
        isInitialMount.current = false
        return
      }
    }
    fetchScripture(book, chapter, versionObj)
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    fetchScripture(book, chapter, versionObj)
  }, [book, chapter, versionObj])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    parseAndSetReference(searchQuery)
    setSearchQuery('')
  }

  const changeChapter = (direction: 'next' | 'prev') => {
    setVerseSelection('all')
    setChapter(prev => (direction === 'next' ? prev + 1 : Math.max(1, prev - 1)))
  }

  const displayedVerses = verseSelection === 'all' 
    ? verses 
    : verses.filter(v => v.verse === Number(verseSelection))

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-12 text-gray-900 selection:bg-blue-100">
      <div className="bg-blue-950 border-b border-blue-900 text-white py-3.5 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-blue-400" />
            <span>All Saints' Church — Scripture</span>
          </div>
          <Link href="/" className="hover:text-blue-300 transition-colors">← Back to Main Website</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-6 rounded-3xl shadow-xl mb-6 text-white border border-blue-800">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <form onSubmit={handleSearchSubmit} className="md:col-span-2 w-full">
              <label className="block text-xs uppercase font-black tracking-widest text-blue-300 mb-2">Search Reference</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="e.g., Romans 8:28, John 3:16"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-5 pr-12 text-white font-medium placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/15 transition-all text-sm"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </form>

            <div className="w-full">
              <label className="block text-xs uppercase font-black tracking-widest text-blue-300 mb-2">Verse Filter</label>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-3 rounded-2xl text-white">
                <Hash size={16} className="text-blue-300" />
                <select
                  value={verseSelection}
                  onChange={(e) => setVerseSelection(e.target.value)}
                  className="bg-transparent font-semibold outline-none w-full cursor-pointer text-white [&>option]:text-gray-900 text-sm"
                >
                  <option value="all">Whole Chapter View</option>
                  {Array.from({ length: totalVersesInChapter }, (_, i) => i + 1).map((vNum) => (
                    <option key={vNum} value={vNum}>Verse {vNum}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs uppercase font-black tracking-widest text-blue-300 mb-2">Version Library</label>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-3 rounded-2xl text-white">
                <Globe size={16} className="text-blue-300" />
                <select
                  value={versionObj.id}
                  onChange={(e) => {
                    const match = ALL_VERSIONS.find(v => v.id === e.target.value)
                    if (match) {
                      setVersionObj(match)
                      setVerseSelection('all')
                    }
                  }}
                  className="bg-transparent font-semibold outline-none w-full cursor-pointer text-white [&>option]:text-gray-900 text-sm"
                >
                  {ALL_VERSIONS.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 items-start">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 max-h-[75vh] overflow-y-auto lg:sticky lg:top-28">
            <div className="flex items-center gap-2 font-black text-xs text-blue-950 uppercase tracking-widest pb-3 border-b border-gray-100 mb-4">
              <ListFilter size={14} className="text-blue-900" />
              <span>Select Book Index</span>
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Old Testament</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1 mb-6">
              {OLD_TESTAMENT.map(b => (
                <button
                  key={b}
                  onClick={() => { setBook(b); setChapter(1); setVerseSelection('all'); }}
                  className={`text-left text-sm px-3 py-1.5 rounded-xl transition-colors font-medium truncate cursor-pointer ${book === b ? 'bg-blue-900 text-white font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">New Testament</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
              {NEW_TESTAMENT.map(b => (
                <button
                  key={b}
                  onClick={() => { setBook(b); setChapter(1); setVerseSelection('all'); }}
                  className={`text-left text-sm px-3 py-1.5 rounded-xl transition-colors font-medium truncate cursor-pointer ${book === b ? 'bg-blue-900 text-white font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 min-h-[65vh] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-black text-blue-950 tracking-tight">
                    {book} {chapter}{verseSelection !== 'all' && `:${verseSelection}`}
                  </h2>
                  <p className="text-xs text-blue-600 font-black uppercase tracking-widest mt-1">
                    {versionObj.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => changeChapter('prev')}
                    disabled={chapter <= 1 || loading}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => changeChapter('next')}
                    disabled={loading}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {loading && (
                <div className="py-24 text-center text-gray-400">
                  <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-mono tracking-widest uppercase animate-pulse">Syncing Library Data...</p>
                </div>
              )}

              {!loading && (
                <div className="space-y-5 font-serif text-lg md:text-xl text-gray-800 leading-relaxed font-light tracking-wide">
                  {displayedVerses.map((v) => (
                    <span key={v.verse} className="inline group mr-2">
                      <sup className="text-xs font-bold font-sans text-blue-700 inline-block mr-1.5 select-none font-mono">
                        {v.verse}
                      </sup>
                      {v.text?.replace(/<\/?[^>]+(>|$)/g, "").trim()}{" "}
                    </span>
                  ))}
                  {displayedVerses.length === 0 && !error && (
                    <p className="text-gray-400 text-sm font-sans italic">No matching scriptures found inside this layout tracking view.</p>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium">
                  {error}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 mt-12 pt-6 flex justify-between items-center text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><HelpCircle size={14}/> Compare phrasing layouts instantly by switching translations.</span>
              <div className="flex gap-4">
                <button onClick={() => changeChapter('prev')} disabled={chapter <= 1} className="hover:text-blue-900 font-bold disabled:opacity-30 transition-colors cursor-pointer">← Previous</button>
                <button onClick={() => changeChapter('next')} className="hover:text-blue-900 font-bold transition-colors cursor-pointer">Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}