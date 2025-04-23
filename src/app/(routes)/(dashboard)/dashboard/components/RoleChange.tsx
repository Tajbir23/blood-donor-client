'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { roleChangeUser } from '@/app/actions/administrator/system/userActions';
import { useQueryClient } from '@tanstack/react-query';

interface RoleChangeProps {
  userId: string
  fullName: string
  newRole: string
  currentRole: string
  onClose: () => void
  refetch: () => void
}

const RoleChange = ({ userId, fullName, newRole, currentRole, onClose, refetch }: RoleChangeProps) => {
  const queryClient = useQueryClient()
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleClose = () => {
    // Use window.history to navigate back if needed
    onClose();
  }
  
  const handleRoleChange = async () => {
    
    
    try {
      setIsSubmitting(true);
      // Call the API to change the role
      const response = await roleChangeUser(userId, newRole);
      
      if (response.success) {
        toast.success('Role updated successfully');
        // Reload the page to reflect changes
        queryClient.invalidateQueries({ queryKey: ['dashboard-admins'] })
        queryClient.invalidateQueries({ queryKey: ['dashboard-users'] })
        refetch()
        onClose()
      } else {
        toast.error(response.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('An error occurred while updating the role');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Role Change Confirmation</h1>
            <button 
              onClick={handleClose} 
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
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">{currentRole}</span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{newRole}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীর রোল পরিবর্তন করতে চান?</p>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              বাতিল করুন
            </button>
            <button 
              onClick={handleRoleChange}
              disabled={isSubmitting}
              className={`px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'অপেক্ষা করুন...' : 'রোল আপডেট করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleChange