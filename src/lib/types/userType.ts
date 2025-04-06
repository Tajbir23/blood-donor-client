import { FingerprintData } from "./fingerprint";
import organizationType from "./organizationType";

export interface User {
    _id?: string;
    email: string;
    emailVerified?: boolean;
    fullName: string;
    password?: string;
    role?: string;
    organizationId?: organizationType[];
    confirmPassword?: string;
    phone: string;
    birthDate: string;
    bloodGroup: string;
    gender: string;
    lastDonationDate: string;
    canDonate: boolean;
    totalDonationCount?: number;
    nextDonationDate?: string;
    badges?: string[];
    divisionId?: string;
    districtId: string;
    thanaId: string;
    address: string;
    profileImage: File | null;
    profileImageUrl?: string;
    latitude: number;
    longitude: number;
    agreedToTerms: boolean;
    fingerprint?: FingerprintData;
    isActive?: boolean;
    isVerified?: boolean;
    reportCount?: number;
    distance?: Number;
    distanceKm?: string;
    createdAt?: string;
    updatedAt?: string;
}
