import Image from 'next/image'

const DonorCard = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105">
      <Image 
        className="w-full object-cover" 
        src="/donor-image.jpg" 
        alt="Donor Image" 
        width={400} 
        height={300} 
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-2xl mb-2 text-red-600">John Doe</h2>
        <div className="text-gray-700 text-base space-y-1">
          <p><span className="font-semibold">Address:</span> Kurigram Sadar</p>
          <p><span className="font-semibold">Phone:</span> +880123456789</p>
          <p><span className="font-semibold">Blood Group:</span> A+</p>
        </div>
      </div>
      <div className="px-6 py-4 w-full">
        <a 
          href="tel:+880123456789" 
          className="w-full text-center inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          Call Now
        </a>
      </div>
    </div>
  )
}

export default DonorCard
