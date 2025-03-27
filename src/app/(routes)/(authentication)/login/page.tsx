import Image from "next/image";
import LoginForm from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "লগইন করুন | রক্তদান রংপুর বিভাগ",
  description: "রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন। লগইন করে আপনার অ্যাকাউন্টে প্রবেশ করুন এবং রক্তদান সেবা গ্রহণ করুন।",
  keywords: "রক্তদান, রংপুর, লগইন, রক্তদাতা, ব্লাড ডোনেশন, blood donation, rangpur",
  openGraph: {
    title: "লগইন করুন | রক্তদান রংপুর বিভাগ",
    description: "রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন। লগইন করে আপনার অ্যাকাউন্টে প্রবেশ করুন।",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "রক্তদান রংপুর বিভাগ",
      },
    ],
  },
};

const LoginPage = () => {
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
        
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage; 