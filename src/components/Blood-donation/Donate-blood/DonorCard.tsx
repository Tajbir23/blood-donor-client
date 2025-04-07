import Image from 'next/image'
import { User } from '@/lib/types/userType'
import { Phone, MapPin, Droplet, Award } from 'lucide-react'

const DonorCard = ({donor}: {donor: User}) => {
  // Access with type safety for optional properties
  const lastDonated = 'lastDonated' in donor ? donor.lastDonated as string : null;
  const donationCount = 'donationCount' in donor ? donor.donationCount as number : null;
  
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white border border-gray-100 transition-all duration-300 flex flex-col relative group">
      {/* Blood Group Badge */}
      <div className="absolute top-4 right-4 z-10 bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow-lg">
        {donor.bloodGroup}
      </div>
      
      {/* Report Count Badge - if exists */}
      {donor.reportCount && donor.reportCount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-white font-bold py-1 px-3 rounded-full shadow-lg flex items-center">
          <span className="mr-1">⚠️</span> {donor.reportCount}
        </div>
      )}
      
      {/* Image with gradient overlay */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
        <Image 
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700" 
          src={`${process.env.NEXT_PUBLIC_API_URL}${donor.profileImageUrl}` || "/images/dummy-image.jpg"} 
          alt={donor.fullName || "Donor Image"} 
          width={400} 
          height={300} 
        />
        <div className="absolute bottom-4 left-4 z-10">
          <h2 className="font-bold text-xl text-white drop-shadow-md">{donor.fullName}</h2>
        </div>
      </div>
      
      {/* Details section */}
      <div className="p-5 space-y-4 flex-grow">
        {/* Address */}
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{donor.address || "Not specified"}</p>
        </div>
        
        {/* Phone */}
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{donor.phone || "Not available"}</p>
        </div>
        
        {/* Blood donation info */}
        <div className="flex items-center space-x-2">
          <Droplet className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-gray-700 text-sm">
            {lastDonated ? `Last donated: ${lastDonated}` : "Ready to donate"}
          </p>
        </div>
        
        {/* Additional info - only shown if donation count exists */}
        {donationCount && (
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <p className="text-gray-700 text-sm">Donated {donationCount} times</p>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="px-5 pb-5 pt-2 space-y-2">
        <a 
          href={`tel:${donor.phone}`} 
          className="w-full text-center inline-block bg-gradient-to-r from-red-600 to-red-500 text-white font-medium py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
        >
          কল করুন
        </a>
        
        <button 
          className="w-full text-center inline-block bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
          onClick={() => {
            // Report functionality would go here
            alert(`Report ${donor.fullName}`);
          }}
        >
          <span>রিপোর্ট করুন</span>
        </button>
      </div>
    </div>
  )
}

export default DonorCard
