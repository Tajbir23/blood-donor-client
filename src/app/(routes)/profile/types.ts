import organizationType from '@/lib/types/organizationType'

export interface Donation {
  date: string;
  location: string;
  recipient: string;
  bloodGroup: string;
}

export interface UserOrganization {
  organization: organizationType;
  role: string;  // e.g., "Owner", "Member", "Admin"
  joinedAt: string;
} 