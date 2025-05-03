export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "নিয়ম ও শর্তাবলী | রক্তদান বাংলাদেশ",
  description: "বাংলাদেশের রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন। রক্তদান করার আগে আমাদের শর্তাবলী অবশ্যই পড়ুন।",
  keywords: ["রক্তদান", "নিয়ম ও শর্তাবলী", "রংপুর", "রক্তদান সিস্টেম", "রক্তদানের নিয়মাবলী", "ব্যবহারের শর্ত"],
  alternates: {
    canonical: "https://blood-donor-bangladesh.vercel.app/terms"
  },
  openGraph: {
    title: "নিয়ম ও শর্তাবলী | রক্তদান বাংলাদেশ",
    description: "বাংলাদেশের রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন।",
    url: "https://blood-donor-bangladesh.vercel.app/terms",
    siteName: "রক্তদান বাংলাদেশ",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "নিয়ম ও শর্তাবলী | রক্তদান বাংলাদেশ",
    description: "বাংলাদেশের রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন।",
  },
};

const TermsPage = () => {
  // Get current date in Bengali format
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('bn-BD', options);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">নিয়ম ও শর্তাবলী</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-700 mb-4">
          <strong>কার্যকর তারিখ:</strong> {formattedDate}<br />
          <strong>অ্যাপ নাম:</strong> লাইফড্রপ মেসেঞ্জার বট<br />
          <strong>ডেভেলপার:</strong> তাজবীর ইসলাম
        </p>
      </div>
      
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">১. শর্তাবলী গ্রহণ</h2>
        <p className="mb-4 text-gray-700">
          লাইফড্রপ মেসেঞ্জার বট ব্যবহার করে, আপনি এই সেবা শর্তাবলী মেনে চলতে সম্মত হচ্ছেন। 
          আপনি যদি কোন অংশের সাথে একমত না হন, তাহলে অনুগ্রহ করে বটটি ব্যবহার করবেন না।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">২. সেবার বিবরণ</h2>
        <p className="mb-3 text-gray-700">
          লাইফড্রপ মেসেঞ্জার বট ব্যবহারকারীদের নিম্নলিখিত সুবিধা প্রদান করে:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>রক্তদাতার তথ্য জমা দেওয়া</li>
          <li>অবস্থান এবং রক্তের গ্রুপের উপর ভিত্তি করে রক্তদাতা খোঁজা</li>
          <li>রক্তদান সম্পর্কিত বার্তা এবং আপডেট পাওয়া</li>
        </ul>
        <p className="text-gray-700">
          এই সেবাটি বিনামূল্যে প্রদান করা হয়।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৩. ব্যবহারকারীর দায়িত্ব</h2>
        <p className="mb-3 text-gray-700">
          ব্যবহারকারী হিসেবে, আপনি সম্মত হচ্ছেন:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>সঠিক ও সত্য তথ্য প্রদান করতে</li>
          <li>বটটি স্প্যাম, অপব্যবহার বা কোন অবৈধ কার্যকলাপের জন্য ব্যবহার না করতে</li>
          <li>অন্য ব্যবহারকারীদের গোপনীয়তা সম্মান করতে</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৪. তথ্য ব্যবস্থাপনা</h2>
        <p className="mb-4 text-gray-700">
          এই বট ব্যবহার করে, আপনি আমাদের গোপনীয়তা নীতিতে বর্ণিত অনুযায়ী আপনার তথ্য সংগ্রহ এবং ব্যবহারে সম্মতি দিচ্ছেন।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৫. অ্যাকাউন্ট সমাপ্তি</h2>
        <p className="mb-3 text-gray-700">
          আমরা নিম্নলিখিত ক্ষেত্রে ব্যবহারকারীদের ব্লক বা সীমিত করার অধিকার সংরক্ষণ করি:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>সেবার অপব্যবহার করলে</li>
          <li>ভুল তথ্য প্রদান করলে</li>
          <li>এই শর্তাবলীর যেকোনো অংশ লঙ্ঘন করলে</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৬. দায়বদ্ধতার সীমাবদ্ধতা</h2>
        <p className="mb-3 text-gray-700">
          আমরা নিম্নলিখিত বিষয়ের জন্য দায়ী নই:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>ব্যবহারকারী-জমা দেওয়া তথ্যের অসঙ্গতি</li>
          <li>সেবা বিঘ্ন</li>
          <li>সেবা ব্যবহারের ফলে সৃষ্ট যেকোনো ক্ষতি</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৭. পরিবর্তন</h2>
        <p className="mb-4 text-gray-700">
          আমরা যেকোনো সময় এই শর্তাবলী আপডেট করতে পারি। পরিবর্তনগুলি এই পৃষ্ঠায় প্রকাশ করা হবে। 
          সেবা ব্যবহার চালিয়ে যাওয়া মানে আপনি আপডেট করা শর্তাবলী গ্রহণ করেছেন।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৮. যোগাযোগ</h2>
        <p className="mb-4 text-gray-700">
          এই শর্তাবলী সম্পর্কে প্রশ্ন বা উদ্বেগ থাকলে, আমাদের সাথে যোগাযোগ করুন:<br />
          📧 ইমেইল: <a href="mailto:studenttajbirislam@gmail.com" className="text-red-600 hover:underline">studenttajbirislam@gmail.com</a><br />
          🌐 ওয়েবসাইট: <a href="https://blood-donor-bangladesh.vercel.app" className="text-red-600 hover:underline">https://blood-donor-bangladesh.vercel.app</a>
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৯. রক্তদানের যোগ্যতা</h2>
        <p className="mb-3 text-gray-700">
          রক্তদানের জন্য, আপনাকে নিম্নলিখিত যোগ্যতা পূরণ করতে হবে:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>১৮-৬০ বছর বয়সী হতে হবে</li>
          <li>কমপক্ষে ৫০ কেজি ওজন থাকতে হবে</li>
          <li>শারীরিকভাবে সুস্থ হতে হবে</li>
          <li>দুই রক্তদানের মধ্যে কমপক্ষে ৩ মাস অপেক্ষা করতে হবে</li>
          <li>কোন সংক্রামক রোগ বা অস্থায়ী অসুস্থতা থেকে মুক্ত হতে হবে</li>
        </ul>
        <p className="text-gray-700">
          আমরা সর্বদা রক্তদানের আগে পেশাদার স্বাস্থ্যকর্মীর পরামর্শ নেওয়ার পরামর্শ দিই।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">১০. গোপনীয়তা নীতি</h2>
        <p className="mb-3 text-gray-700">
          আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখার প্রতিশ্রুতি দিচ্ছি:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>আপনার চিকিৎসা তথ্য শুধুমাত্র অনুমোদিত স্বাস্থ্যকর্মীদের সাথে শেয়ার করা হবে</li>
          <li>আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হবে না</li>
          <li>আপনার অবস্থান তথ্য শুধুমাত্র রক্তদাতা খুঁজে পেতে ব্যবহার করা হবে</li>
          <li>আপনি যেকোনো সময় আপনার তথ্য মুছে ফেলার অনুরোধ করতে পারেন</li>
        </ul>
        <p className="text-gray-700">
          আমাদের গোপনীয়তা নীতি সম্পর্কে বিস্তারিত জানতে, অনুগ্রহ করে আমাদের 
          <a href="/privacy" className="text-red-600 hover:underline ml-1">
            গোপনীয়তা পৃষ্ঠা
          </a> দেখুন।
        </p>
      </section>

      <footer className="text-center mt-8 text-gray-600 text-sm">
        <p>সর্বশেষ আপডেট: <time dateTime={today.toISOString().split('T')[0]}>{formattedDate}</time></p>
      </footer>
    </main>
  );
};

export default TermsPage;
