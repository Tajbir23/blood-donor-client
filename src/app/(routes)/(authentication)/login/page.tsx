import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image 
            src="/logo.png" 
            alt="রক্তদান রংপুর বিভাগ" 
            width={80} 
            height={80}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            রক্তদান রংপুর বিভাগে স্বাগতম
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            রংপুর বিভাগের রক্তদান কমিউনিটিতে যোগ দিন
          </p>
        </div>
        
        {/* ... login form ... */}
      </div>
    </div>
  );
};

export default LoginPage; 