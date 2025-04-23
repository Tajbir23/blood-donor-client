'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { manageUser } from '@/app/actions/administrator/system/userActions';
import { useQueryClient } from '@tanstack/react-query';

interface ManageUserProps {
  userId: string;
  fullName: string;
  action: 'block' | 'unblock' | 'delete';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
  queryKey: string;
}

const ManageUser = ({ userId, fullName, action, isOpen, setIsOpen, refetch, queryKey }: ManageUserProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const getActionText = () => {
    switch (action) {
      case 'block': return 'ব্লক';
      case 'unblock': return 'আনব্লক';
      case 'delete': return 'মুছে ফেলা';
      default: return action;
    }
  };

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      const response = await manageUser(userId, action);
      if(response.success){
        toast.success(`${fullName} ${getActionText()} করা হয়েছে`);
        setIsOpen(false);
        refetch();
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      console.error(`Error ${action} user:`, error);
      toast.error(`একটি ত্রুটি ঘটেছে`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">ব্যবহারকারী পরিচালনা</h1>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="ml-2">
              <p className="text-gray-800 font-medium mb-1">{fullName}</p>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                {getActionText()}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            আপনি কি নিশ্চিত যে আপনি {fullName} কে {getActionText()} করতে চান?
          </p>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              বাতিল
            </button>
            <button 
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'প্রক্রিয়াধীন...' : 'নিশ্চিত করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;