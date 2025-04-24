

const LoadingSkelaton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-4 bg-gray-200 rounded w-12 mr-2"></div>
                    <div className="h-6 w-11 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default LoadingSkelaton