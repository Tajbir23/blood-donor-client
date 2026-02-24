'use client'
import { useState } from 'react'
import LocationSelector from '../ui/location-selector'
import { findBloodDonors } from '@/app/actions/bloodDonation'
import { User } from '@/lib/types/userType'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function FindBlood() {
  const [form, setForm] = useState({
    divisionId: '', districtId: '', thanaId: '',
    latitude: '', longitude: '', bloodGroup: '',
  })
  const [donors, setDonors]   = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [fallback, setFallback] = useState(false)

  const handleLocChange = (type: string, val: string, lat?: string, lng?: string) =>
    setForm(f => ({ ...f, [type]: val, latitude: lat ?? f.latitude, longitude: lng ?? f.longitude }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setSearched(true)
    try {
      const data = await findBloodDonors(form.latitude, form.longitude, form.bloodGroup)
      setDonors(data.donors ?? [])
      setFallback(!!data.isUnverifiedFallback)
    } catch { setDonors([]) }
    finally { setLoading(false) }
  }

  return (
    <section className="py-8 px-4 border-t border-stone-100">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-[11px] font-semibold text-red-700 uppercase tracking-widest mb-1">রক্তদাতা অনুসন্ধান</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">
          জরুরি <span className="text-red-700">রক্ত খুঁজুন</span>
        </h2>
      </div>

      {/* Search form */}
      <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-red-700 px-6 py-4">
          <p className="text-white/90 text-sm">এলাকা ও রক্তের গ্রুপ নির্বাচন করে নিকটবর্তী রক্তদাতা খুঁজুন</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
          {/* Blood group */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
              রক্তের গ্রুপ
            </label>
            <select
              value={form.bloodGroup}
              onChange={e => setForm(f => ({ ...f, bloodGroup: e.target.value }))}
              className="w-full border border-stone-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="">সব গ্রুপ</option>
              {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
              এলাকা নির্বাচন
            </label>
            <LocationSelector
              onDivisionChange={v => handleLocChange('divisionId', v)}
              onDistrictChange={v => handleLocChange('districtId', v)}
              onThanaChange={(v, lat, lng) => handleLocChange('thanaId', v, lat, lng)}
              defaultDivisionId={form.divisionId}
              defaultDistrictId={form.districtId}
              defaultThanaId={form.thanaId}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white font-semibold py-2.5 px-4 rounded text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  খুঁজুন
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="max-w-4xl mx-auto mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 bg-white border border-stone-200 rounded-xl">
              <div className="text-center">
                <svg className="animate-spin w-8 h-8 text-red-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <p className="text-stone-500 text-sm">রক্তদাতা খোঁজা হচ্ছে…</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
              {/* Results header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-stone-100 bg-stone-50">
                <span className="text-sm font-semibold text-stone-700">
                  {donors.length > 0 ? `${donors.length} জন রক্তদাতা পাওয়া গেছে` : 'কোন রক্তদাতা পাওয়া যায়নি'}
                </span>
                {fallback && donors.length > 0 && (
                  <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                    ⚠ যাচাইবিহীন দাতা
                  </span>
                )}
              </div>

              {donors.length > 0 ? (
                <ul className="divide-y divide-stone-100">
                  {donors.map((donor, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 hover:bg-stone-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif font-semibold text-stone-800 text-sm">{donor.fullName}</span>
                          {donor.bloodGroup && (
                            <span className="badge-blood text-[10px] w-8 h-8">{donor.bloodGroup}</span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400">{donor.address}</p>
                        {donor.phone && (
                          <p className="text-xs text-stone-500 mt-0.5">{donor.phone}</p>
                        )}
                      </div>
                      {donor.distanceKm !== undefined && (
                        <div className="text-center px-4">
                          <span className="font-serif text-xl font-bold text-red-700">{donor.distanceKm}</span>
                          <p className="text-xs text-stone-400">কি.মি.</p>
                        </div>
                      )}
                      {donor.phone && (
                        <a
                          href={`tel:${donor.phone}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          কল করুন
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-center px-4">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-700 mb-1">রক্তদাতা পাওয়া যায়নি</h3>
                  <p className="text-sm text-stone-400 max-w-sm">ভিন্ন গ্রুপ বা এলাকা নির্বাচন করে আবার চেষ্টা করুন।</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
