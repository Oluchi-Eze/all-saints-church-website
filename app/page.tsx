'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "PlaceOfWorship",
      "name": "All Saints' Church Lelystad",
      "description": "An English-speaking Anglican church serving the multicultural community of Lelystad.",
      "url": "https://your-domain.nl",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lelystad",
        "addressRegion": "Flevoland",
        "addressCountry": "NL"
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Nigerian Anglican Chaplaincy Europe"
      }
    })
  }}
/>
      {/* Cinematic Hero */}
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
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
          >
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
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-60">
          <div className="w-[30px] h-[50px] border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-white rounded-full" 
            />
          </div>
        </div>
      </section>

      {/* Discovery Section (The "Stories" hook) */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
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
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
             {/* The Stylized Image Rotation */}
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-700 ease-in-out border-8 border-white">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" className="w-full h-[500px] object-cover" alt="Community Gathering" />
             </div>
             {/* Background decorative frame */}
             <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-50 rounded-full z-0 opacity-50" />
          </motion.div>
          
        </div>
      </section>
    </main>
  )
}