// Server Component — no 'use client', no useEffect, no useQuery
import Image from 'next/image';
import Link from 'next/link';
import { getLeaderboardDonors } from '@/app/actions/bloodDonation';

interface Donor {
  _id: string;
  fullName: string;
  thanaId: string;
  districtId: string;
  profileImageUrl: string;
  totalDonations?: number;
  bloodGroup?: string;
}

export default async function RegularDonor() {
  let donors: Donor[] = [];
  try {
    const res = await getLeaderboardDonors();
    donors = (res?.data ?? []).slice(0, 10);
  } catch {
    donors = [];
  }

  if (!donors.length) return null;

  return (
    <section className="py-10 bg-white border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-semibold text-red-700 uppercase tracking-widest mb-0.5">সেরা দাতারা</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">নিয়মিত রক্তদাতা</h2>
          </div>
          <Link href="/find-blood"
            className="hidden sm:inline-block px-5 py-2 text-sm font-semibold text-red-700 border border-red-700 rounded hover:bg-red-50 transition-colors flex-shrink-0">
            সকল দেখুন
          </Link>
        </div>

        {/* CSS-only horizontal scroll — no JS carousel needed */}
        <div
          className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {donors.map((donor, idx) => (
            <article
              key={donor._id}
              className="snap-start flex-shrink-0 w-40 sm:w-44 card-classic overflow-hidden text-center"
            >
              {/* Avatar */}
              <div className="relative h-32 w-full bg-stone-100">
                {donor.profileImageUrl ? (
                  <Image
                    src={donor.profileImageUrl}
                    alt={donor.fullName}
                    fill
                    sizes="176px"
                    className="object-cover object-center"
                    loading={idx < 4 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl font-bold text-stone-300 font-serif">
                      {donor.fullName?.[0] ?? '?'}
                    </span>
                  </div>
                )}
                {/* Rank badge */}
                {idx < 3 && (
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                )}
                {/* Blood group badge */}
                {donor.bloodGroup && (
                  <span className="absolute top-2 right-2 bg-red-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {donor.bloodGroup}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="px-2.5 py-2">
                <h3 className="font-serif font-bold text-stone-800 text-xs leading-snug mb-0.5 truncate">
                  {donor.fullName}
                </h3>
                <p className="text-[11px] text-stone-400 truncate">
                  {donor.districtId || ''}
                </p>
                {donor.totalDonations && (
                  <p className="text-[11px] text-red-700 font-bold mt-0.5">
                    {donor.totalDonations}× দান
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <Link href="/find-blood"
          className="sm:hidden block text-center mt-4 text-sm font-semibold text-red-700">
          সকল রক্তদাতা দেখুন →
        </Link>
      </div>
    </section>
  );
}
