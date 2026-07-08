import Link from 'next/link'
import DailyDevotion from '@/components/DailyDevotion'
import { BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Video Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/45 z-10" /> 
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover scale-105"
          >
            <source src="https://player.vimeo.com/external/538571026.sd.mp4?s=6a3b2a3a9b9a6b1a1f0a2f0a1f0a2f0a1f0a2f0a&profile_id=165" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-9xl font-black text-white mb-4 tracking-tighter leading-none">
            WELCOME HOME.
          </h1>
          <h2 className="text-2xl md:text-4xl text-white/90 mb-10 font-light tracking-tight italic">
            All Saints' Church, Lelystad
          </h2>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <Link href="/join" className="group bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl flex items-center gap-3">
              Plan Your Visit 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <Link href="/sermons" className="bg-transparent backdrop-blur-md text-white border-2 border-white/40 px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all shadow-2xl">
              Watch Sermons
            </Link>
            {/* Added: Clear Action Bible Route Link Button */}
            <Link href="/bible" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all shadow-2xl flex items-center gap-2">
              <BookOpen size={20} />
              Read Bible
            </Link>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-blue-700 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Heart</span>
            <h2 className="text-4xl md:text-6xl font-bold text-blue-950 mb-8 tracking-tighter leading-tight">
              A place to belong, <br />a place to become.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              We believe that church isn't a meeting you attend, but a family you belong to. All Saints' Church is a multicultural community in Lelystad where seekers, skeptics, and believers alike find a warm welcome and a higher purpose.
            </p>
            <Link href="/story" className="group inline-flex items-center gap-3 text-blue-900 font-black text-sm tracking-widest transition-all">
              DISCOVER OUR STORY 
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="relative">
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" className="w-full h-[500px] object-cover" alt="Community Gathering" />
             </div>
             <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-50 rounded-full z-0 opacity-50" />
          </div>
        </div>
      </section>

      {/* Automated Daily Devotion Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white border-t border-gray-100">
        <div className="mb-12 text-center md:text-left">
          <span className="text-blue-700 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Daily Bread</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 tracking-tighter">Start Your Day in the Word</h2>
        </div>
        
        {/* Renders the interactive client-side preview widget */}
        <DailyDevotion />
      </section>

    </main>
  )
}