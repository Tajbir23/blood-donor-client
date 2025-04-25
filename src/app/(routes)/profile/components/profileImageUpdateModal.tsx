'use client'
import revalidateTags from "@/app/actions/revalidateTags"
import { updateProfileImage } from "@/app/actions/userAction"
import { UploadImage } from "@/app/libs"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaTimes, FaUpload } from "react-icons/fa"

const ProfileImageUpdateModal = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const queryClient = useQueryClient()

    const handleImageSelect = (file: File) => {
        setImage(file)
    }

    const handleImageUpload = async () => {
        if (!image) {
            toast.error("প্রথমে একটি ছবি নির্বাচন করুন")
            return
        }
        
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('profileImage', image)
            const response = await updateProfileImage(formData)
            queryClient.invalidateQueries({ queryKey: ['user'] })
            await revalidateTags('user')
            if(response.success){
                toast.success(response.message || "প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে")
                onClose()
            } else {
                toast.error(response.message || "ছবি আপলোড করতে সমস্যা হয়েছে")
            }
        } catch (error) {
            console.log(error)
            toast.error("একটি ত্রুটি ঘটেছে, আবার চেষ্টা করুন")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">প্রোফাইল ছবি আপডেট করুন</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <FaTimes />
                    </button>
                </div>
                
                <div className="p-6">
                    <UploadImage 
                        onImageSelect={handleImageSelect}
                        height="200px"
                        width="200px"
                        rounded={true}
                        label="প্রোফাইল ছবি নির্বাচন করুন"
                        className="mx-auto"
                    />
                    
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        >
                            বাতিল
                        </button>
                        <button
                            onClick={handleImageUpload}
                            disabled={isLoading || !image}
                            className={`px-4 py-2 rounded-md text-sm font-medium text-white flex items-center ${
                                isLoading || !image 
                                ? 'bg-red-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    প্রক্রিয়া চলছে...
                                </>
                            ) : (
                                <>
                                    <FaUpload className="mr-2" />
                                    আপলোড করুন
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileImageUpdateModal