import { FingerprintData } from "./fingerprint";

export interface User {
    _id?: string;
    email: string;
    emailVerified?: boolean;
    fullName: string;
    password: string;
    role?: string;
    organizationId?: string;
    confirmPassword: string;
    phone: string;
    birthDate: string;
    bloodGroup: string;
    gender: string;
    lastDonationDate: string;
    canDonate: boolean;
    totalDonationCount?: number;
    nextDonationDate?: string;
    badges?: string[];
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
    createdAt?: string;
    updatedAt?: string;
}
