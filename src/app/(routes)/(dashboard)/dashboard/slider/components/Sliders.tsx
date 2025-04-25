import React, { useEffect } from 'react';
import SliderTypes from "@/lib/types/sliderTypes"
import Image from "next/image"
import { useState, Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { toggleActiveSlider } from '@/app/actions/administrator/system/sliderAction';

interface SlidersProps {
  sliders: SliderTypes[];
  refetch: () => void;
  setIsDeleteModal: Dispatch<SetStateAction<boolean>>;
  setDeleteSlider: Dispatch<SetStateAction<{id: string, title: string}>>
}

const Sliders = ({sliders, refetch, setIsDeleteModal, setDeleteSlider}: SlidersProps) => {
  const [localSliders, setLocalSliders] = useState<SliderTypes[]>(sliders)
  
  // Update local state when props change (after refetch)
  useEffect(() => {
    setLocalSliders(sliders);
  }, [sliders]);

  const handleToggleActive = async (id: string | undefined) => {
    if (!id) return
    
    try {
      // Optimistic UI update
     
      
      const response = await toggleActiveSlider(id)

      if(response.success){

        refetch()
        setLocalSliders(prev => 
            prev.map(slider => 
              slider._id === id ? { ...slider, isActive: !slider.isActive } : slider
            )
          )
          toast.success("Slider status updated successfully")
      }
      // Here you would call an API to update the slider status
      // const response = await updateSliderStatus(id)
      // if (!response.success) throw new Error(response.message)
      
      
    } catch (error) {
        console.log(error)
      // Revert changes if API call fails
      setLocalSliders(prev => 
        prev.map(slider => 
          slider._id === id ? { ...slider, isActive: !slider.isActive } : slider
        )
      )
      toast.error("Failed to update slider status")
    }
  }

  const handleDelete = async (id: string | undefined, title: string | undefined) => {
    if (!id) return
    setIsDeleteModal(true)
    setDeleteSlider({id, title: title || ''})
    
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {localSliders.map(slider => (
        <div key={slider._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
          <div className="relative h-48 overflow-hidden">
            {slider.image ? (
              <Image 
                width={500} 
                height={300} 
                src={`${slider.image}`} 
                alt={slider.title || 'Slider Image'} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                slider.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {slider.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <button 
              onClick={() => handleDelete(slider._id, slider.title)}
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90"
              aria-label="Delete slider"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{slider.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{slider.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => handleToggleActive(slider._id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${slider.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                  aria-label={slider.isActive ? 'Deactivate slider' : 'Activate slider'}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${slider.isActive ? 'translate-x-6' : 'translate-x-1'}`} 
                  />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {slider.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(slider._id, slider.title)}
                className="flex items-center text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                aria-label="Delete slider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sliders