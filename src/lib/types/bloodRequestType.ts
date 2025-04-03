interface BloodRequestType {
    _id?: string;
    name: string;
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
    hospitalId: string;
    hospitalName: string;
    hospitalWard: string;
    patientAge: string;
    patientGender: string;
    additionalInfo: string;
    latitude?: string;
    longitude?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default BloodRequestType;
