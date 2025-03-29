import Image from "next/image";
import { Suspense } from "react";
import LoginFormWrapper from "./LoginFormWrapper";
import { generateMetadata } from "@/app/config/metadata";

export const metadata = generateMetadata({
  title: "লগইন করুন",
  description: "রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন। লগইন করে আপনার অ্যাকাউন্টে প্রবেশ করুন এবং রক্তদান সেবা গ্রহণ করুন।",
  path: "/login",
});

function LoginContent() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image 
            src="/logo.png" 
            alt="রক্তদান রংপুর বিভাগ" 
            width={80} 
            height={80}
            className="mx-auto h-20 w-auto"
            priority
          />
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            রক্তদান রংপুর বিভাগে স্বাগতম
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন
          </p>
        </div>
        
        <LoginFormWrapper />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
} 