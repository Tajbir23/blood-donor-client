"use client"

import organizationType from "@/lib/types/organizationType"
import { User } from "@/lib/types/userType"
import { myOrganizations } from "@/app/actions/organization"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface organizationDataType {
    organizations: organizationType[]
}
const useRole = (userId: string) => {
    const pathname = usePathname()
    const organizationId = pathname.split("/")[2]
    
    const { data } = useQuery({
        queryKey: ['organizations'],
        queryFn: myOrganizations
    })
    
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const determineUserRole = () => {
            if (!data?.organizations || data.organizations.length === 0) return;
            
            const currentOrg = data.organizations.find((org: organizationType) => org._id === organizationId)
            if (!currentOrg) return;
            
            if (currentOrg.owner?._id === userId) {
                setUserRole("owner");
                return;
            }
            
            if (currentOrg.superAdmins?.find((superAdmin: User) => superAdmin._id === userId)) {
                setUserRole("superAdmin");
                return;
            }
            
            if (currentOrg.admins?.find((admin: User) => admin._id === userId)) {
                setUserRole("admin");
                return;
            }
            
            if (currentOrg.moderators?.find((moderator: User) => moderator._id === userId)) {
                setUserRole("moderator");
                return;
            }
        }
        
        // Execute immediately if data is available
        if (data) {
            determineUserRole();
        }
    }, [data, organizationId, userId])
    
    return {
        userRole
    }
}

export default useRole