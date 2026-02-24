import organizationType from '@/lib/types/organizationType'

export interface Donation {
  _id?: string;
  userId?: string;
  donationDate: string;
  recipient?: string;
  recipientName?: string;
  createdAt?: string;
}

export interface DonationPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserOrganization {
  organization: organizationType;
  role: string;  // e.g., "Owner", "Member", "Admin"
  joinedAt: string;
} 