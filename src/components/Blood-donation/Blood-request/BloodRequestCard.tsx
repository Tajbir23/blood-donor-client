import BloodRequestType from "@/lib/types/bloodRequestType"

const BloodRequestCard = ({request}: {request: BloodRequestType}) => {
  // ডামি ডাটা
  const dummyRequest = {
    bloodGroup: request.bloodGroup,
    bloodUnits: request.bloodUnits,
    requiredDate: request.requiredDate,
    mobile: request.mobile,
    alternativeContact: request.alternativeContact,
    urgencyLevel: request.urgencyLevel,
    patientName: request.patientName,
    patientProblem: request.patientProblem,
    patientAge: request.patientAge,
    patientGender: request.patientGender,
    hospitalName: request.hospitalName,
    hospitalWard: request.hospitalWard,
    contactPerson: request.contactPerson,
    contactNumber: request.contactNumber,
    thanaName: request.thanaId,
    districtName: request.districtId,
    name: request.name,
    relation: request.relation,
    createdAt: request.createdAt ? new Date(request.createdAt).toISOString() : new Date().toISOString(), // 1 ঘণ্টা আগে
    additionalInfo: request.additionalInfo
  };

  // জরুরিতার মাত্রা অনুযায়ি রঙ নির্ধারণ
  const getUrgencyColor = () => {
    switch (dummyRequest.urgencyLevel) {
      case 'emergency':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'urgent':
        return 'bg-orange-100 border-orange-500 text-orange-800';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  // জরুরিতার মাত্রা অনুযায়ি লেবেল
  const getUrgencyLabel = () => {
    switch (dummyRequest.urgencyLevel) {
      case 'emergency':
        return 'অতি জরুরি';
      case 'urgent':
        return 'জরুরি';
      default:
        return 'সাধারণ';
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      {/* হেডার সেকশন */}
      <div className={`px-4 py-2 border-l-4 flex justify-between items-center ${getUrgencyColor()}`}>
        <div className="flex items-center">
          <div className="mr-2 font-bold text-2xl">{dummyRequest.bloodGroup}</div>
          <div>
            <p className="font-medium">{dummyRequest.bloodUnits} ব্যাগ রক্তের প্রয়োজন</p>
            <p className="text-sm">প্রয়োজন: {new Date(dummyRequest.requiredDate).toLocaleString('bn-BD', {
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'long'
            })}</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-semibold">
          {getUrgencyLabel()}
        </span>
      </div>

      {/* মূল তথ্য */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{dummyRequest.patientName}</h3>
          <p className="text-gray-600">
            <span className="font-medium">সমস্যা:</span> {dummyRequest.patientProblem}
          </p>
          {dummyRequest.patientAge && dummyRequest.patientGender && (
            <p className="text-sm text-gray-500">
              {dummyRequest.patientAge} বছর, {dummyRequest.patientGender === 'male' ? 'পুরুষ' : dummyRequest.patientGender === 'female' ? 'মহিলা' : 'অন্যান্য'}
            </p>
          )}
        </div>

        {/* অবস্থান তথ্য */}
        <div className="mb-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-800">{dummyRequest.hospitalName}</p>
              {dummyRequest.hospitalWard && (
                <p className="text-sm text-gray-600">ওয়ার্ড/কেবিন/বেড: {dummyRequest.hospitalWard}</p>
              )}
              <p className="text-sm text-gray-600">{dummyRequest.thanaName}, {dummyRequest.districtName}</p>
            </div>
          </div>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div className="mb-3">
          <p className="font-medium text-gray-700">বিকল্প যোগাযোগ:</p>
          <div className="flex flex-col space-y-1 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">যোগাযোগ ব্যক্তি:</span> {dummyRequest.contactPerson}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">ফোন নম্বর:</span> {dummyRequest.contactNumber}
            </p>
          </div>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div className="flex justify-between items-end">
          <div>
            <p className="font-medium">{dummyRequest.name}</p>
            {dummyRequest.relation && (
              <p className="text-sm text-gray-600">রোগীর {dummyRequest.relation}</p>
            )}
            <p className="text-sm text-gray-600">ফোন: {dummyRequest.mobile}</p>
            <p className="text-sm text-gray-500">{new Date(dummyRequest.createdAt).toLocaleString('bn-BD', {
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'long'
            })}</p>
          </div>
          
          <div className="flex space-x-2">
            <a 
              href={`tel:${dummyRequest.contactNumber}`}
              className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg border border-green-200 font-medium text-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              কল করুন
            </a>
            
          </div>
        </div>
      </div>
      
      {/* অতিরিক্ত তথ্য (যদি থাকে) */}
      {dummyRequest.additionalInfo && (
        <div className="px-4 py-3 bg-gray-50 border-t text-sm">
          <p className="font-medium text-gray-700">অতিরিক্ত তথ্য:</p>
          <p className="text-gray-600">{dummyRequest.additionalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default BloodRequestCard;
