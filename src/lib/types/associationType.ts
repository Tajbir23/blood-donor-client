interface associationType {
    _id: string;
    // প্রতিষ্ঠান সম্পর্কিত তথ্য
    organizationName: string;
    organizationType: string;
    establishmentYear: string;
    registrationNumber: string;
    website: string;
    description: string;

    // যোগাযোগের তথ্য
    email: string;
    phone: string;

    // ঠিকানার তথ্য
    districtId: string;
    thanaId: string;
    address: string;

    // প্রতিনিধির তথ্য
    representativeName: string;
    representativePosition: string;
    representativePhone: string;
    representativeEmail: string;

    // সেবা সম্পর্কিত তথ্য
    hasBloodBank: boolean;
    providesEmergencyBlood: boolean;
    availableBloodGroups: string[];

    // লোগো/ছবি
    logoImage: File | null;
    logoImageUrl: string;

    // অ্যাকাউন্ট নিরাপত্তা
    password: string;
    confirmPassword: string;

    // শর্তাবলী
    agreedToTerms: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default associationType;
