'use client'
import { useState } from 'react'
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, sanityToken } from '../../sanity/env'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token: sanityToken,
})

export default function JoinPage() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    type: 'Full Member',
    birthMonth: 1,
    birthDay: 1,
    emailOptIn: true
  })

  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitting to Chaplaincy records...')

    try {
      await writeClient.create({
        _type: 'member',
        fullName: formData.name,
        email: formData.email,
        membershipType: formData.type,
        birthMonth: formData.birthMonth,
        birthDay: formData.birthDay,
        emailOptIn: formData.emailOptIn,
        status: 'pending',
      })
      
      setStatus('Success! Your application has been recorded.')
      setFormData({ 
        name: '', 
        email: '', 
        type: 'Full Member', 
        birthMonth: 1, 
        birthDay: 1, 
        emailOptIn: true
      })
    } catch (err) {
      console.error(err)
      setStatus('Error: Could not save to Sanity.')
    }
  }

  return (
    /* Changed mt-12 to mt-6 on mobile, mt-12 on desktop. Added smaller padding p-6 for mobile */
    <div className="max-w-lg mx-auto mt-6 md:mt-12 p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Join Us</h1>
      <p className="text-gray-600 mb-6">Membership Registration</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            /* Added text-base to prevent iPhone zoom */
            className="w-full p-3 text-base border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            /* Added text-base to prevent iPhone zoom */
            className="w-full p-3 text-base border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Membership Classification</label>
          <select 
            /* Added text-base to prevent iPhone zoom */
            className="w-full p-3 text-base border rounded-md bg-white outline-none"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Full Member">Full Member</option>
            <option value="Associate Member">Associate Member</option>
            <option value="Honorary Member">Honorary Member</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Birth Month</label>
            <select 
              /* Added text-base */
              className="w-full p-3 text-base border rounded-md bg-white text-black"
              value={formData.birthMonth}
              onChange={(e) => setFormData({ ...formData, birthMonth: parseInt(e.target.value) })}
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Birth Day</label>
            <input
              type="number"
              min="1"
              max="31"
              /* Added text-base */
              className="w-full p-3 text-base border rounded-md bg-white text-black"
              value={formData.birthDay}
              onChange={(e) => setFormData({ ...formData, birthDay: parseInt(e.target.value) })}
              required
            />
          </div>
        </div>

        <div className="flex items-start gap-2 py-2">
          <input 
            type="checkbox"
            id="optIn"
            checked={formData.emailOptIn}
            onChange={(e) => setFormData({ ...formData, emailOptIn: e.target.checked })}
            className="w-5 h-5 mt-0.5" /* Slightly larger checkbox for easier tapping */
          />
          <label htmlFor="optIn" className="text-sm text-gray-700 leading-tight">
            I would like to receive a digital greeting on my birthday.
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-700 text-white font-bold py-4 rounded-md hover:bg-blue-800 transition shadow-md">
          Submit to All Saints' Council
        </button>
      </form>

      {status && (
        <div className="mt-6 p-4 rounded-md text-center bg-blue-50 text-blue-900 border border-blue-100">
          {status}
        </div>
      )}
    </div>
  )
}