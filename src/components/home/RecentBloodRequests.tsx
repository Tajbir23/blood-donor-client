import Link from 'next/link';
import { getBloodRequest } from '@/app/actions/bloodDonation';
import BloodRequestType from '@/lib/types/bloodRequestType';

export default async function RecentBloodRequests() {
  let requests: BloodRequestType[] = [];
  try {
    const res = await getBloodRequest(1, 6);
    requests = res?.data ?? [];
  } catch {
    requests = [];
  }

  if (!requests.length) return null;

  const urgencyMap: Record<string, { label: string; dot: string; border: string }> = {
    emergency: { label: 'অতি জরুরি', dot: 'bg-red-600',   border: 'border-l-red-600' },
    urgent:    { label: 'জরুরি',     dot: 'bg-amber-500', border: 'border-l-amber-500' },
    normal:    { label: 'সাধারণ',   dot: 'bg-stone-400', border: 'border-l-stone-300' },
  };

  return (
    <section className="py-10 px-4 border-t border-stone-100 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-semibold text-red-700 uppercase tracking-widest mb-0.5">সাম্প্রতিক অনুরোধ</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">রক্তের প্রয়োজন আছে</h2>
          </div>
          <Link
            href="/blood-donation"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-700 border border-red-700 rounded hover:bg-red-50 transition-colors flex-shrink-0"
          >
            সব দেখুন
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {requests.map((req) => {
            const u = urgencyMap[req.urgencyLevel] ?? urgencyMap.normal;
            return (
              <div
                key={req._id}
                className={`bg-white border border-stone-200 border-l-4 ${u.border} rounded-lg p-4 flex gap-3 hover:shadow-md transition-shadow`}
              >
                {/* Blood group */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-700 text-white flex flex-col items-center justify-center shadow-sm">
                  <span className="font-serif font-black text-base leading-none">{req.bloodGroup}</span>
                  <span className="text-[9px] text-red-300 mt-0.5">{req.bloodUnits}ব্যাগ</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h3 className="font-serif font-bold text-stone-800 text-sm leading-snug truncate">{req.patientName}</h3>
                    <span className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-bold`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.dot}`} />
                      <span className="text-stone-500">{u.label}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-snug mb-1.5">{req.patientProblem}</p>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{req.hospitalName} · {req.districtId}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center mt-5">
          <Link href="/blood-donation" className="text-sm font-semibold text-red-700">
            সব রক্তের অনুরোধ দেখুন →
          </Link>
        </div>
      </div>
    </section>
  );
}
