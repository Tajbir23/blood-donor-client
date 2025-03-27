'use client'
import { useMutation } from '@tanstack/react-query'
import { registerAsUser } from '../actions/authentication'
import toast from 'react-hot-toast';

const useRegisterAsUser = () => {
  return useMutation({
    mutationKey: ['registerUser', 'user'],
    mutationFn: registerAsUser,
    onSuccess: (data) => {
        if (data?.success) {
            toast.success('আপনার নিবন্ধন সফল হয়েছে');
          } else {
            toast.error(data?.message);
          }
    },
    onError: (error) => {
        toast.error('কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
        console.error(error);
    }
  })
}

export default useRegisterAsUser
