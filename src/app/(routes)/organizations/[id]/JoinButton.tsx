'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { joinOrganization } from '@/app/actions/organization'
import { FaHandshake } from 'react-icons/fa'

interface JoinButtonProps {
    organizationId: string
}

export default function JoinButton({ organizationId }: JoinButtonProps) {
    const [joining, setJoining] = useState(false)

    const handleJoin = async () => {
        setJoining(true)
        try {
            const result = await joinOrganization(organizationId)
            if (result?.success) {
                toast.success(result.message || 'যোগদানের অনুরোধ সফলভাবে পাঠানো হয়েছে!')
            } else {
                toast.error(result?.message || 'অনুরোধ পাঠাতে ব্যর্থ হয়েছে')
            }
        } catch {
            toast.error('কিছু একটা সমস্যা হয়েছে')
        } finally {
            setJoining(false)
        }
    }

    return (
        <button
            onClick={handleJoin}
            disabled={joining}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
            <FaHandshake />
            {joining ? 'অনুরোধ পাঠানো হচ্ছে...' : 'যোগদানের অনুরোধ পাঠান'}
        </button>
    )
}
