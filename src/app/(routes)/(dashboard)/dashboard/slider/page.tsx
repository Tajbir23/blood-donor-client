'use client'
import { useState, useEffect } from "react"
import SliderForm from "./components/SliderForm"
import { useQuery } from "@tanstack/react-query"
import { getAllSliders } from "@/app/actions/administrator/system/sliderAction"
import SliderTypes from "@/lib/types/sliderTypes"
import Sliders from "./components/Sliders"
import LoadingSkelaton from "./components/LoadingSkelaton"
import DeleteSlider from "./components/DeleteSlider"

interface SliderQuery {
  sliders: SliderTypes[],
  total: number,
  totalPages: number,
  currentPage: number
}

interface DeleteSliderType {
  title: string;
  id: string
}

const SliderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [deleteSlider, setDeleteSlider] = useState<DeleteSliderType>({
    title: '',
    id: ''
  })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  const limit = 10
  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 300);
    
    return () => clearTimeout(timer);
  }, [search]);
  
  const { data, isLoading, refetch } = useQuery<SliderQuery>({
    queryKey: ['dashboard-sliders', page, limit, debouncedSearch],
    queryFn: () => getAllSliders(page, limit, debouncedSearch),
    staleTime: 1000 * 60 * 5
  })
  
  const totalPages = data?.totalPages || 1
  const totalData = data?.total || 0
  const currentPage = data?.currentPage || 1

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  
  // Generate pagination numbers
  const generatePaginationItems = () => {
    const items = [];
    const maxPages = 5; // Maximum number of page buttons to show
    
    // Always show first page
    items.push(1);
    
    if (totalPages <= 1) return items;
    
    // Calculate start and end of pages to show
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the beginning
    if (currentPage <= 3) {
      endPage = Math.min(maxPages - 1, totalPages - 1);
    }
    
    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxPages + 2);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push('...');
    }
    
    // Always show last page if we have more than 1 page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Slider Management</h1>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search sliders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <button 
                onClick={openModal}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Slider
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Loading skeleton */}
          {isLoading && <LoadingSkelaton />}

          {/* Slider list */}
          {!isLoading && data?.sliders && data.sliders.length > 0 && (
            <>
              <Sliders sliders={data.sliders} refetch={refetch} setIsDeleteModal={setIsDeleteModal} setDeleteSlider={setDeleteSlider} />
              
              {/* Pagination */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{(currentPage - 1) * limit + 1}</span> to{" "}
                  <span className="font-semibold">{Math.min(currentPage * limit, totalData)}</span> of{" "}
                  <span className="font-semibold">{totalData}</span> sliders
                </p>
                
                <div className="flex items-center space-x-1">
                  {/* Previous page button */}
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 
                        ? "text-gray-400 cursor-not-allowed" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {/* Page numbers */}
                  {generatePaginationItems().map((item, index) => (
                    item === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1">...</span>
                    ) : (
                      <button
                        key={`page-${item}`}
                        onClick={() => typeof item === 'number' && setPage(item)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === item
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  ))}
                  
                  {/* Next page button */}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages 
                        ? "text-gray-400 cursor-not-allowed" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* No sliders state */}
          {!isLoading && data?.sliders.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-10 text-center border border-gray-200 my-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No sliders found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {debouncedSearch ? `No results found for "${debouncedSearch}"` : "Create your first slider to showcase on the home page."}
              </p>
              <button 
                onClick={openModal}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Slider
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SliderForm isOpen={isModalOpen} onClose={closeModal} refetch={refetch} />
      <DeleteSlider isDeleteModalOpen={isDeleteModal} setIsDeleteModalOpen={setIsDeleteModal} id={deleteSlider.id} title={deleteSlider.title} refetch={refetch} />
    </div>
  )
}

export default SliderPage