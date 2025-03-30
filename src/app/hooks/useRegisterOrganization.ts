"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import registerOrganization from "../actions/organization"

const useRegisterOrganization = () => {
    const queryClient = useQueryClient()
    const router = useRouter();
    return useMutation({
        mutationKey: ['registerOrganization', 'organization'],
        mutationFn: registerOrganization,
        onSuccess: (data) => {
            if(data.success){
                queryClient.invalidateQueries({ queryKey: ['organization'] });
                toast.success('প্রতিষ্ঠান সফলভাবে নিবন্ধন করা হয়েছে');
                
                // Use a timeout to ensure router is mounted before navigation
                setTimeout(() => {
                    router.push('/profile');
                }, 300);
            }else{
                toast.error("সমস্যা হয়েছে")
                console.log(data)
            }
        },
        onError: (error) => {
            toast.error( 'প্রতিষ্ঠান নিবন্ধন করতে সমস্যা হয়েছে');
            console.log(error)
        }
    })
}

export default useRegisterOrganization