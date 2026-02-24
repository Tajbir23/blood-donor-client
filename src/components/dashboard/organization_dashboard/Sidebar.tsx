"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaBlog, FaCog, FaFlag, FaHome, FaTint, FaUsers } from "react-icons/fa";


const Sidebar = () => {
    const params = useParams();
    const pathname = usePathname();
    
    const organizationId = params.id; // Extract organization ID from URL
    const navItems = [
        { name: 'ড্যাশবোর্ড', href: `/organization_dashboard/${organizationId}`, icon: FaHome },
        { name: 'সদস্যবৃন্দ', href: `/organization_dashboard/${organizationId}/members`, icon: FaUsers },
        { name: 'রক্তদান', href: `/organization_dashboard/${organizationId}/donations`, icon: FaTint },
        { name: 'ব্লগ', href: `/organization_dashboard/${organizationId}/blog`, icon: FaBlog },
        { name: 'রিপোর্টস', href: `/organization_dashboard/${organizationId}/reports`, icon: FaFlag },
        { name: 'সেটিংস', href: `/organization_dashboard/${organizationId}/settings`, icon: FaCog },
      ];
  return (
    <>
          <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">প্রতিষ্ঠান ড্যাশবোর্ড</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm ${
                      isActive
                        ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`mr-3 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 ${
                  isActive ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <item.icon className={`text-lg ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar