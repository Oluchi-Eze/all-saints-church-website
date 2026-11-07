
'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Navigation,
  ArrowRight
} from 'lucide-react'
import { sendEmail } from '@/app/actions/sendEmail'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitted(true)
        formRef.current?.reset()
      } else {
        setError(result.error || 'Unable to send your message. Please try again.')
      }
    } catch {
      setError('A connection error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white min-h-screen overflow-hidden text-slate-900">

      {/* SOLID BLUE HERO */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-[#123B75]">

        {/* Decorative background circles */}
        <div className="absolute -top-32 -right-20 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] border border-white/10 rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16"
        >
          <span className="inline-block text-blue-200 font-bold tracking-[0.3em] uppercase text-xs mb-6">
            We Would Love to Hear From You
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-7">
            GET IN <span className="text-blue-300">TOUCH.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you have a question, need pastoral care, or want to become
            part of our church family, we are here to help.
          </p>
        </motion.div>

        {/* Bottom decorative curve */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[50%] scale-x-110 translate-y-8" />

      </section>

      {/* CONTACT CONTENT */}
      <section className="relative py-16 md:py-24 px-6">

        <div className="max-w-7xl mx-auto">

          {/* SECTION INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-blue-700 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Connect With Us
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-blue-950 tracking-tight mb-5">
              We're Just a Message Away.
            </h2>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              We would be delighted to hear from you. Reach out to us using
              the details below or send us a message through our contact form.
            </p>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-6"
            >

              <div className="bg-blue-950 rounded-[2rem] p-8 sm:p-10 text-white shadow-2xl shadow-blue-950/20 relative overflow-hidden">

                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 border border-white/10 rounded-full" />
                <div className="absolute -top-10 -right-10 w-44 h-44 border border-white/10 rounded-full" />

                <div className="relative z-10">

                  <span className="text-blue-300 font-bold tracking-[0.25em] uppercase text-xs">
                    Contact Information
                  </span>

                  <h2 className="text-3xl font-bold mt-4 mb-3">
                    Visit Us.
                  </h2>

                  <p className="text-blue-100/70 text-sm leading-relaxed mb-10">
                    We look forward to welcoming you. Connect with us and
                    discover a community of faith, worship and fellowship.
                  </p>

                  {/* ADDRESS */}
                  <div className="flex items-start gap-5 mb-9">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <MapPin size={22} className="text-blue-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white mb-2">
                        Our Location
                      </h3>

                      <p className="text-blue-100/70 text-sm leading-relaxed">
                        Snijdersstraat 129<br />
                        8223 AA Lelystad<br />
                        Netherlands
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-5 mb-9">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Mail size={22} className="text-blue-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white mb-2">
                        Email Address
                      </h3>

                      <a
                        href="mailto:info@nace-netherlands.org"
                        className="text-blue-200 text-sm hover:text-white transition-colors break-all"
                      >
                        info@nace-netherlands.org
                      </a>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Phone size={22} className="text-blue-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white mb-2">
                        Phone
                      </h3>

                      <a
                        href="tel:+31685863163"
                        className="text-blue-200 text-sm hover:text-white transition-colors"
                      >
                        +31 6 85863163
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* MAP CARD */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-xl shadow-blue-950/5">

                <div className="flex items-center justify-between px-2 mb-4">
                  <div>
                    <span className="text-blue-700 font-bold uppercase tracking-widest text-[10px]">
                      Find Us
                    </span>

                    <h3 className="text-lg font-bold text-blue-950 mt-1">
                      Our Location
                    </h3>
                  </div>

                  <MapPin className="text-blue-700" size={22} />
                </div>

                <div className="w-full h-64 overflow-hidden rounded-2xl border border-gray-100">
                  <iframe
                    src="https://maps.google.com/maps?q=Snijdersstraat%20129%2C%208223%20AA%20Lelystad%2C%20Netherlands&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NACE Netherlands Location - Lelystad"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Snijdersstraat+129%2C+8223+AA+Lelystad%2C+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-50 text-blue-900 font-bold text-sm hover:bg-blue-100 transition-colors"
                >
                  <Navigation size={17} />
                  Get Directions
                  <ArrowRight size={16} />
                </a>

              </div>

            </motion.div>

            {/* RIGHT COLUMN - FORM */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >

              <div className="bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-10 md:p-12 shadow-2xl shadow-blue-950/5">

                {submitted ? (

                  /* SUCCESS MESSAGE */
                  <div className="text-center py-16">

                    <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-7">
                      <CheckCircle2 size={42} />
                    </div>

                    <span className="text-blue-700 font-bold uppercase tracking-[0.25em] text-xs">
                      Message Received
                    </span>

                    <h3 className="text-3xl font-bold text-blue-950 mt-4 mb-4">
                      Thank You!
                    </h3>

                    <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-9">
                      Your message has been successfully sent to NACE Netherlands.
                      Thank you for reaching out. We look forward to getting
                      back to you.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setError(null)
                      }}
                      className="inline-flex items-center gap-3 bg-blue-950 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-800 transition-all shadow-lg"
                    >
                      Send Another Message
                      <ArrowRight size={17} />
                    </button>

                  </div>

                ) : (

                  /* CONTACT FORM */
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >

                    <div className="mb-8">
                      <span className="text-blue-700 font-bold uppercase tracking-[0.25em] text-xs">
                        Send an Enquiry
                      </span>

                      <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mt-3 mb-3 tracking-tight">
                        Send Us a Message.
                      </h2>

                      <p className="text-gray-500 text-sm leading-relaxed">
                        Complete the form below and a member of our team
                        will get back to you.
                      </p>
                    </div>

                    {/* ERROR MESSAGE */}
                    {error && (
                      <div
                        role="alert"
                        className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3"
                      >
                        <AlertCircle size={19} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* NAME AND EMAIL */}
                    <div className="grid sm:grid-cols-2 gap-6">

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-950 mb-3">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          required
                          maxLength={120}
                          autoComplete="name"
                          placeholder="Your full name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-950 mb-3">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          name="email"
                          required
                          maxLength={254}
                          autoComplete="email"
                          placeholder="name@example.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all"
                        />
                      </div>

                    </div>

                    {/* INQUIRY TYPE */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-blue-950 mb-3">
                        Subject / Reason for Inquiry
                      </label>

                      <select
                        name="inquiry_type"
                        defaultValue="General Inquiry"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all"
                      >
                        <option value="General Inquiry">
                          General Inquiry
                        </option>

                        <option value="Pastoral Care & Prayer">
                          Pastoral Care & Prayer
                        </option>

                        <option value="All Saints' Church Lelystad">
                          All Saints' Church Lelystad
                        </option>

                        <option value="Donations & Stewardship (ANBI)">
                          Donations & Stewardship (ANBI)
                        </option>

                        <option value="Church Membership">
                          Church Membership
                        </option>
                      </select>
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-blue-950 mb-3">
                        Your Message *
                      </label>

                      <textarea
                        name="message"
                        required
                        maxLength={10000}
                        rows={6}
                        placeholder="How can we assist you?"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all resize-y"
                      />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full bg-blue-950 text-white py-5 px-8 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-blue-800 transition-all duration-300 shadow-xl shadow-blue-950/15 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending Your Message...
                        </>
                      ) : (
                        <>
                          <Send size={19} />
                          Send Message
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 leading-relaxed">
                      Your enquiry will be sent directly to NACE Netherlands.
                    </p>

                  </form>

                )}

              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="bg-blue-950 py-20 px-6 text-center relative overflow-hidden">

        <div className="absolute -top-32 -right-20 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -bottom-48 -left-20 w-96 h-96 border border-white/10 rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto">

          <span className="text-blue-300 font-bold uppercase tracking-[0.3em] text-xs">
            A Place to Belong
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mt-5 mb-6 tracking-tight">
            We Look Forward to Meeting You.
          </h2>

          <p className="text-blue-100/70 text-base md:text-lg leading-relaxed">
            At All Saints' Church, Lelystad, there is a place for you.
            Come and experience faith, fellowship and the love of Christ.
          </p>

        </div>
      </section>

    </main>
  )
}
