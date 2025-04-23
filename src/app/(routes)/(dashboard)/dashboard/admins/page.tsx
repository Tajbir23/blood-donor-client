"use client"

import { getAllAdmins } from "@/app/actions/administrator/system/dashboardAction"
import { User } from "@/lib/types/userType"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import LoadingSkelaton from "../components/LoadingSkelaton"
import UserTable from "../components/UserTable"
import RoleChange from "../components/RoleChange"
import SearchUsers from "../components/SearchUsers"


interface UserQueryData {
    user: User
  }
const AdminsPage = () => {
    const queryClient = useQueryClient()
    const [selectedUser, setSelectedUser] = useState<{ userId: string, fullName: string, role: string, currentRole: string } | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const limit = 5
    const user = useMemo(() => {
        return queryClient.getQueryData<UserQueryData>(["user"])
      },[queryClient])
    
    
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['dashboard-admins', page, limit],
        queryFn: () => {
            return getAllAdmins({ search, page, limit });
        },
        staleTime: 1000 * 60 * 5,
    })
    const userRole = user?.user?.role || ''

    
    let isAccessActions = false
    if(userRole === "superAdmin"){
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
        setPage(1) // Reset to first page on new search
      }
    
      const handleSearchSubmit = () => {
        refetch()
      }

    const handleAction = async (userId: string, action: 'block' | 'unblock' | 'delete') => {
        console.log(`Action ${action} for user ${userId}`)
        refetch()
        setActiveDropdown(null)
    }
    
    const toggleDropdown = (userId: string) => {
        setActiveDropdown(activeDropdown === userId ? null : userId)
    }

    const roleOptions = {
        'superAdmin': ['user','superAdmin', 'admin', 'moderator'],
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
        <SearchUsers search={search} handleSearch={handleSearch} handleSearchSubmit={handleSearchSubmit} />
        <UserTable data={data || { users: [], totalPages: 0, totalUsers: 0 }} handleRoleChange={handleRoleChange} handleAction={handleAction} toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} setPage={setPage} page={page} userRole={userRole} roleOptions={roleOptions} isAccessActions={isAccessActions} />

    </div>
   )
}

export default AdminsPage