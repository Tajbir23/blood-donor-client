'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import InstallButton from './InstallButton'
import { logoutUser } from '@/app/actions/authentication'
import toast from 'react-hot-toast'
import AppLogo from '@/components/ui/AppLogo'

const NAV_LINKS = [
  { href: '/blood-donation', label: 'রক্তদান সেবা' },
  { href: '/sos',            label: 'জরুরি আবেদন' },
  { href: '/find-blood',     label: 'রক্ত খুঁজুন' },
  { href: '/organizations',  label: 'প্রতিষ্ঠান' },
  { href: '/about',          label: 'আমাদের সম্পর্কে' },
]

const MORE_LINKS = [
  { href: '/blog',     label: 'ব্লগ' },
  { href: '/advice',   label: 'পরামর্শ' },
  { href: '/donation', label: 'অনুদান' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [profileOpen, setProfileOpen]     = useState(false)
  const [moreOpen, setMoreOpen]           = useState(false)
  const pathname   = usePathname()
  const router     = useRouter()
  const qc         = useQueryClient()
  const profileRef = useRef<HTMLDivElement>(null)
  const moreRef    = useRef<HTMLDivElement>(null)

  const { data: auth } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const r = await fetch('/api/user/me')
      return r.ok ? r.json() : null
    },
    staleTime: 1000 * 60 * 5,
  })

  const user          = auth?.user
  const hasAdmin      = ['superAdmin', 'admin', 'moderator'].includes(user?.role)
  const isActive      = (p: string) => pathname === p

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
    setProfileOpen(false)
    setMoreOpen(false)
  }, [pathname])

  /* Click-outside for dropdowns */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
      if (moreRef.current   && !moreRef.current.contains(e.target as Node))    setMoreOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    const res = await logoutUser()
    if (res.success) {
      toast.success(res.message)
      qc.clear()
      router.push('/')
    }
  }

  const linkClass = (href: string) =>
    `relative py-1 text-sm font-medium transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-200 hover:text-red-700 hover:after:scale-x-100 ${
      isActive(href) ? 'text-red-700 after:scale-x-100' : 'text-stone-600'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      {/* Top red accent bar */}
      <div className="h-1 bg-red-700 w-full" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <AppLogo
            size={36}
            nameClassName="text-lg font-serif font-bold text-red-700 tracking-tight"
          />

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(o => !o)}
                className={`${linkClass('')} flex items-center gap-1`}
              >
                আরও
                <svg className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-stone-200 rounded-md shadow-lg py-1 z-50 animate-fadeIn">
                  {MORE_LINKS.map(({ href, label }) => (
                    <Link key={href} href={href}
                      className={`block px-4 py-2 text-sm transition-colors ${isActive(href) ? 'text-red-700 bg-red-50' : 'text-stone-700 hover:bg-stone-50 hover:text-red-700'}`}>
                      {label}
                    </Link>
                  ))}
                  {user && hasAdmin && (
                    <Link href="/dashboard"
                      className={`block px-4 py-2 text-sm transition-colors ${isActive('/dashboard') ? 'text-red-700 bg-red-50' : 'text-stone-700 hover:bg-stone-50 hover:text-red-700'}`}>
                      ড্যাশবোর্ড
                    </Link>
                  )}
                </div>
              )}
            </div>

            <InstallButton />
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 py-1 px-2 rounded-full border border-stone-200 hover:border-red-300 transition-colors"
                >
                  {user.profileImageUrl ? (
                    <Image src={user.profileImageUrl} alt={user.fullName} width={30} height={30} className="rounded-full object-cover w-7 h-7" />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-xs font-bold">
                      {user.fullName?.[0] ?? '?'}
                    </span>
                  )}
                  <span className="text-sm font-medium text-stone-700 max-w-[100px] truncate">{user.fullName?.split(' ')[0]}</span>
                  <svg className={`w-3 h-3 text-stone-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-md shadow-lg py-1 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-sm font-semibold text-stone-800 truncate">{user.fullName}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                    </div>
                    {[
                      { href: '/profile',      label: 'প্রোফাইল' },
                      { href: '/my-donations', label: 'আমার রক্তদান' },
                    ].map(({ href, label }) => (
                      <Link key={href} href={href}
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-red-700 transition-colors">
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-stone-100 mt-1" />
                    <button onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      লগআউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="px-4 py-1.5 text-sm font-medium text-red-700 border border-red-700 rounded hover:bg-red-50 transition-colors">
                  লগইন
                </Link>
                <Link href="/register"
                  className="px-4 py-1.5 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 transition-colors">
                  রেজিস্টার
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-stone-600 hover:text-red-700 focus:outline-none"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="মেনু"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors ${isActive(href) ? 'text-red-700 bg-red-50' : 'text-stone-700 hover:bg-stone-50 hover:text-red-700'}`}>
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-stone-100">
              <p className="px-3 py-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">আরও</p>
              {MORE_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}
                  className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors ${isActive(href) ? 'text-red-700 bg-red-50' : 'text-stone-700 hover:bg-stone-50 hover:text-red-700'}`}>
                  {label}
                </Link>
              ))}
              {user && hasAdmin && (
                <Link href="/dashboard"
                  className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-red-700 bg-red-50' : 'text-stone-700 hover:bg-stone-50 hover:text-red-700'}`}>
                  ড্যাশবোর্ড
                </Link>
              )}
            </div>
            <div className="pt-2 border-t border-stone-100">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    {user.profileImageUrl ? (
                      <Image src={user.profileImageUrl} alt={user.fullName} width={36} height={36} className="rounded-full object-cover" />
                    ) : (
                      <span className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">{user.fullName?.[0]}</span>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{user.fullName}</p>
                      <p className="text-xs text-stone-400">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/profile"      className="block px-3 py-2 text-sm text-stone-700 hover:text-red-700 hover:bg-stone-50 rounded">প্রোফাইল</Link>
                  <Link href="/my-donations" className="block px-3 py-2 text-sm text-stone-700 hover:text-red-700 hover:bg-stone-50 rounded">আমার রক্তদান</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">লগআউট</button>
                </>
              ) : (
                <div className="flex gap-2 px-3 py-2">
                  <Link href="/login"    className="flex-1 text-center py-2 text-sm font-medium text-red-700 border border-red-700 rounded hover:bg-red-50">লগইন</Link>
                  <Link href="/register" className="flex-1 text-center py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800">রেজিস্টার</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
