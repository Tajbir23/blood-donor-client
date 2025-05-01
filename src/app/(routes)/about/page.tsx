export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">আমাদের সম্পর্কে</h1>
      
      <div className="max-w-3xl mx-auto prose prose-lg">
        <p>
          <strong>রক্তদান  বাংলাদেশ</strong> সম্পূর্ণ অলাভজনক উদ্দেশ্যে প্রতিষ্ঠিত একটি প্ল্যাটফর্ম যা বাংলাদেশের সকল জেলায় রক্তদাতা এবং রক্তের প্রয়োজনে থাকা ব্যক্তিদের মধ্যে সংযোগ স্থাপন করে।
        </p>
        
        <h2>আমাদের লক্ষ্য</h2>
        <p>
          বাংলাদেশের সকল জেলায় একটি সুসংগঠিত রক্তদাতা নেটওয়ার্ক গড়ে তোলা, যাতে কোন মানুষকে রক্তের অভাবে প্রাণ হারাতে না হয়।
        </p>
        
        {/* ... rest of about page content ... */}
      </div>
    </div>
  );
};

export default AboutPage; 