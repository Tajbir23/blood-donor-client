import organizationType from "@/lib/types/organizationType"
import { FaBuilding, FaEnvelope, FaCalendarAlt, FaInfoCircle, FaCheck, FaBan, FaExclamationTriangle, FaTrash, FaPhone, FaMapMarkerAlt, FaUsers, FaHandshake } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"
import { updateOrganizationStatus } from "@/app/actions/administrator/system/organization";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface OrganizationCardProps {
  organization: organizationType;
  userRole?: string;
  orgStatus: string;
  onActionSuccess?: () => void;
}

const OrganizationCard = ({ organization, userRole, orgStatus, onActionSuccess }: OrganizationCardProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const isAdmin = userRole === 'admin' || userRole === 'superAdmin';
  const queryClient = useQueryClient();

  const getStatusColor = () => {
    switch (orgStatus) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ban': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAction = async (actionType: string) => {
    setIsLoading(actionType);
    try {
      if (organization._id) {
        const response = await updateOrganizationStatus(organization._id, actionType)
        if(response?.success) {
          toast.success(`${organization.organizationName} ${actionType} successfully!`);
          // Invalidate and refetch admin_organizations query
          queryClient.invalidateQueries({ queryKey: ['admin_organizations'] });
          // Call the callback if provided
          if (onActionSuccess) {
            onActionSuccess();
          }
        } else {
          toast.error(`Error performing ${actionType} action`);
        }
      } else {
        toast.error("Organization ID is undefined");
      }
    } catch (error) {
      console.error(`Error performing ${actionType} action:`, error);
      toast.error(`Error performing ${actionType} action`);
    } finally {
      setIsLoading(null);
    }
  };

  const getActionButton = (actionType: string) => {
    const config = {
      active: {
        label: 'Approve',
        icon: <FaCheck className="mr-2" />,
        bgColor: 'bg-green-50 hover:bg-green-100',
        textColor: 'text-green-700',
        show: orgStatus === 'pending'
      },
      ban: {
        label: 'Ban',
        icon: <FaBan className="mr-2" />,
        bgColor: 'bg-red-50 hover:bg-red-100',
        textColor: 'text-red-700',
        show: orgStatus === 'active' || orgStatus === 'pending'
      },
      unban: {
        label: 'Unban',
        icon: <FaCheck className="mr-2" />,
        bgColor: 'bg-green-50 hover:bg-green-100',
        textColor: 'text-green-700',
        show: orgStatus === 'ban'
      },
      delete: {
        label: 'Delete',
        icon: <FaTrash className="mr-2" />,
        bgColor: 'bg-red-50 hover:bg-red-100',
        textColor: 'text-red-700',
        show: true
      },
    };

    const action = config[actionType as keyof typeof config];
    
    if (!action || !action.show) return null;
    
    return (
      <button 
        onClick={() => handleAction(actionType)}
        disabled={isLoading !== null}
        className={`py-2 px-3 ${action.bgColor} ${action.textColor} font-medium rounded-md transition-colors flex items-center justify-center
          ${isLoading === actionType ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading === actionType ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : action.icon}
        {action.label}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {/* Status Indicator */}
      <div className={`absolute top-0 right-0 w-3 h-3 rounded-full m-3 ${
        orgStatus === 'active' ? 'bg-green-500' : 
        orgStatus === 'pending' ? 'bg-orange-500' :
        'bg-red-500'
      }`}></div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Organization Logo and Name */}
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-4 shadow-sm">
            <FaBuilding className="text-blue-500 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{organization.organizationName}</h3>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor()}`}>
              {orgStatus.charAt(0).toUpperCase() + orgStatus.slice(1)}
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-2 bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaEnvelope className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="truncate">{organization.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaPhone className="text-gray-400 mr-3 flex-shrink-0" />
            <span>{organization.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="truncate">{organization.address || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="text-gray-400 mr-3 flex-shrink-0" />
            <span>Created: {organization.createdAt ? new Date(organization.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center text-blue-600 mb-1">
              <FaUsers className="mr-2" />
              <span className="text-sm font-medium">Members</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{organization.membersCount || 0}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center text-purple-600 mb-1">
              <FaHandshake className="mr-2" />
              <span className="text-sm font-medium">Campaigns</span>
            </div>
            <div className="text-2xl font-bold text-purple-700">{organization.campaignsCount || 0}</div>
          </div>
        </div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {getActionButton('active')}
            {getActionButton('ban')}
            {getActionButton('unban')}
            {getActionButton('delete')}
          </div>
        )}

        {/* Details Button */}
        <Link href={`/dashboard/organizations/${organization._id}`} className="block">
          <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
            <FaInfoCircle className="mr-2" />
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default OrganizationCard