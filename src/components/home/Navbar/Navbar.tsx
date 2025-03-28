'use client'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Profile from '../Profile/Profile'
import { usePathname } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@/lib/types/userType'

const Navbar = () => {
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState<User>()
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
        const data = queryClient.getQueryData<User>(['user']);
        console.log(data)
        if(data){
          setUser(true)
          setUserData(data)
        }
        // console.log("Cached User After Timeout:", cachedUserAfter);
    }, 100);
}, [queryClient]);

  const isActive = (path: string) => {
    return pathname === path
  }

  const activeClass = "text-red-600 font-semibold"
  const inactiveClass = "text-gray-700 hover:text-red-600"

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

            {/* Donation Amount Link */}
            <Link href="/donation" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/donation') ? activeClass : inactiveClass}`}>
                 অনুদান
              </div>
            </Link>

            {user && (userData?.role === "admin" || "superAdmin" || "moderator" || "associationSuperAdmin" || "associationModerator" || "associationAdmin") && <Link href="/dashboard" passHref>
              <div className={`flex items-center px-3 py-2 text-sm font-medium ${isActive('/donation') ? activeClass : inactiveClass}`}>
                 ড্যাশবোর্ড
              </div>
            </Link>}

            {user && userData ? <Profile userData={userData} /> : 
              <div className="flex items-center space-x-3">
                <Link 
                  href="/register" 
                  className={`${isActive('/register') ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white py-1 px-3 rounded-lg text-center text-sm font-medium transition-colors duration-200`}
                >
                  রেজিস্ট্রেশন
                </Link>
                <Link 
                  href="/login" 
                  className={`${isActive('/login') ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'} text-white py-1 px-3 rounded-lg text-center text-sm font-medium transition-colors duration-200`}
                >
                  লগইন
                </Link>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Blood Donation Link - Mobile */}
            <Link href="/blood-donation" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/blood-donation') ? activeClass : inactiveClass}`}>
                রক্তদান সেবা
              </div>
            </Link>
            
            {/* SOS Link - Mobile */}
            <Link href="/sos" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/sos') ? activeClass : inactiveClass}`}>
                জরুরি রক্তের আবেদন
              </div>
            </Link>
            
            {/* Advice Link - Mobile */}
            <Link href="/advice" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/advice') ? activeClass : inactiveClass}`}>
                পরামর্শ দিন
              </div>
            </Link>
            
            {/* Blog Link - Mobile */}
            <Link href="/blog" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/blog') ? activeClass : inactiveClass}`}>
                ব্লগ
              </div>
            </Link>
            
            <Link href="/donation" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/donation') ? activeClass : inactiveClass}`}>
                 অনুদান
              </div>
            </Link>

            {user && (userData?.role === "admin" || "superAdmin" || "moderator" || "associationSuperAdmin" || "associationModerator" || "associationAdmin") && userData?.isActive && <Link href="/dashboard" passHref>
              <div className={`flex items-center px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md ${isActive('/dashboard') ? activeClass : inactiveClass}`}>
                 ড্যাশবোর্ড
              </div>
            </Link>}
            
            {user && userData ? <Profile userData={userData} /> : 
              <div className="grid grid-cols-2 gap-2 mt-3 px-3 py-2">
                <Link 
                  href="/register" 
                  className={`${isActive('/register') ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white py-2 px-3 rounded-lg text-center font-medium transition-colors duration-200`}
                >
                  রেজিস্ট্রেশন
                </Link>
                <Link 
                  href="/login" 
                  className={`${isActive('/login') ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'} text-white py-2 px-3 rounded-lg text-center font-medium transition-colors duration-200`}
                >
                  লগইন
                </Link>
              </div>
            }
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
