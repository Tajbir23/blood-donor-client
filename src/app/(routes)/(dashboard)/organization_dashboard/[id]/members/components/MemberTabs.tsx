'use client'

import { useState } from 'react'
import { FaUserCheck, FaUserClock, FaUserSlash } from 'react-icons/fa'
import ActiveMembers from './ActiveMembers'
import PendingMembers from './PendingMembers'
import BannedMembers from './BannedMembers'



const MemberTabs = () => {
  const [activeTab, setActiveTab] = useState('active')

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center px-4 py-3 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'active'
              ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
              : 'text-gray-600 hover:text-red-500 hover:bg-red-50/30'
          }`}
        >
          <FaUserCheck className="mr-2" />
          সক্রিয় সদস্য
        </button>
        
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center px-4 py-3 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'pending'
              ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
              : 'text-gray-600 hover:text-amber-500 hover:bg-amber-50/30'
          }`}
        >
          <FaUserClock className="mr-2" />
          অপেক্ষমান সদস্য
        </button>
        
        <button
          onClick={() => setActiveTab('banned')}
          className={`flex items-center px-4 py-3 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'banned'
              ? 'text-gray-800 border-b-2 border-gray-800 bg-gray-100'
              : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <FaUserSlash className="mr-2" />
          নিষিদ্ধ সদস্য
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'active' && <ActiveMembers />}
        {activeTab === 'pending' && <PendingMembers />}
        {activeTab === 'banned' && <BannedMembers />}
      </div>
    </div>
  )
}

export default MemberTabs