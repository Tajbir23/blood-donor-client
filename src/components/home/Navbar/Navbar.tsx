'use client'
import Link from 'next/link'
import { FaBars, FaTimes, FaUser, FaChevronDown } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileDropdownOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Check if user has admin privileges
  const hasAdminAccess = userData?.user?.role === 'superAdmin' || 
                         userData?.user?.role === 'admin' || 
                         userData?.user?.role === 'moderator'

  const navItems = [
    { path: '/blood-donation', label: 'রক্তদান সেবা' },
    { path: '/sos', label: 'জরুরি রক্তের আবেদন' },
    { path: '/organizations', label: 'প্রতিষ্ঠান সমূহ' },
    { path: '/advice', label: 'পরামর্শ দিন' },
    { path: '/blog', label: 'ব্লগ' },
    { path: '/donation', label: 'অনুদান করুন' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" passHref>
              <div className="flex items-center">
                <Image src="/logo/image.png" alt="Logo" className="h-10 w-auto mr-2" width={100} height={100} />
                <span className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors">LifeDrop</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-200"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            >
              {mobileMenuOpen ? 
                <FaTimes className="h-6 w-6" /> : 
                <FaBars className="h-6 w-6" />
              }
            </button>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <div className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                  ${isActive(item.path) 
                    ? "text-red-600 font-semibold bg-red-50" 
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}>
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-full" />
                  )}
                </div>
              </Link>
            ))}

            {/* Dashboard Link - Only for admin users */}
            {userData?.user && hasAdminAccess && (
              <Link href="/dashboard" passHref>
                <div className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                  ${isActive('/dashboard') 
                    ? "text-red-600 font-semibold bg-red-50" 
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"}`}>
                  ড্যাশবোর্ড
                  {isActive('/dashboard') && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-full" />
                  )}
                </div>
              </Link>
            )}

            {/* Profile or Login Button */}
            {userData?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 rounded-md hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center">
                    {userData.user.profileImageUrl ? (
                      <Image 
                        src={`${userData.user.profileImageUrl}`} 
                        alt={userData.user.fullName} 
                        width={32} 
                        height={32} 
                        className="rounded-full h-8 w-8 object-cover mr-2" 
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                        <FaUser className="text-red-600" />
                      </div>
                    )}
                    <span className="mr-1">{userData.user.fullName?.split(' ')[0]}</span>
                    <FaChevronDown className={`transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} size={12} />
                  </div>
                </button>
                
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 transition-opacity duration-200"
                  >
                    <Link href="/profile" passHref>
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                        প্রোফাইল
                      </div>
                    </Link>
                    <Link href="/dashboard/donations" passHref>
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                        আমার রক্তদান
                      </div>
                    </Link>
                    <Link href="/settings" passHref>
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                        সেটিংস
                      </div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link href="/api/auth/logout" passHref>
                      <div className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        লগআউট
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" passHref>
                  <div className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                    লগইন
                  </div>
                </Link>
                <Link href="/register" passHref>
                  <div className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200">
                    রেজিস্টার
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <div className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path) 
                    ? "text-red-600 bg-red-50" 
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}>
                  {item.label}
                </div>
              </Link>
            ))}

            {/* Dashboard Link - Only for admin users (mobile) */}
            {userData?.user && hasAdminAccess && (
              <Link href="/dashboard" passHref>
                <div className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/dashboard') 
                    ? "text-red-600 bg-red-50" 
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}>
                  ড্যাশবোর্ড
                </div>
              </Link>
            )}

            {userData?.user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  {userData.user.profileImageUrl ? (
                    <Image 
                      src={`${userData.user.profileImageUrl}`} 
                      alt={userData.user.fullName} 
                      width={40} 
                      height={40} 
                      className="rounded-full h-10 w-10 object-cover mr-3" 
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <FaUser className="text-red-600" />
                    </div>
                  )}
                  <div>
                    <div className="text-base font-medium text-gray-800">{userData.user.fullName}</div>
                    <div className="text-sm text-gray-500">{userData.user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/profile" passHref>
                    <div className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md">
                      প্রোফাইল
                    </div>
                  </Link>
                  <Link href="/dashboard/donations" passHref>
                    <div className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md">
                      আমার রক্তদান
                    </div>
                  </Link>
                  <Link href="/settings" passHref>
                    <div className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md">
                      সেটিংস
                    </div>
                  </Link>
                  <Link href="/api/auth/logout" passHref>
                    <div className="block px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                      লগআউট
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
                <Link href="/login" passHref>
                  <div className="block w-full px-3 py-2 text-center text-base font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                    লগইন
                  </div>
                </Link>
                <Link href="/register" passHref>
                  <div className="block w-full px-3 py-2 text-center text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                    রেজিস্টার
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
