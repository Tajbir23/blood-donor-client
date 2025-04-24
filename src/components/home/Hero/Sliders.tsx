'use client'
import { User } from "@/lib/types/userType";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const queryClient = useQueryClient();

  const user = useMemo(() => queryClient.getQueryData<UserQuery>(['user']), [queryClient]);
  const isLoggedIn = useMemo(() => user?.user._id, [user]);

  // Auto-advance slides with useCallback for optimization
  const advanceSlide = useCallback(() => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);

  // Auto-advance slides
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(advanceSlide, 6000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, advanceSlide]);

  // Pause autoplay when user interacts
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    // Resume after 8 seconds of inactivity
    const timer = setTimeout(() => setIsAutoPlaying(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    pauseAutoPlay();
    setCurrent(index);
  }, [pauseAutoPlay]);

  // Go to next slide
  const nextSlide = useCallback(() => {
    pauseAutoPlay();
    setCurrent(current => current === slides.length - 1 ? 0 : current + 1);
  }, [pauseAutoPlay, slides.length]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    pauseAutoPlay();
    setCurrent(current => current === 0 ? slides.length - 1 : current - 1);
  }, [pauseAutoPlay, slides.length]);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden shadow-md">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image 
              src={slides[current].image} 
              alt={slides[current].title}
              fill
              priority={current === 0}
              loading={current === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
              quality={80}
            />
            
            {/* Slide content */}
            <div className="container mx-auto px-4 h-full relative z-10">
              <div className="flex flex-col items-center justify-center text-center text-white h-full max-w-4xl mx-auto">
                <h1 
                  className="text-3xl md:text-5xl font-bold mb-6" 
                  style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.7)' }}
                >
                  {slides[current].title}
                </h1>
                
                <p 
                  className="text-lg mb-8 text-white max-w-2xl"
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}
                >
                  {slides[current].description}
                </p>
                
                <div className="space-y-4">
                  {/* Show custom button when isRoute is true */}
                  {slides[current].isRoute && slides[current].route && (
                    <Link 
                      href={slides[current].route}
                      className="bg-red-700 hover:bg-red-800 text-white py-3 px-8 rounded-md text-center font-semibold transition-colors duration-300 inline-block mx-2"
                      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                    >
                      {slides[current].buttonText || "আরও জানুন"}
                    </Link>
                  )}
                  
                  {/* Show login/register buttons when user is not logged in */}
                  {!isLoggedIn && (
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                      <Link 
                        href="/register" 
                        className="bg-red-700 hover:bg-red-800 text-white py-3 px-8 rounded-md text-center font-semibold transition-colors duration-300"
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                      >
                        রেজিস্ট্রেশন করুন
                      </Link>
                      <Link 
                        href="/login" 
                        className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-8 rounded-md text-center font-semibold transition-colors duration-300"
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                      >
                        লগইন করুন
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button 
        aria-label="পূর্ববর্তী স্লাইডে যান"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 transition-colors duration-300"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        aria-label="পরবর্তী স্লাইডে যান"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 transition-colors duration-300"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators - classic dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`স্লাইড ${index + 1}-এ যান`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sliders;
