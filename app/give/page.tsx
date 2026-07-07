'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Landmark, ShieldCheck, creditCard } from 'lucide-react'

export default function GivePage() {
  const [amount, setAmount] = useState<string>('50')
  const [isCustom, setIsCustom] = useState(false)

  const presets = ['10', '25', '50', '100']

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-blue-950 py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-300 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Generosity</span>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic">Give.</h1>
          <h2 className="text-xl md:text-2xl text-blue-100 font-light mt-4 tracking-wide">
            Invest in the heart of Lelystad.
          </h2>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: The Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-blue-950 mb-8 tracking-tight">Select Amount</h3>
            
            {/* Amount Presets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => { setAmount(p); setIsCustom(false); }}
                  className={`py-4 rounded-2xl font-bold transition-all ${
                    amount === p && !isCustom 
                    ? 'bg-blue-900 text-white shadow-lg scale-105' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  €{p}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="mb-8">
              <label className="text-xs uppercase font-bold text-gray-400 tracking-widest mb-3 block">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                <input 
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-10 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-2xl outline-none transition-all font-bold text-lg"
                  onChange={(e) => { setAmount(e.target.value); setIsCustom(true); }}
                />
              </div>
            </div>

            {/* Information Form */}
            <div className="space-y-4 mb-8">
               <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 transition" />
               <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 transition" />
               <select className="w-full px-6 py-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 transition text-gray-500">
                  <option>General Fund</option>
                  <option>Building Project</option>
                  <option>Welfare / Outreach</option>
               </select>
            </div>

            <button className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all shadow-xl flex justify-center items-center gap-3">
              INVEST €{amount || '0'} NOW
            </button>
            
            <p className="text-center text-gray-400 text-[10px] mt-6 uppercase tracking-widest">
              Secure Payment encrypted by SSL
            </p>
          </motion.div>

          {/* Right Side: Trust & Bank Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-bold text-blue-950 mb-6 tracking-tighter leading-tight">Your gift transforms lives in Flevoland.</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                When you invest in All Saints' Church, you aren't just giving to a building—you are supporting a family that reaches out to the lonely, provides a home for the expat, and shares the light of Christ in Lelystad.
              </p>
            </div>

            {/* Traditional Bank Info for the NL */}
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-4 mb-6">
                <Landmark className="text-blue-900" />
                <h4 className="font-bold text-blue-900 tracking-tight">Direct Bank Transfer</h4>
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex justify-between border-b border-blue-200/50 pb-2"><span className="text-blue-600/70">Account:</span> <span className="font-bold text-blue-900 text-right">All Saints' Church Lelystad</span></p>
                <p className="flex justify-between border-b border-blue-200/50 pb-2"><span className="text-blue-600/70">IBAN:</span> <span className="font-mono font-bold text-blue-900">NL00 XXXX 0000 0000 00</span></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-950">ANBI Registered</h4>
                <p className="text-sm text-gray-500">Your donations are tax-deductible under the Dutch ANBI regulations via the Chaplaincy.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}