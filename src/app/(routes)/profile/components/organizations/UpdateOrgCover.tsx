import { updateOrgCover } from "@/app/actions/administrator/organization/manageOrg";
import revalidateTags from "@/app/actions/revalidateTags";
import { UploadImage } from "@/app/libs";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaUpload } from "react-icons/fa";

const UpdateOrgCover = ({orgId, setIsOpenModal, refetchMyOrganizations}: {orgId: string, setIsOpenModal: (isOpen: {isOpen: boolean, orgId: string}) => void, refetchMyOrganizations: () => void}) => {
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    
    const handleImageSelect = (file: File, preview: string) => {
        setImage(file);
        setPreviewUrl(preview);
    };
    
    const handleUpdateOrgCover = async () => {
        if (!image) {
            toast.error("দয়া করে একটি ছবি নির্বাচন করুন");
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await updateOrgCover(orgId, image);
            if (response.success) {
                setIsOpenModal({isOpen: false, orgId: ''});
                toast.success(response.message || "প্রতিষ্ঠানের কভার আপডেট করা হয়েছে");
                revalidateTags('my_organizations')
                refetchMyOrganizations()
            } else {
                toast.error(response.message || "আপডেট করতে সমস্যা হয়েছে");
            }
        } catch (error) {
            console.log(error)
            toast.error("সার্ভারে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClose = () => {
        setIsOpenModal({isOpen: false, orgId: ''});
    };
    
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" onClick={handleClose}></div>
            
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
                    <div className="absolute top-3 right-3">
                        <button 
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        প্রতিষ্ঠানের কভার আপডেট করুন
                    </h3>
                    
                    <div className="mb-6">
                        <UploadImage 
                            onImageSelect={handleImageSelect}
                            initialImage={previewUrl}
                            height="200px"
                            label="প্রতিষ্ঠানের লোগো আপলোড করুন"
                            acceptedTypes="image/jpeg, image/png, image/jpg"
                            maxSizeMB={2}
                            className="border border-gray-300 rounded-lg"
                        />
                    </div>
                    
                    <div className="flex space-x-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                        >
                            বাতিল করুন
                        </button>
                        <button
                            onClick={handleUpdateOrgCover}
                            disabled={isLoading || !image}
                            className={`flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center ${
                                (isLoading || !image) ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            ) : (
                                <FaUpload className="mr-2" />
                            )}
                            আপডেট করুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrgCover;