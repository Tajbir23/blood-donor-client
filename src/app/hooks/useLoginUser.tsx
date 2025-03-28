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
        toast.success("লগইন সম্পন্ন হয়েছে")
        queryClient.setQueryData(['user'], data.user)
      } else {
        toast.error(data?.message)
      }
    },
    onError: (error)=> {
      toast.error("কিছু ভুল হয়েছে । আবার চেষ্টা করুন ।")
      console.log(error)
    }
  })
}

export default useLoginUser
