'use client'
import { getLeaderboardDonors } from '@/app/actions/bloodDonation';
import baseUrl from '@/lib/api/baseUrl';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RegularDonor = () => {

  const { data: donorsData, error } = useQuery({
    queryKey: ['regular-donors'],
    queryFn: getLeaderboardDonors,
    gcTime: 1000 * 60 * 60 * 24 * 10, // 10 days cache time
  });

  console.log(error);
  const donors = donorsData?.data?.map((donor: any) => ({
    id: donor._id,
    name: donor.fullName,
    address: `${donor.thanaId}, ${ donor.districtId}`,
    image: `${process.env.NEXT_PUBLIC_API_URL}${donor.profileImageUrl}`,
  }));


  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef(null);

  // Determine number of slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = donorsData?.length;
  const maxIndex = totalSlides - slidesToShow;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % maxIndex);
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">নিয়মিত রক্তদাতা</h2>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md -ml-4 focus:outline-none"
            aria-label="পূর্ববর্তী"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="overflow-hidden" ref={sliderRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {donors?.map((donor: any) => (
                <div 
                  key={donor.id} 
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={donor.image} 
                        alt={donor.name} 
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{donor.name}</h3>
                      <p className="text-gray-600">{donor.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md -mr-4 focus:outline-none"
            aria-label="পরবর্তী"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
              aria-label={`স্লাইড ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularDonor;
