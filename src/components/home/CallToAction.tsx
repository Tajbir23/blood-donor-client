import Link from 'next/link';

const stats = [
  { value: '৫,০০০+', label: 'নিবন্ধিত দাতা' },
  { value: '১২,০০০+', label: 'সফল রক্তদান' },
  { value: '৬৪',     label: 'জেলায় সেবা' },
  { value: '১৫০+',   label: 'সহযোগী প্রতিষ্ঠান' },
];

export default function CallToAction() {
  return (
    <section className="my-10">
      {/* Stats row */}
      <div className="bg-white border border-stone-200 rounded-xl mb-0 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-stone-200 overflow-hidden">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-3xl font-bold text-red-700">{value}</span>
            <span className="text-sm text-stone-500 mt-1">{label}</span>
          </div>
        ))}
      </div>

      {/* CTA band */}
      <div className="relative bg-red-700 rounded-b-xl overflow-hidden">
        {/* Background pattern dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative px-6 py-12 text-center text-white">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            আজই রক্তদাতা হিসেবে যোগ দিন
          </h2>
          <p className="text-red-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            আপনার একটি রক্তদান তিনটি জীবন বাঁচাতে পারে। {' '}
            আমাদের প্ল্যাটফর্মে যোগ দিয়ে বাংলাদেশের রক্তদান আন্দোলনের অংশ হোন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"
              className="inline-block bg-white text-red-700 font-semibold px-8 py-3 rounded border border-white hover:bg-red-50 transition-colors text-sm">
              রেজিস্ট্রেশন করুন
            </Link>
            <Link href="/about"
              className="inline-block border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-colors text-sm">
              আরও জানুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
