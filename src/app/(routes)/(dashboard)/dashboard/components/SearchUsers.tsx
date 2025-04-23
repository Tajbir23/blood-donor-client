

const SearchUsers = ({search, handleSearch, handleSearchSubmit}: {search: string, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSearchSubmit: () => void}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">ব্যবহারকারী তালিকা</h1>
        <div className="relative w-full sm:w-auto flex">
          <input
            type="text"
            placeholder="অনুসন্ধান করুন..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={handleSearch}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
          <button 
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            খুঁজুন
          </button>
        </div>
      </div>
  )
}

export default SearchUsers