'use client'
import { User } from "@/lib/types/userType";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface UserQuery {
    user: User
}

interface SlideProps {
  image: string;
  title: string;
  description: string;
  isRoute?: boolean;
  route?: string;
  buttonText?: string;
}

const Sliders = ({ slides }: { slides: SlideProps[] }) => {
  const [current, setCurrent] = useState(0);
  const queryClient = useQueryClient();

  const user = useMemo(() => queryClient.getQueryData<UserQuery>(['user']), [queryClient]);
  const isLoggedIn = useMemo(() => user?.user._id, [user]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrent(current => current === slides.length - 1 ? 0 : current + 1);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrent(current => current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-2xl">
      {/* Slides */}
      <div className="h-full w-full relative">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === current ? 'opacity-100 z-10 translate-x-0' : 
              index < current ? 'opacity-0 z-0 -translate-x-full' : 'opacity-0 z-0 translate-x-full'
            }`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image 
                src={`${slide.image}`} 
                alt={slide.title}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover object-center transition-transform duration-10000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100vw"
                quality={95}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
              
              {/* Slide content */}
              <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex flex-col items-center justify-center text-center text-white h-full max-w-4xl mx-auto">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn tracking-tight leading-tight">
                    <span className="text-white drop-shadow-[0_2px_8px_rgba(255,0,0,0.6)] font-serif relative">
                      {slide.title}
                      <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></span>
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl mb-8 max-w-2xl animate-slideUp font-medium leading-relaxed">
                    <span className="bg-gradient-to-r from-black/70 to-red-900/50 px-6 py-3 rounded-lg backdrop-blur-sm text-white font-semibold border-l-4 border-red-500 shadow-lg inline-block">
                      {slide.description}
                    </span>
                  </p>
                  
                  <div className="space-y-4 animate-fadeIn">
                    {/* Show custom button when isRoute is true */}
                    {slide.isRoute && slide.route && index === current && (
                      <Link 
                        href={slide.route}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-10 rounded-full text-center font-bold tracking-wide transition-all duration-300 inline-block mx-2 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_rgba(229,62,62,0.4)] transform hover:-translate-y-1 uppercase letter-spacing-wider animate-pulse"
                      >
                        {slide.buttonText || "আরও জানুন"}
                      </Link>
                    )}
                    
                    {/* Show login/register buttons when user is not logged in */}
                    {!isLoggedIn && index === current && (
                      <div className="flex flex-wrap justify-center gap-4 mt-2">
                        <Link 
                          href="/register" 
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-10 rounded-full text-center font-bold tracking-wide transition-all duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_rgba(229,62,62,0.4)] transform hover:-translate-y-1 uppercase border-2 border-red-400/30 animate-bounce"
                        >
                          রেজিস্ট্রেশন করুন
                        </Link>
                        <Link 
                          href="/login" 
                          className="bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-gray-800 py-3 px-10 rounded-full text-center font-bold tracking-wide transition-all duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_20px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 uppercase border-2 border-white/30"
                        >
                          লগইন করুন
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - updated with more elegant styling */}
      <button 
        aria-label="পূর্ববর্তী স্লাইডে যান"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-lg text-white p-3 rounded-full z-20 hover:bg-red-600 transition-all duration-300 border border-white/30 hover:scale-110 shadow-md"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        aria-label="পরবর্তী স্লাইডে যান"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-lg text-white p-3 rounded-full z-20 hover:bg-red-600 transition-all duration-300 border border-white/30 hover:scale-110 shadow-md"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators - more elegant styling */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`স্লাইড ${index + 1}-এ যান`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current 
                  ? "bg-gradient-to-r from-red-500 to-red-700 w-12 shadow-md shadow-red-500/50" 
                  : "bg-white/30 hover:bg-white/70 hover:scale-125 border border-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sliders;
