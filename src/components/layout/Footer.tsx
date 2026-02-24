import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { APP_NAME } from '@/lib/constants/app';

const quickLinks = [
  { href: '/about',          label: 'আমাদের সম্পর্কে' },
  { href: '/blood-donation', label: 'রক্তদান সেবা' },
  { href: '/find-blood',     label: 'রক্তদাতা খুঁজুন' },
  { href: '/sos',            label: 'জরুরি আবেদন' },
  { href: '/organizations',  label: 'প্রতিষ্ঠান সমূহ' },
  { href: '/donation',       label: 'অনুদান করুন' },
];

const legalLinks = [
  { href: '/privacy', label: 'গোপনীয়তা নীতি' },
  { href: '/terms',   label: 'শর্তাবলী' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="space-y-4">
            <AppLogo
              size={40}
              nameClassName="font-serif text-xl font-bold text-white"
              className=""
            />
            <p className="text-sm leading-relaxed text-stone-400">
              বাংলাদেশের রক্তদান সম্প্রদায়কে সংযুক্ত করার একটি অলাভজনক উদ্যোগ।
              রক্তদাতা ও রোগীর মধ্যে সেতুবন্ধন তৈরিতে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
            <blockquote className="border-l-2 border-red-700 pl-3 text-sm italic text-stone-400">
              &ldquo;একটি রক্তদান তিনটি জীবন বাঁচাতে পারে&rdquo;
            </blockquote>
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {[
                { href: 'https://facebook.com', label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              ].map(({ href, label, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-red-700 hover:text-white transition-colors"
                  aria-label={label}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-white font-semibold text-base mb-4 pb-2 border-b border-stone-700">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm text-stone-400 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-red-700 group-hover:bg-red-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white font-semibold text-base mb-4 pb-2 border-b border-stone-700">
              যোগাযোগ
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:info@lifedrop.org" className="hover:text-red-400 transition-colors">
                  info@lifedrop.org
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-2">আইনি তথ্য</h4>
              <div className="flex gap-4">
                {legalLinks.map(({ href, label }) => (
                  <Link key={href} href={href} className="text-xs text-stone-500 hover:text-red-400 transition-colors underline-offset-2 hover:underline">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-stone-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            ❤️ দিয়ে তৈরি &ndash; বাংলাদেশের জন্য
          </p>
        </div>
      </div>
    </footer>
  );
}
