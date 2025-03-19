import Link from "next/link"


const CallToAction = () => {
  return (
    <section className="py-16 bg-red-600 text-white rounded-xl my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">আজই রক্তদাতা হিসেবে যোগ দিন</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            আপনার রক্তদান একজন মানুষের জীবন বাঁচাতে পারে। আমাদের প্লাটফর্মে রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন এবং জীবন বাঁচানোর মিশনে অংশ নিন।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-white text-red-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold"
            >
              রেজিস্ট্রেশন করুন
            </Link>
            <Link 
              href="/about" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 py-3 px-8 rounded-lg font-semibold transition-colors"
            >
              আরও জানুন
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CallToAction
