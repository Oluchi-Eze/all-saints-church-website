'use client'
import { motion } from 'framer-motion'

export default function StoryPage() {
  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-blue-900 py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-300 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Journey</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">OUR STORY</h1>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        
        {/* Section 1: The Vision */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl font-bold text-blue-950 mb-6 tracking-tight">A Place to Belong.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              All Saints' Church Lelystad began with a simple but profound vision: to create a spiritual home that transcends borders. We saw a need for an English-speaking community in Flevoland where faith isn't just a tradition, but a living, breathing experience of family.
            </p>
          </motion.div>
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl transform md:rotate-2">
            <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80" alt="Worship" className="w-full h-80 object-cover" />
          </div>
        </section>

        {/* Section 2: The Foundation (NACE) */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform md:-rotate-2 border-8 border-gray-50">
            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80" alt="Community" className="w-full h-80 object-cover" />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-950 mb-6 tracking-tight">Rooted in Heritage.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              While our doors are open to all, we are proudly rooted in the rich liturgical heritage of the **Nigerian Anglican Chaplaincy Europe (Netherlands)**. This foundation provides us with the depth of tradition and the global perspective that fuels our mission to reach every soul in Lelystad.
            </p>
          </motion.div>
        </section>

        {/* Section 3: ANBI / Transparency */}
        <section className="bg-gray-50 rounded-[3rem] p-10 md:p-20 text-center border border-gray-100">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-blue-950 mb-6">Transparency & Trust</h2>
            <p className="text-gray-600 mb-8 italic">
              All Saints' Church is committed to the highest standards of financial and administrative integrity. As a registered ANBI entity through the Chaplaincy, we ensure that every gift is used for the glory of God and the service of our community.
            </p>
            <div className="flex justify-center gap-4">
               <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-800 transition">
                 DOWNLOAD ANBI REPORT
               </button>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}