export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | রংপুর রক্তদান সিস্টেম",
  description: "রংপুর রক্তদান সিস্টেমের গোপনীয়তা নীতি - আপনার ব্যক্তিগত তথ্য কিভাবে সংগ্রহ, ব্যবহার এবং সুরক্ষিত করা হয় তা জানুন। আমরা আপনার গোপনীয়তা নিশ্চিত করার জন্য প্রতিশ্রুতিবদ্ধ।",
  keywords: ["রক্তদান", "গোপনীয়তা নীতি", "রংপুর", "রক্তদান সিস্টেম", "ব্যক্তিগত তথ্য সুরক্ষা", "ডাটা প্রাইভেসি"],
  alternates: {
    canonical: "https://blood-donor-bangladesh.vercel.app/privacy"
  },
  openGraph: {
    title: "গোপনীয়তা নীতি | রংপুর রক্তদান সিস্টেম",
    description: "রংপুর রক্তদান সিস্টেমের গোপনীয়তা নীতি - আপনার ব্যক্তিগত তথ্য কিভাবে সংগ্রহ, ব্যবহার এবং সুরক্ষিত করা হয় তা জানুন।",
    url: "https://blood-donor-bangladesh.vercel.app/privacy",
    siteName: "রংপুর রক্তদান সিস্টেম",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "গোপনীয়তা নীতি | রংপুর রক্তদান সিস্টেম",
    description: "রংপুর রক্তদান সিস্টেমের গোপনীয়তা নীতি - আপনার ব্যক্তিগত তথ্য কিভাবে সংগ্রহ, ব্যবহার এবং সুরক্ষিত করা হয় তা জানুন।",
  },
};

const PrivacyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">গোপনীয়তা নীতি</h1>
      
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">১. তথ্য সংগ্রহ</h2>
        <p className="mb-4 text-gray-700">
          আমাদের রক্তদান সিস্টেম ব্যবহার করার সময়, আমরা নিম্নলিখিত তথ্য সংগ্রহ করি:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>ব্যক্তিগত তথ্য (নাম, ঠিকানা, যোগাযোগের তথ্য)</li>
          <li>জন্ম তারিখ ও বয়স</li>
          <li>রক্তের গ্রুপ ও রক্তদানের ইতিহাস</li>
          <li>স্বাস্থ্য সংক্রান্ত তথ্য (যতটুকু রক্তদানের যোগ্যতা নির্ধারণের জন্য প্রয়োজন)</li>
          <li>অবস্থান তথ্য (অনুমতি সাপেক্ষে)</li>
          <li>ডিভাইস তথ্য ও IP ঠিকানা</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">২. তথ্য ব্যবহার</h2>
        <p className="mb-3 text-gray-700">
          আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>রক্তদাতা এবং রক্ত প্রার্থীদের মধ্যে সংযোগ স্থাপন করতে</li>
          <li>রক্তদান কার্যক্রম ও ইভেন্টের সম্পর্কে আপনাকে অবহিত করতে</li>
          <li>আপনার অ্যাকাউন্ট পরিচালনা করতে</li>
          <li>আমাদের পরিষেবা উন্নত করতে</li>
          <li>আইনি বাধ্যবাধকতা মেনে চলতে</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৩. তথ্য সুরক্ষা</h2>
        <p className="mb-4 text-gray-700">
          আমরা আপনার তথ্য সুরক্ষার জন্য যথাযথ ব্যবস্থা গ্রহণ করি। এর মধ্যে রয়েছে ডাটা এনক্রিপশন, 
          নিয়মিত সিকিউরিটি অডিট, এবং কঠোর অ্যাক্সেস কন্ট্রোল। আমরা নিশ্চিত করি যে শুধুমাত্র অনুমোদিত 
          কর্মীরাই আপনার তথ্যে প্রবেশাধিকার পায়।
        </p>
        <p className="text-gray-700">
          তবে, কোন অনলাইন সিস্টেমই ১০০% নিরাপদ নয়। আমরা সর্বোচ্চ সুরক্ষা প্রদান করার চেষ্টা করি, 
          কিন্তু আমরা পুরোপুরি নিরাপত্তার গ্যারান্টি দিতে পারি না।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৪. তথ্য শেয়ারিং</h2>
        <p className="mb-3 text-gray-700">
          আমরা নিম্নলিখিত ক্ষেত্রে আপনার তথ্য শেয়ার করতে পারি:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>রক্ত প্রার্থীদের সাথে (শুধুমাত্র প্রয়োজনীয় যোগাযোগ তথ্য)</li>
          <li>স্বাস্থ্য প্রতিষ্ঠানের সাথে (রক্তদান প্রক্রিয়ার জন্য)</li>
          <li>আইন প্রয়োগকারী সংস্থার সাথে (আইনি বাধ্যবাধকতা অনুসারে)</li>
          <li>পরিষেবা প্রদানকারীদের সাথে (যারা আমাদের পক্ষে কাজ করে)</li>
        </ul>
        <p className="text-gray-700">
          আমরা কখনই আপনার তথ্য বাণিজ্যিক উদ্দেশ্যে তৃতীয় পক্ষের কাছে বিক্রি করি না।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৫. ব্যবহারকারীর অধিকার</h2>
        <p className="mb-3 text-gray-700">
          আপনার নিম্নলিখিত অধিকার রয়েছে:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>আপনার সম্পর্কে আমাদের কাছে সংরক্ষিত তথ্য দেখার অধিকার</li>
          <li>আপনার তথ্য সংশোধন করার অধিকার</li>
          <li>আপনার তথ্য মুছে ফেলার অনুরোধ করার অধিকার</li>
          <li>তথ্য প্রক্রিয়াকরণের সীমাবদ্ধতা চাওয়ার অধিকার</li>
          <li>তথ্য প্রক্রিয়াকরণে আপত্তি করার অধিকার</li>
          <li>ডাটা পোর্টেবিলিটির অধিকার</li>
        </ul>
        <p className="text-gray-700">
          এই অধিকারগুলি ব্যবহার করতে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৬. কুকিজ ও ট্র্যাকিং</h2>
        <p className="mb-4 text-gray-700">
          আমাদের ওয়েবসাইট কুকিজ ও অনুরূপ ট্র্যাকিং প্রযুক্তি ব্যবহার করে আপনার ব্যবহারের অভিজ্ঞতা উন্নত করতে।
          কুকিজ হল ছোট টেক্সট ফাইল যা আপনার ব্রাউজারে সংরক্ষিত হয়। আপনি ব্রাউজার সেটিংসে গিয়ে কুকিজ প্রত্যাখ্যান
          বা সীমিত করতে পারেন, তবে এটি আমাদের ওয়েবসাইটের কিছু ফাংশন ব্যবহার করতে প্রভাবিত করতে পারে।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৭. শিশুদের গোপনীয়তা</h2>
        <p className="mb-4 text-gray-700">
          আমাদের পরিষেবা ১৮ বছরের বেশি বয়সীদের জন্য ডিজাইন করা হয়েছে। আমরা জেনে-শুনে ১৮ বছরের কম বয়সী ব্যক্তিদের
          ব্যক্তিগত তথ্য সংগ্রহ করি না। যদি আমরা জানতে পারি যে আমরা ১৮ বছরের কম বয়সী শিশুর তথ্য সংগ্রহ করেছি, আমরা
          সেই তথ্য অবিলম্বে মুছে ফেলার ব্যবস্থা নেব।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৮. নীতি পরিবর্তন</h2>
        <p className="mb-4 text-gray-700">
          আমরা এই গোপনীয়তা নীতি সময়ে সময়ে পরিবর্তন করতে পারি। আমরা যখন এই নীতি আপডেট করব, তখন এই পৃষ্ঠায় নতুন
          তারিখ অন্তর্ভুক্ত করব। আমরা আপনাকে নিয়মিত এই পৃষ্ঠা পরিদর্শন করতে উৎসাহিত করি যাতে আপনি আপডেট সম্পর্কে
          জানতে পারেন।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৯. যোগাযোগ</h2>
        <p className="mb-4 text-gray-700">
          এই গোপনীয়তা নীতি সম্পর্কে যেকোন প্রশ্ন বা উদ্বেগ থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: 
          <a href="mailto:privacy@blooddonation-rangpur.org" className="text-red-600 hover:underline ml-1">
            privacy@blooddonation-rangpur.org
          </a>
        </p>
      </section>

      <footer className="text-center mt-8 text-gray-600 text-sm">
        <p>সর্বশেষ আপডেট: <time dateTime="2023-05-25">২৫ মে, ২০২৩</time></p>
      </footer>
    </main>
  );
};

export default PrivacyPage;
