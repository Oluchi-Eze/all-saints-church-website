'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarBackground = !isHomePage 
    ? 'bg-blue-900 py-3 shadow-lg' 
    : scrolled 
      ? 'bg-blue-900/95 backdrop-blur-md py-3 shadow-lg' 
      : 'bg-transparent py-5'

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navbarBackground}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          ALL SAINTS<span className="font-light opacity-80 ml-1 italic">CHURCH</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-widest text-white">
          <Link href="/" className="hover:text-blue-300 transition relative py-1">
            Home
            {isHomePage && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
          </Link>
          <Link href="/story" className="hover:text-blue-300 transition relative py-1">
            Our Story
            {pathname === '/story' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
          </Link>
          {/* Added: Bible Gateway Link inside default tab navigation layouts */}
          <Link href="/bible" className="hover:text-blue-300 transition relative py-1 flex items-center gap-1.5 normal-case tracking-wider font-bold">
            <BookOpen size={14} className="opacity-90" />
            Bible
            {pathname === '/bible' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
          </Link>
          <Link href="/sermons" className="hover:text-blue-300 transition relative py-1">
            Sermons
            {pathname === '/sermons' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
          </Link>
          <Link href="/give" className="hover:text-blue-300 transition relative py-1">
            Give
            {pathname === '/give' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
          </Link>
          <Link 
            href="/join" 
            className="bg-white text-blue-900 px-6 py-2 rounded-full hover:bg-blue-100 transition shadow-xl font-bold normal-case tracking-normal"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white cursor-pointer">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-blue-900 text-white p-8 flex flex-col gap-6 text-center text-xl font-bold shadow-2xl"
          >
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/story" onClick={() => setIsOpen(false)}>Our Story</Link>
            <Link href="/bible" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 text-blue-200">
              <BookOpen size={20} /> Bible Gateway
            </Link>
            <Link href="/sermons" onClick={() => setIsOpen(false)}>Sermons</Link>
            <Link href="/give" onClick={() => setIsOpen(false)}>Give</Link>
            <Link href="/join" onClick={() => setIsOpen(false)} className="bg-white text-blue-900 py-4 rounded-xl">Connect</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}