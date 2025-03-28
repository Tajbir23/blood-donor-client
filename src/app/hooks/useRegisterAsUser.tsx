
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerAsUser } from '../actions/authentication'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const useRegisterAsUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['registerUser', 'user'],
    mutationFn: registerAsUser,
    onSuccess: (data) => {
        if (data?.success) {
            toast.success(data?.message);
            queryClient.setQueryData(['user'], data.user)
            router.push(`/verify-email?email=${encodeURIComponent(data.email)}&otpType=register`)
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
