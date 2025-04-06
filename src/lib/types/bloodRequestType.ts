interface BloodRequestType {
    _id?: string;
    name: string;
    email: string;
    patientName: string;
    patientProblem: string;
    mobile: string;
    alternativeContact: string;
    relation: string;
    bloodGroup: string;
    bloodUnits: string;
    urgencyLevel: 'normal' | 'urgent' | 'emergency';
    requiredDate: string;
    requiredTime: string;
    reason: string;
    contactPerson: string;
    contactNumber: string;
    divisionId: string;
    districtId: string;
    thanaId: string;
    seekerDivisionId: string;
    seekerDistrictId: string;
    seekerThanaId: string;
    seekerBloodGroup: string;
    hospitalId: string;
    hospitalName: string;
    hospitalWard: string;
    patientAge: string;
    patientGender: string;
    additionalInfo: string;
    latitude?: string;
    longitude?: string;
    seekerLatitude?: string;
    seekerLongitude?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default BloodRequestType;
