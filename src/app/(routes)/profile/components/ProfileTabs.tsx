interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto overflow-y-hidden">
      <nav className="-mb-px flex space-x-8 min-w-full pb-1">
        <button
          className={`${
            activeTab === 'overview'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0`}
          onClick={() => setActiveTab('overview')}
        >
          পরিচিতি
        </button>
        <button
          className={`${
            activeTab === 'donations'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0`}
          onClick={() => setActiveTab('donations')}
        >
          রক্তদানের ইতিহাস
        </button>
        <button
          className={`${
            activeTab === 'organizations'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0`}
          onClick={() => setActiveTab('organizations')}
        >
          প্রতিষ্ঠানসমূহ
        </button>
        <button
          className={`${
            activeTab === 'settings'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-shrink-0`}
          onClick={() => setActiveTab('settings')}
        >
          সেটিংস
        </button>
      </nav>
    </div>
  )
}

export default ProfileTabs 