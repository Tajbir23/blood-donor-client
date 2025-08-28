'use client'

import { getAllModerators } from "@/app/actions/administrator/system/dashboardAction"
import { User } from "@/lib/types/userType"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import LoadingSkelaton from "../components/LoadingSkelaton"
import RoleChange from "../components/RoleChange"
import ManageUser from "../components/ManageUser"
import SearchUsers from "../components/SearchUsers"
import UserTable from "../components/UserTable"

interface UserQueryData {
  user: User
}

const ModeratorsPage = () => {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<{ userId: string, fullName: string, role: string, currentRole: string } | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAction, setSelectedAction] = useState<{ userId: string, fullName: string, action: 'block' | 'unblock' | 'delete' | 'verify' } | null>(null)

  const limit = 5
  const user = useMemo(() => {
      return queryClient.getQueryData<UserQueryData>(["user"])
    },[queryClient])

  const { data, isLoading, refetch } = useQuery({
      queryKey: ['dashboard-moderators', currentPage, limit],
      queryFn: () => {
          return getAllModerators({ search, page: currentPage, limit });
      },
      staleTime: 1000 * 60 * 5,
  })

  const userRole = user?.user?.role || ''

  let isAccessActions = false
  if(userRole === "superAdmin" || userRole === "admin"){
      isAccessActions = true
  }

  const handleRoleChange = async (userId: string, newRole: string, fullName: string, currentRole: string) => {
      setSelectedUser({
          userId: userId,
          fullName: fullName,
          role: newRole,
          currentRole: currentRole
      })
  }

  const closeRoleChangeModal = () => {
      setSelectedUser(null)
  }

  const handleClickOutside = () => {
      if (activeDropdown) {
        setActiveDropdown(null)
      }
    }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setCurrentPage(1) // Reset to first page on new search
    }
  
  const handleSearchSubmit = () => {
      refetch()
    }

  const handleAction = async (userId: string, action: 'block' | 'unblock' | 'delete' | 'verify', fullName: string) => {
      console.log(`Action ${action} for user ${userId}`)
      setSelectedAction({
          userId: userId,
          fullName: fullName,
          action: action
      })
      
      setActiveDropdown(null)
  }
  
  const toggleDropdown = (userId: string) => {
      setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  const roleOptions = {
      'superAdmin': ['user','superAdmin', 'admin', 'moderator'],
      'admin': ['user', 'moderator'],
  }
  

  if(isLoading){
      return <LoadingSkelaton />
  }
  
  return (
    <div className="mx-auto px-4 py-8" onClick={handleClickOutside}>
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
          refetch={refetch}
          queryKey={'dashboard-moderators'}
          isOpen={true}
          setIsOpen={() => setSelectedAction(null)}
        />
      )}
        <SearchUsers search={search} handleSearch={handleSearch} handleSearchSubmit={handleSearchSubmit} />
        <UserTable 
          data={data || { users: [], totalPages: 0, totalUsers: 0 }} 
          handleRoleChange={handleRoleChange} 
          handleAction={handleAction} 
          toggleDropdown={toggleDropdown} 
          activeDropdown={activeDropdown} 
          setActiveDropdown={setActiveDropdown} 
          setPage={setCurrentPage} 
          page={currentPage} 
          userRole={userRole} 
          roleOptions={roleOptions} 
          isAccessActions={isAccessActions} 
        />
    </div>
  )
}

export default ModeratorsPage