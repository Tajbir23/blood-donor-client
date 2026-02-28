"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser } from "../actions/authentication"
import toast from "react-hot-toast"

const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['loginUser', 'user'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      if(data?.success){
        toast.success("লগইন সম্পন্ন হয়েছে", {
          duration: 3000,
          position: 'top-right',
        })
        // Immediately set user data in cache so Navbar updates without waiting for cookie-based refetch
        queryClient.setQueryData(['user'], { success: true, user: data.user })
        // Also invalidate after a short delay to allow cookie to propagate, ensuring fresh data
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['user'] })
        }, 500)
      } else {
        toast.error(data?.message || "লগইন করতে ব্যর্থ হয়েছে", {
          duration: 4000,
          position: 'top-right',
        })
      }
    },
    onError: (error) => {
      console.error("Login error:", error)
      toast.error(error?.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।", {
        duration: 4000,
        position: 'top-right',
      })
    }
  })
}

export default useLoginUser
