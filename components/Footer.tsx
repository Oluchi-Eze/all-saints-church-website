'use client'
import Link from 'next/link'
import { Mail, MapPin, Phone, Globe, BookOpen } from 'lucide-react' // Added BookOpen for the Bible link icon

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        
        {/* Column 1: Brand & Mission */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-xl font-bold tracking-tighter mb-4 block">
            ALL SAINTS' CHURCH
          </Link>
          <p className="text-blue-200/70 text-sm leading-relaxed mb-6">
            A multicultural family dedicated to sharing the grace of Christ in Lelystad and beyond. 
            <span className="block mt-2 font-semibold italic text-white/80 text-xs">
              Part of the Nigerian Anglican Chaplaincy Europe (Netherlands).
            </span>
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" className="hover:text-blue-400 transition">
              <Globe size={20} />
            </a>
            <a href="mailto:info@allsaintslelystad.nl" className="hover:text-blue-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold mb-6 text-blue-300 uppercase tracking-widest text-xs">Quick Links</h3>
          <ul className="space-y-4 text-sm text-blue-100/80">
            {/* Added: Home and Bible navigation links */}
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li>
              <Link href="/bible" className="hover:text-white transition flex items-center gap-1.5 text-blue-200">
                <BookOpen size={14} /> Bible Gateway
              </Link>
            </li>
            <li><Link href="/story" className="hover:text-white transition">Our Story</Link></li>
            <li><Link href="/sermons" className="hover:text-white transition">Sermons</Link></li>
            <li><Link href="/join" className="hover:text-white transition">Connect</Link></li>
            <li><Link href="/give" className="hover:text-white transition">Donate</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Details (SEO Gold) */}
        <div>
          <h3 className="font-bold mb-6 text-blue-300 uppercase tracking-widest text-xs">Visit Us</h3>
          <ul className="space-y-4 text-sm text-blue-100/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-400 shrink-0" />
              <span>Lelystad, Flevoland<br />Netherlands</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-400 shrink-0" />
              <span>+31 (0) XX XXX XXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-400 shrink-0" />
              <span>info@allsaintslelystad.nl</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Service Times */}
        <div>
          <h3 className="font-bold mb-6 text-blue-300 uppercase tracking-widest text-xs">Sunday Service</h3>
          <div className="bg-blue-900/50 p-4 rounded-xl border border-white/5">
            <p className="text-white font-bold mb-1">10:00 AM</p>
            <p className="text-xs text-blue-200/70 italic leading-relaxed">
              Join us for a time of worship, prayer, and community.
            </p>
          </div>
          <p className="mt-4 text-[10px] text-blue-300/50 uppercase tracking-tighter">
            RSIN: XXX-XXX-XXX | ANBI Registered
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-blue-300/40 uppercase tracking-[0.2em]">
        <p>© {currentYear} All Saints' Church Lelystad</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/admin" className="hover:text-white">Admin Portal</Link>
        </div>
      </div>
    </footer>
  )
}