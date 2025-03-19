'use client'
import Link from "next/link";
import { useEffect, useState } from "react";


const Sliders = ({slides}: {slides: {image: string, title: string, description: string}[]}) => {
    const [current, setCurrent] = useState(0);
  
    // Auto-advance slides
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
      }, 5000);
      return () => clearInterval(interval);
    }, [slides.length]);
  
    // Go to specific slide
    const goToSlide = (index: number) => {
      setCurrent(index);
    };
  
    // Go to next slide
    const nextSlide = () => {
      setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };
  
    // Go to previous slide
    const prevSlide = () => {
      setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          {/* Slide content */}
          <div className="container mx-auto px-4 h-full relative z-10">
            <div className="flex flex-col items-center justify-center text-center text-white h-full max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-lg mb-6 animate-fadeIn animation-delay-200">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
                <Link 
                  href="/register" 
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-center font-semibold"
                >
                  রেজিস্ট্রেশন করুন
                </Link>
                <Link 
                  href="/login" 
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-center font-semibold"
                >
                  লগইন করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button 
        aria-label="পূর্ববর্তী স্লাইডে যান"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        aria-label="পরবর্তী স্লাইডে যান"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`স্লাইড ${index + 1}-এ যান`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sliders
