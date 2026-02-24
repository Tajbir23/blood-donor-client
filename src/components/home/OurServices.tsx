
import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'জরুরি SOS আবেদন',
    description: 'জরুরি পরিস্থিতিতে নিকটবর্তী যাচাইকৃত রক্তদাতাদের কাছে তাৎক্ষণিক SMS ও ইমেইল বিজ্ঞপ্তি পাঠান।',
    href: '/sos',
    cta: 'আবেদন করুন',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'যাচাইকৃত ডোনার নেটওয়ার্ক',
    description: 'মেডিকেল যাচাইয়ের মাধ্যমে বাছাইকৃত হাজারো বিশ্বস্ত রক্তদাতার নেটওয়ার্কে সংযুক্ত হোন।',
    href: '/find-blood',
    cta: 'ডোনার খুঁজুন',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'রক্তদান ক্যাম্প',
    description: 'স্বেচ্ছাসেবী সংস্থাগুলোর আয়োজিত রক্তদান ক্যাম্পে অংশগ্রহণ করুন এবং সহজেই নিবন্ধন করুন।',
    href: '/blood-donation',
    cta: 'বিস্তারিত দেখুন',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'সংগঠন তালিকা',
    description: 'বাংলাদেশের ১৫০+ রক্তদান সংগঠন ও ব্লাড ব্যাংকের সাথে সরাসরি যোগাযোগ করুন।',
    href: '/organizations',
    cta: 'প্রতিষ্ঠান দেখুন',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'রক্তদান ইতিহাস',
    description: 'আপনার সমস্ত রক্তদানের তারিখ ও বিস্তারিত তথ্য একটি জায়গায় সুরক্ষিত রাখুন।',
    href: '/my-donations',
    cta: 'ইতিহাস দেখুন',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'শিক্ষামূলক ব্লগ',
    description: 'রক্তদান সম্পর্কিত সচেতনতা, স্বাস্থ্য পরামর্শ ও সাম্প্রতিক তথ্য জানুন।',
    href: '/blog',
    cta: 'পড়ুন',
  },
];

export default function OurServices() {
  const [featured, regular] = [services.slice(0, 2), services.slice(2)];
  return (
    <section className="py-10 px-4 border-t border-stone-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] font-semibold text-red-700 uppercase tracking-widest mb-1">সেবা সমূহ</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">আমরা যা প্রদান করি</h2>
        </div>

        {/* Featured top 2: SOS + Donors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {featured.map(({ icon, title, description, href, cta }) => (
            <Link key={title} href={href}
              className="card-classic p-5 flex gap-4 items-start hover:border-red-300 transition-colors group">
              <div className="w-11 h-11 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base font-bold text-stone-800 mb-1">{title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
                <span className="text-xs font-semibold text-red-700 mt-2 inline-block">{cta} →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Compact 4-col grid: rest of services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {regular.map(({ icon, title, href, cta }) => (
            <Link key={title} href={href}
              className="card-classic px-4 py-3 flex items-center gap-3 hover:border-stone-300 transition-colors group">
              <div className="w-9 h-9 rounded-md bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 group-hover:border-red-100 transition-colors shrink-0">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-red-700">{icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-700 leading-snug">{title}</p>
                <p className="text-[11px] text-red-700 font-semibold">{cta} →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
