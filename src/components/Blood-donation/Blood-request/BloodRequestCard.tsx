const BloodRequestCard = () => {
  // ডামি ডাটা
  const dummyRequest = {
    bloodGroup: "A+",
    bloodUnits: "2",
    requiredDate: new Date().toISOString(),
    urgencyLevel: "urgent",
    patientName: "ফারহানা আক্তার",
    patientProblem: "অ্যাপেন্ডিসাইটিস অপারেশন",
    patientAge: "32",
    patientGender: "female",
    hospitalName: "কুড়িগ্রাম জেনারেল হাসপাতাল",
    hospitalWard: "সার্জারি ওয়ার্ড, কেবিন ১০১",
    thanaName: "কুড়িগ্রাম সদর",
    districtName: "কুড়িগ্রাম",
    name: "আনিসুর রহমান",
    relation: "স্বামী",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 ঘণ্টা আগে
    additionalInfo: "সকাল ১১টায় অপারেশন। রক্তদাতা যেন অপারেশনের ৩০ মিনিট আগে পৌঁছান।"
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow max-w-md">
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
                <p className="text-sm text-gray-600">ওয়ার্ড/কেবিন: {dummyRequest.hospitalWard}</p>
              )}
              <p className="text-sm text-gray-600">{dummyRequest.thanaName}, {dummyRequest.districtName}</p>
            </div>
          </div>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div className="flex justify-between items-end">
          <div>
            <p className="font-medium">{dummyRequest.name}</p>
            {dummyRequest.relation && (
              <p className="text-sm text-gray-600">রোগীর {dummyRequest.relation}</p>
            )}
            <p className="text-sm text-gray-500">১ ঘন্টা আগে পোস্ট করা হয়েছে</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg border border-blue-200 font-medium text-sm transition-colors"
            >
              যোগাযোগ
            </button>
            <button 
              className="px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium text-sm transition-colors"
            >
              সাহায্য করুন
            </button>
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
