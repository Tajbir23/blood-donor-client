'use client'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Profile from '../Profile/Profile'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/user/me')
      if (!response.ok) return null
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  const activeClass = "text-red-600 font-semibold"
  const inactiveClass = "text-gray-700 hover:text-red-600"

  // Check if user has admin privileges
  const hasAdminAccess = userData?.user?.role === 'superAdmin' || 
                         userData?.user?.role === 'admin' || 
                         userData?.user?.role === 'moderator'

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-3">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" passHref>
              <div className="flex items-center">
                <Image src="/logo/image.png" alt="Logo" className="h-10 w-auto mr-2" width={100} height={100} />
                <span className="text-xl font-bold text-red-600">LifeDrop</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            >
              {mobileMenuOpen ? 
                <FaTimes className="h-6 w-6" /> : 
                <FaBars className="h-6 w-6" />
              }
            </button>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Blood Donation Link */}
            <Link href="/blood-donation" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/blood-donation') ? activeClass : inactiveClass}`}>
                রক্তদান সেবা
              </div>
            </Link>
            
            {/* SOS Link */}
            <Link href="/sos" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/sos') ? activeClass : inactiveClass}`}>
                জরুরি রক্তের আবেদন
              </div>
            </Link>

            {/* Organizations Link */}
            <Link href="/organizations" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/organizations') ? activeClass : inactiveClass}`}>
                প্রতিষ্ঠান সমূহ
              </div>
            </Link>
            
            {/* Advice Link */}
            <Link href="/advice" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/advice') ? activeClass : inactiveClass}`}>
                পরামর্শ দিন
              </div>
            </Link>
            
            {/* Blog Link */}
            <Link href="/blog" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/blog') ? activeClass : inactiveClass}`}>
                ব্লগ
              </div>
            </Link>

            {/* Donation Link */}
            <Link href="/donation" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/donation') ? activeClass : inactiveClass}`}>
                অনুদান করুন
              </div>
            </Link> 

            {/* Dashboard Link - Only for admin users */}
            {userData?.user && hasAdminAccess && (
              <Link href="/dashboard" passHref>
                <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/dashboard') ? activeClass : inactiveClass}`}>
                  ড্যাশবোর্ড
                </div>
              </Link>
            )}

            {/* Profile or Login Button */}
            {userData?.user ? (
              <Profile userData={userData?.user} />
            ) : (
              <Link href="/login" passHref>
                <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/login') ? activeClass : inactiveClass}`}>
                  লগইন করুন
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/blood-donation" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/blood-donation') ? activeClass : inactiveClass}`}>
                রক্তদান সেবা
              </div>
            </Link>
            
            <Link href="/sos" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/sos') ? activeClass : inactiveClass}`}>
                জরুরি রক্তের আবেদন
              </div>
            </Link>

            <Link href="/organizations" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/organizations') ? activeClass : inactiveClass}`}>
                প্রতিষ্ঠান সমূহ
              </div>
            </Link>
            
            <Link href="/advice" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/advice') ? activeClass : inactiveClass}`}>
                পরামর্শ দিন
              </div>
            </Link>
            
            <Link href="/blog" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/blog') ? activeClass : inactiveClass}`}>
                ব্লগ
              </div>
            </Link>

            <Link href="/donation" passHref>
              <div className={`block px-3 py-2 text-base font-medium ${isActive('/donation') ? activeClass : inactiveClass}`}>
                অনুদান করুন
              </div>
            </Link>

            {/* Dashboard Link - Only for admin users (mobile) */}
            {userData?.user && hasAdminAccess && (
              <Link href="/dashboard" passHref>
                <div className={`block px-3 py-2 text-base font-medium ${isActive('/dashboard') ? activeClass : inactiveClass}`}>
                  ড্যাশবোর্ড
                </div>
              </Link>
            )}

            {userData?.user ? (
              <div className="px-3 py-2">
                <Profile userData={userData?.user} />
              </div>
            ) : (
              <Link href="/login" passHref>
                <div className={`block px-3 py-2 text-base font-medium ${isActive('/login') ? activeClass : inactiveClass}`}>
                  লগইন করুন
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
