'use client'
import Link from 'next/link'
import { FaDonate, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import Image from 'next/image'
import Profile from '../Profile/Profile'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
              <div className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
                রক্তদান
              </div>
            </Link>
            
            {/* SOS Link */}
            <Link href="/sos" passHref>
              <div className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
                জরুরি সাহায্য
              </div>
            </Link>
            
            {/* Advice Link */}
            <Link href="/advice" passHref>
              <div className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
                পরামর্শ
              </div>
            </Link>
            
            {/* Blog Link */}
            <Link href="/blog" passHref>
              <div className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
                ব্লগ
              </div>
            </Link>

            {/* Donation Amount Link */}
            <Link href="/donation" passHref>
              <div className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
                <FaDonate className="mr-1" /> অনুদান
              </div>
            </Link>

            {user ? <Profile /> : 
              <div className="flex items-center space-x-3">
                <Link 
                  href="/register" 
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-center text-sm font-medium transition-colors duration-200"
                >
                  রেজিস্ট্রেশন
                </Link>
                <Link 
                  href="/login" 
                  className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-lg text-center text-sm font-medium transition-colors duration-200"
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
              <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                রক্তদান
              </div>
            </Link>
            
            {/* SOS Link - Mobile */}
            <Link href="/sos" passHref>
              <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                জরুরি সাহায্য
              </div>
            </Link>
            
            {/* Advice Link - Mobile */}
            <Link href="/advice" passHref>
              <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                পরামর্শ
              </div>
            </Link>
            
            {/* Blog Link - Mobile */}
            <Link href="/blog" passHref>
              <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                ব্লগ
              </div>
            </Link>
            
            <Link href="/donation" passHref>
              <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                <FaDonate className="mr-2" /> অনুদান
              </div>
            </Link>
            
            {user ? <Profile /> : 
              <div className="grid grid-cols-2 gap-2 mt-3 px-3 py-2">
                <Link 
                  href="/register" 
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-center font-medium transition-colors duration-200"
                >
                  রেজিস্ট্রেশন
                </Link>
                <Link 
                  href="/login" 
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-center font-medium transition-colors duration-200"
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
