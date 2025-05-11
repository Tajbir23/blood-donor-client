'use client'

import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllUsers } from '@/app/actions/administrator/system/dashboardAction'
import { User } from '@/lib/types/userType'
import RoleChange from '../components/RoleChange'
import LoadingSkelaton from '../components/LoadingSkelaton'
import UserTable from '../components/UserTable'
import SearchUsers from '../components/SearchUsers'
import ManageUser from '../components/ManageUser'

type UserTab = 'active' | 'inactive' | 'banned' | 'all'
type TabType = 'isActive' | 'isBanned' | 'isVerified'

interface UserTabState {
  tab: UserTab;
  tabType: TabType;
}

interface UserQueryData {
  user: User
}

const UsersPage = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 5
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<UserTabState>({tab: 'active', tabType: 'isActive'})
  const [selectedUser, setSelectedUser] = useState<{ userId: string, fullName: string, role: string, currentRole: string } | null>(null)
  const [selectedAction, setSelectedAction] = useState<{ userId: string, fullName: string, isOpen: boolean, action: 'block' | 'unblock' | 'delete' | 'verify' } | null>(null)

  const user = useMemo(() => {
    return queryClient.getQueryData<UserQueryData>(["user"])
  },[queryClient])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-users', page, limit, currentTab],
    queryFn: () => {
      // Set proper boolean values based on tab
      let isActive = true;
      let isBanned = false;
      let allUser = true;
      // Set default values
      if (currentTab.tab === 'active' && currentTab.tabType === 'isActive') {
        isActive = true;
        allUser = false;
      } else if (currentTab.tab === 'inactive' && currentTab.tabType === 'isActive') {
        isActive = false;
        allUser = false;
      } else if (currentTab.tab === 'banned' && currentTab.tabType === 'isBanned') {
        isBanned = true;
        allUser = false;
      } else if (currentTab.tab === 'all') {
        allUser = true;
      }
      
      return getAllUsers({ search, page, limit, isActive, isBanned, allUser });
    },
    staleTime: 1000 * 60 * 5,
  })

  const handleAction = async (userId: string, action: 'block' | 'unblock' | 'delete' | 'verify', fullName: string) => {
    // Implement action handlers here
    console.log(`Action ${action} for user ${userId}`)
    setSelectedAction({
      userId: userId,
      fullName: fullName,
      isOpen: true,
      action: action
    })
    // After successful action, refetch the data
    refetch()
    setActiveDropdown(null)
  }

  const handleRoleChange = async (userId: string, newRole: string, fullName: string, currentRole: string) => {
    // Set the selected user data to show the RoleChange modal
    setSelectedUser({
      userId: userId,
      fullName: fullName,
      role: newRole,
      currentRole: currentRole
    })
    
    // Log for debugging
    console.log(`Showing role change modal for user ${userId} to ${newRole}`)
  }

  // Function to close the role change modal
  const closeRoleChangeModal = () => {
    setSelectedUser(null)
    refetch()
  }

  const toggleDropdown = (userId: string) => {
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (activeDropdown) {
      setActiveDropdown(null)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page on new search
  }

  const handleSearchSubmit = () => {
    refetch()
  }

  const handleTabChange = (tab: UserTab, tabType: TabType) => {
    setCurrentTab({tab, tabType})
    setPage(1) // Reset to first page on tab change
  }

  const userRole = user?.user?.role || ''

  let isAccessActions = false
  if(userRole === "superAdmin" || userRole === "admin"){
    isAccessActions = true
  }
  const roleOptions = {
    superAdmin: ["user", "superAdmin", "admin", "moderator"],
    admin: ["user", "moderator"],
  }

  if(isLoading){
    return (
      <LoadingSkelaton />
    )
  }
  
  return (
    <div className="mx-auto px-4 py-8" onClick={handleClickOutside}>
      {/* Show RoleChange component when a user is selected */}
      {selectedUser && (
        <RoleChange
          userId={selectedUser.userId}
          fullName={selectedUser.fullName}
          newRole={selectedUser.role}
          currentRole={selectedUser.currentRole}
          onClose={closeRoleChangeModal}
          refetch={refetch}
        />
      )}
      {selectedAction && (
        <ManageUser
          userId={selectedAction.userId}
          fullName={selectedAction.fullName}
          action={selectedAction.action}
          isOpen={selectedAction.isOpen}
          refetch={refetch}
          setIsOpen={(isOpen) => setSelectedAction({...selectedAction, isOpen})}
          queryKey={'dashboard-users'}
        />
      )}
      

      <SearchUsers search={search} handleSearch={handleSearch} handleSearchSubmit={handleSearchSubmit} />
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          <button
            className={`inline-block py-3 px-4 text-sm font-medium ${
              currentTab.tab === 'active'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            }`}
            onClick={() => handleTabChange('active', 'isActive')}
          >
            সক্রিয় ব্যবহারকারী
          </button>
          
          <button
            className={`inline-block py-3 px-4 text-sm font-medium ${
              currentTab.tab === 'inactive'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            }`}
            onClick={() => handleTabChange('inactive', 'isActive')}
          >
            অপেক্ষমাণ ব্যবহারকারী
          </button>
          
          <button
            className={`inline-block py-3 px-4 text-sm font-medium ${
              currentTab.tab === 'banned'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            }`}
            onClick={() => handleTabChange('banned', 'isBanned')}
          >
            নিষিদ্ধ ব্যবহারকারী
          </button>
          
          <button
            className={`inline-block py-3 px-4 text-sm font-medium ${
              currentTab.tab === 'all'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
            }`}
            onClick={() => handleTabChange('all', 'isActive')}
          >
            সকল ব্যবহারকারী
          </button>
        </div>
      </div>
      
      <UserTable data={data} handleRoleChange={handleRoleChange} handleAction={handleAction} toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setPage={setPage} page={page} userRole={userRole} roleOptions={roleOptions} isAccessActions={isAccessActions} />
    </div>
  )
}

export default UsersPage