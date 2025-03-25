import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "নিয়ম ও শর্তাবলী | রংপুর রক্তদান সিস্টেম",
  description: "রংপুর রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন। রক্তদান করার আগে আমাদের শর্তাবলী অবশ্যই পড়ুন।",
  keywords: ["রক্তদান", "নিয়ম ও শর্তাবলী", "রংপুর", "রক্তদান সিস্টেম", "রক্তদানের নিয়মাবলী", "ব্যবহারের শর্ত"],
  alternates: {
    canonical: "https://blooddonation-rangpur.org/terms"
  },
  openGraph: {
    title: "নিয়ম ও শর্তাবলী | রংপুর রক্তদান সিস্টেম",
    description: "রংপুর রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন।",
    url: "https://blooddonation-rangpur.org/terms",
    siteName: "রংপুর রক্তদান সিস্টেম",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "নিয়ম ও শর্তাবলী | রংপুর রক্তদান সিস্টেম",
    description: "রংপুর রক্তদান সিস্টেমের নিয়ম ও শর্তাবলী - যোগ্যতা, দায়িত্ব, ও নীতিমালা সম্পর্কে বিস্তারিত জানুন।",
  },
};

const TermsPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">নিয়ম ও শর্তাবলী</h1>
      
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">১. সাধারণ তথ্য</h2>
        <p className="mb-4 text-gray-700">
          আপনি যখন আমাদের ব্লাড ডোনেশন সিস্টেম ব্যবহার করেন, তখন আপনি এই নিয়ম ও শর্তাবলী মেনে চলতে সম্মত হন। 
          আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার সংরক্ষণ করি এবং আপনি নিয়মিত এই পৃষ্ঠা দেখে 
          নতুন আপডেট সম্পর্কে জানতে পারেন।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">২. অ্যাকাউন্ট নিবন্ধন</h2>
        <p className="mb-3 text-gray-700">
          সিস্টেমে নিবন্ধন করতে, আপনাকে অবশ্যই:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>সঠিক ও আপ-টু-ডেট তথ্য প্রদান করতে হবে</li>
          <li>আপনার অ্যাকাউন্ট তথ্য গোপন রাখতে হবে</li>
          <li>কমপক্ষে ১৮ বছর বয়সী হতে হবে (বা অভিভাবকের অনুমতিসহ)</li>
          <li>আপনার অ্যাকাউন্ট ব্যবহারের জন্য সম্পূর্ণ দায়িত্ব নিতে হবে</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৩. রক্তদানের যোগ্যতা</h2>
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
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৪. ব্যবহারকারীর দায়িত্ব</h2>
        <p className="mb-3 text-gray-700">
          ব্যবহারকারী হিসেবে, আপনি সম্মত হচ্ছেন:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>সঠিক ও সত্য তথ্য প্রদান করতে</li>
          <li>রক্তদানের সময় সম্পূর্ণ সহযোগিতা করতে</li>
          <li>প্ল্যাটফর্মে কোন ভুল বা অসত্য তথ্য প্রদান না করতে</li>
          <li>রক্ত প্রার্থীদের সাথে সম্মানজনক আচরণ করতে</li>
          <li>সময়মত রক্তদানের প্রতিশ্রুতি পূরণ করতে</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৫. গোপনীয়তা নীতি</h2>
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

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৬. দাবিত্যাগ</h2>
        <p className="mb-4 text-gray-700">
          আমাদের প্ল্যাটফর্ম শুধুমাত্র রক্তদাতা এবং প্রার্থীদের মধ্যে সংযোগ স্থাপন করে। আমরা চিকিৎসা পরামর্শ প্রদান করি না এবং 
          রক্তদানের মান বা সুরক্ষার নিশ্চয়তা দিতে পারি না। রক্ত সংগ্রহ, পরীক্ষা এবং প্রদান প্রক্রিয়া অবশ্যই অনুমোদিত স্বাস্থ্য 
          প্রতিষ্ঠানে সম্পন্ন করতে হবে।
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">৭. যোগাযোগ</h2>
        <p className="mb-4 text-gray-700">
          কোন প্রশ্ন বা মন্তব্য থাকলে, আমাদের সাথে যোগাযোগ করুন: 
          <a href="mailto:contact@blooddonation-rangpur.org" className="text-red-600 hover:underline ml-1">
            contact@blooddonation-rangpur.org
          </a>
        </p>
      </section>

      <footer className="text-center mt-8 text-gray-600 text-sm">
        <p>সর্বশেষ আপডেট: <time dateTime="2023-05-23">২৩ মে, ২০২৩</time></p>
      </footer>
    </main>
  );
};

export default TermsPage;
