"use client"
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaTint, FaCalendarAlt, FaBuilding, FaCog, FaSignOutAlt, FaBars, FaTimes, FaImage, FaFacebook, FaTelegram, FaBrain } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/lib/types/userType';
import AppLogo from '@/components/ui/AppLogo';

interface UserQueryData {
  user: User
}
const Sidebar = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const user = useMemo(() => {
    return queryClient.getQueryData<UserQueryData>(["user"])
  },[queryClient])

  const isSuperAdmin = user?.user.role === 'superAdmin'
  const isAdmin = user?.user.role === 'admin'

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <FaHome className="mr-3" /> },
    { title: 'Users', path: '/dashboard/users', icon: <FaUser className="mr-3" /> },
    { title: 'Slider', path: '/dashboard/slider', icon: <FaImage className="mr-3" /> },
    { title: 'Blood Donations', path: '/dashboard/donations', icon: <FaTint className="mr-3" /> },
    { title: 'Appointments', path: '/dashboard/appointments', icon: <FaCalendarAlt className="mr-3" /> },
    { title: 'Organizations', path: '/dashboard/organizations', icon: <FaBuilding className="mr-3" /> },
    { title: 'Settings', path: '/dashboard/settings', icon: <FaCog className="mr-3" /> },
  ];

  if(isSuperAdmin || isAdmin){
    menuItems.splice(2, 0, { title: 'Admins', path: '/dashboard/admins', icon: <FaUser className="mr-3" /> })
    menuItems.splice(3, 0, { title: 'Moderators', path: '/dashboard/moderators', icon: <FaUser className="mr-3" /> })
  }

  if(isSuperAdmin){
    menuItems.push({ title: 'FB Messages', path: '/dashboard/facebook-messages', icon: <FaFacebook className="mr-3" /> })
    menuItems.push({ title: 'TG Messages', path: '/dashboard/telegram-messages', icon: <FaTelegram className="mr-3" /> })
    menuItems.push({ title: 'AI Training', path: '/dashboard/ai-training', icon: <FaBrain className="mr-3" /> })
  }
  

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white shadow-xl z-40 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        lg:w-64 lg:sticky lg:top-0 lg:z-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-200">
            <AppLogo size={36} nameClassName="text-lg font-bold text-red-600" />
            <p className="text-sm text-gray-500 mt-1">Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <span className={`
                      flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors
                      ${pathname === item.path ? 'bg-red-50 text-red-600 font-medium' : ''}
                    `}>
                      {item.icon}
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;