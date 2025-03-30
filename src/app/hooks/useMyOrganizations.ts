'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { myOrganizations } from "../actions/organization"

const useMyOrganizations = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["my_organizations", "organizations", "organization"],
        mutationFn: myOrganizations,
        onSuccess: (data) => {
            if(data.success){
                queryClient.setQueryData(["organizations"], data)
            }
        }
    })
}
export default useMyOrganizations