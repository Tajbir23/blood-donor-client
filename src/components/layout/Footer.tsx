import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 border-b border-red-500 pb-2">রক্তদান বিভাগ</h3>
            <p className="text-sm mb-4">
              বাংলাদেশের জন্য একটি অলাভজনক রক্তদান প্ল্যাটফর্ম। আমরা রক্তদাতা এবং রক্তের প্রয়োজনে থাকা রোগীদের মধ্যে সেতুবন্ধন তৈরি করি।
            </p>
            <div className="mt-auto">
              <p className="text-sm italic">&quot;একটি রক্তদান তিনটি জীবন বাঁচাতে পারে&quot;</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-red-500 pb-2">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-300" />
                <span className="text-sm">১২৩ মিরপুর রোড, ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-red-300" />
                <span className="text-sm">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-red-300" />
                <span className="text-sm">info@roktodanbangladesh.org</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">আমাদের অনুসরণ করুন</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:text-red-300 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://twitter.com" className="hover:text-red-300 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="https://instagram.com" className="hover:text-red-300 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://linkedin.com" className="hover:text-red-300 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-red-500 pb-2">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-red-300 transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="/become-donor" className="text-sm hover:text-red-300 transition-colors">রক্তদাতা হোন</a></li>
              <li><a href="/blood-request" className="text-sm hover:text-red-300 transition-colors">রক্তের জন্য অনুরোধ</a></li>
              <li><a href="/volunteer" className="text-sm hover:text-red-300 transition-colors">স্বেচ্ছাসেবক হোন</a></li>
              <li><a href="/privacy" className="text-sm hover:text-red-300 transition-colors">গোপনীয়তা নীতি</a></li>
              <li><a href="/terms" className="text-sm hover:text-red-300 transition-colors">শর্তাবলী</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-600 mt-8 pt-6 text-center">
          <p className="flex items-center justify-center text-sm">
            &copy; {new Date().getFullYear()} রক্তদান বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত। 
            <span className="mx-1">সাথে</span> <FaHeart className="text-red-300 mx-1" /> <span className="mx-1">তৈরি করা</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;