import { FingerprintData } from "./fingerprint";

export interface User {
    _id?: string;
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    phone: string;
    birthDate: string;
    bloodGroup: string;
    gender: string;
    lastDonationDate: string;
    canDonate: boolean;
    nextDonationDate?: string;
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
