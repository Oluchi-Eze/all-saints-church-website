'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

const BOOK_IDS: { [key: string]: number } = {
  "Genesis": 1, "Exodus": 2, "Leviticus": 3, "Numbers": 4, "Deuteronomy": 5,
  "Joshua": 6, "Judges": 7, "Ruth": 8, "1 Samuel": 9, "2 Samuel": 10,
  "1 Kings": 11, "2 Kings": 12, "1 Chronicles": 13, "2 Chronicles": 14,
  "Ezra": 15, "Nehemiah": 16, "Esther": 17, "Job": 18, "Psalms": 19,
  "Proverbs": 20, "Ecclesiastes": 21, "Song of Solomon": 22, "Isaiah": 23,
  "Jeremiah": 24, "Lamentations": 25, "Ezekiel": 26, "Daniel": 27,
  "Hosea": 28, "Joel": 29, "Amos": 30, "Obadiah": 31, "Jonah": 32,
  "Micah": 33, "Nahum": 34, "Habakkuk": 35, "Zephaniah": 36, "Haggai": 37,
  "Zechariah": 38, "Malachi": 39, "Matthew": 40, "Mark": 41, "Luke": 42,
  "John": 43, "Acts": 44, "Romans": 45, "1 Corinthians": 46, "2 Corinthians": 47,
  "Galatians": 48, "Ephesians": 49, "Philippians": 50, "Colossians": 51,
  "1 Thessalonians": 52, "2 Thessalonians": 53, "1 Timothy": 54, "2 Timothy": 55,
  "Titus": 56, "Philemon": 57, "Hebrews": 58, "James": 59, "1 John": 60,
  "2 John": 61, "3 John": 62, "Jude": 63, "Revelation": 64
}

interface VerseItem {
  pk: number
  verse: number
  text: string
}

export default function PerfectBibleReader() {
  const [bookName, setBookName] = useState("John")
  const [chapter, setChapter] = useState(3)
  const [verses, setVerses] = useState<VerseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchAccurateNIV() {
      try {
        setLoading(true)
        setError(false)
        const bookId = BOOK_IDS[bookName] || 43

        const res = await fetch(`https://bolls.life/get-chapter/NIV/${bookId}/${chapter}/`)
        if (!res.ok) throw new Error("Could not fetch chapter data")
        
        const data = await res.json()
        setVerses(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAccurateNIV()
  }, [bookName, chapter])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const match = searchQuery.trim().match(/^([\d\s\w]+?)\s+(\d+)$/)
    if (match) {
      const parsedBook = match[1].trim()
      const parsedChapter = parseInt(match[2], 10)
      const matchedKey = Object.keys(BOOK_IDS).find(
        key => key.toLowerCase() === parsedBook.toLowerCase()
      )
      if (matchedKey) {
        setBookName(matchedKey)
        setChapter(parsedChapter)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen font-sans text-gray-900">
      <form onSubmit={handleSearchSubmit} className="mb-8 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search e.g., 'John 3' or '2 Chronicles 15'" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-950"
          />
        </div>
        <button type="submit" className="px-5 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 cursor-pointer">
          Go
        </button>
      </form>

      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <button 
          onClick={() => setChapter(prev => Math.max(1, prev - 1))}
          className="flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Previous Chapter</span>
        </button>

        <h1 className="text-2xl font-serif font-black text-blue-950">
          {bookName} {chapter} <span className="text-xs font-sans font-bold text-gray-400 ml-1 uppercase bg-gray-100 px-2 py-0.5 rounded-md">NIV</span>
        </h1>

        <button 
          onClick={() => setChapter(prev => prev + 1)}
          className="flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 cursor-pointer"
        >
          <span>Next Chapter</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm font-mono text-gray-400 animate-pulse">Loading NIV Scripture Passage...</div>
      ) : error ? (
        <div className="text-center py-12 text-sm font-medium text-amber-700 bg-amber-50 rounded-xl border border-amber-200">Could not pull requested selection structure. Check spelling!</div>
      ) : (
        <div className="font-serif text-lg leading-relaxed text-gray-800 space-y-4 max-w-3xl mx-auto">
          {verses.map((v) => (
            <p key={v.pk}>
              <span className="font-sans text-xs font-bold text-blue-900 mr-2 select-none">{v.verse}</span>
              {v.text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}