const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">রক্তদান বিভাগ</h3>
            <p className="text-sm">
                বাংলাদেশের জন্য একটি অলাভজনক রক্তদান প্ল্যাটফর্ম। আমরা রক্তদাতা এবং রক্তের প্রয়োজনে থাকা রোগীদের মধ্যে সেতুবন্ধন তৈরি করি।
            </p>
          </div>
          
          {/* ... rest of footer columns ... */}
        </div>
        
        <div className="border-t border-red-600 mt-6 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} রক্তদান বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 