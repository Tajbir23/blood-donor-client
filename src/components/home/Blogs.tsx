import Image from "next/image"
import Link from "next/link"


const Blogs = () => {
  return (
    <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">সাম্প্রতিক ব্লগ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md">
              <div className="relative h-48">
                <Image
                  src={`/blog-${item}.jpg`}
                  alt="ব্লগ ছবি"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">রক্তদানের সুফল এবং সতর্কতা</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  রক্তদান করার ফলে শরীরে নতুন রক্ত তৈরি হয়, যা রক্তকে সতেজ রাখে। এছাড়াও রক্তদান করলে হৃদরোগের ঝুঁকি কমে যায়...
                </p>
                <Link 
                  href="/blog/1" 
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                >
                  বিস্তারিত পড়ুন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Blogs
