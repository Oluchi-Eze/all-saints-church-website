'use client'
import { useState } from 'react'
import { client } from '@/sanity/lib/client'

interface Member {
  _id: string;
  fullName: string;
  birthDay: number;
  birthMonth: number;
  emailOptIn: boolean;
  status: string;
  membershipType: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Use your specific password
    if (password === 'NACE-NL-admin01') { 
      const query = `*[_type == "member"] | order(birthMonth asc, birthDay asc)`
      const data = await client.fetch(query)
      setMembers(data)
      setIsAuthenticated(true)
    } else {
      alert("Incorrect Password")
    }
  }

  // 1. SHOW LOGIN FORM IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white text-black">
        <h1 className="text-2xl font-bold mb-4 text-center">Secretary Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="w-full p-3 border rounded bg-white text-black outline-none focus:ring-2 focus:ring-blue-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-900 text-white p-3 rounded font-bold hover:bg-blue-800 transition">
            Access Records
          </button>
        </form>
      </div>
    )
  }

  // 2. LOGIC FOR THE DASHBOARD (ONLY RUNS AFTER LOGIN)
  const currentMonth = new Date().getMonth() + 1;
  const birthdayPeople = members.filter((m: any) => m.birthMonth === currentMonth);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <a 
          href="https://all-saints-church-website.sanity.studio" 
          target="_blank" 
          className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-600 transition text-sm"
        >
          Open Sanity Studio
        </a>
      </div>

      {/* Birthday Alert Box (Protected) */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-4">
        <div className="text-3xl">🎂</div>
        <div>
          <h2 className="font-bold text-blue-900">Birthdays this Month</h2>
          <p className="text-blue-700">
            {birthdayPeople.length > 0 
              ? `There are ${birthdayPeople.length} members celebrating this month: ${birthdayPeople.map((p: any) => p.fullName).join(', ')}.`
              : "No birthdays recorded for this month."}
          </p>
        </div>
      </div>

      {/* Member Table */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Birthday</th>
              <th className="p-4">Opt-in?</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m: Member) => (
              <tr key={m._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{m.fullName}</td>
                <td className="p-4">{m.birthDay}/{m.birthMonth}</td>
                <td className="p-4">{m.emailOptIn ? '✅ Yes' : '❌ No'}</td>
                <td className={`p-4 font-bold ${m.status === 'approved' ? 'text-green-600' : 'text-red-500 uppercase text-xs'}`}>
                  {m.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}