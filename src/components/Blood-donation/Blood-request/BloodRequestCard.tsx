'use client'
import BloodRequestType from "@/lib/types/bloodRequestType"

const BloodRequestCard = ({ request }: { request: BloodRequestType }) => {
  const urgency = {
    emergency: { label: 'অতি জরুরি', cls: 'bg-red-700 text-white' },
    urgent:    { label: 'জরুরি',     cls: 'bg-amber-500 text-white' },
    normal:    { label: 'সাধারণ',   cls: 'bg-stone-200 text-stone-700' },
  }[request.urgencyLevel as 'emergency' | 'urgent' | 'normal'] ?? { label: 'সাধারণ', cls: 'bg-stone-200 text-stone-700' }

  const borderCls = request.urgencyLevel === 'emergency'
    ? 'border-l-red-700'
    : request.urgencyLevel === 'urgent'
    ? 'border-l-amber-500'
    : 'border-l-stone-300'

  return (
    <div className={`card-classic overflow-hidden border-l-4 ${borderCls}`}>
      {/* Top row: blood group + patient + urgency badge */}
      <div className="px-4 pt-4 pb-3 flex items-start gap-3">
        {/* Blood group */}
        <div className="flex-shrink-0 text-center">
          <div className="w-14 h-14 rounded-xl bg-red-700 text-white flex flex-col items-center justify-center shadow-sm">
            <span className="font-serif font-black text-xl leading-none">{request.bloodGroup}</span>
            <span className="text-[9px] text-red-300 mt-0.5">{request.bloodUnits} ব্যাগ</span>
          </div>
        </div>
        {/* Patient info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-stone-800 text-base leading-snug">{request.patientName}</h3>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0 whitespace-nowrap ${urgency.cls}`}>{urgency.label}</span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">{request.patientProblem}</p>
          {request.patientAge && request.patientGender && (
            <p className="text-xs text-stone-400">
              {request.patientAge} বছর · {request.patientGender === 'male' ? 'পুরুষ' : request.patientGender === 'female' ? 'মহিলা' : 'অন্যান্য'}
            </p>
          )}
        </div>
      </div>

      {/* Info rows */}
      <div className="px-4 pb-3 space-y-1.5">
        <div className="flex items-start gap-2 text-xs text-stone-500">
          <svg className="w-3.5 h-3.5 text-stone-300 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {request.hospitalName}{request.hospitalWard ? `, ${request.hospitalWard}` : ''}
            {' '}<span className="text-stone-300">—</span>{' '}
            {request.thanaId}, {request.districtId}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-stone-400">
          <span>
            প্রয়োজন: <span className="text-stone-600 font-medium">{new Date(request.requiredDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })}</span>
          </span>
          <span className="text-stone-200">|</span>
          <span>অনুরোধ: {new Date(request.createdAt ?? new Date()).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' })}</span>
        </div>
        {request.additionalInfo && (
          <p className="text-xs text-stone-400 italic">{request.additionalInfo}</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
        <div className="text-xs text-stone-500 truncate">
          <span className="font-semibold text-stone-600">{request.contactPerson}</span>
          {request.relation ? <span className="text-stone-400"> · রোগীর {request.relation}</span> : ''}
        </div>
        <a
          href={`tel:${request.contactNumber}`}
          className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 bg-red-700 text-white text-xs font-semibold rounded hover:bg-red-800 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          কল করুন
        </a>
      </div>
    </div>
  )
}

export default BloodRequestCard
