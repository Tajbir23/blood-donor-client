const FindBlood = () => {
  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">জরুরি রক্ত খুঁজুন</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <label htmlFor="bloodGroup" className="sr-only">ব্লাড গ্রুপ বাছাই করুন</label>
            <select 
              id="bloodGroup"
              name="bloodGroup"
              aria-label="ব্লাড গ্রুপ বাছাই করুন" 
              className="w-full p-3 border rounded-lg"
            >
              <option value="">ব্লাড গ্রুপ বাছাই করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <label htmlFor="location" className="sr-only">এলাকা নির্বাচন করুন</label>
            <select 
              id="location"
              name="location"
              aria-label="এলাকা নির্বাচন করুন" 
              className="w-full p-3 border rounded-lg"
            >
              <option value="">এলাকা নির্বাচন করুন</option>
              <option value="kurigram-sadar">কুড়িগ্রাম সদর</option>
              <option value="ulipur">উলিপুর</option>
              <option value="chilmari">চিলমারী</option>
              <option value="rajarhat">রাজারহাট</option>
              <option value="nageshwari">নাগেশ্বরী</option>
              <option value="bhurungamari">ভুরুঙ্গামারী</option>
              <option value="phulbari">ফুলবাড়ী</option>
              <option value="roumari">রৌমারী</option>
              <option value="char-rajibpur">চর রাজিবপুর</option>
            </select>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold">
            খুঁজুন
          </button>
        </div>
      </section>
  )
}

export default FindBlood
