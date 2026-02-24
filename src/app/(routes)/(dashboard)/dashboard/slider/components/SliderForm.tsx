'use client'
import { createSlider } from "@/app/actions/administrator/system/sliderAction";
import { UploadImage } from "@/app/libs"
import SliderTypes from "@/lib/types/sliderTypes"
import { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast";

interface SliderFormProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const SliderForm = ({ isOpen, onClose, refetch }: SliderFormProps) => {
    const [slider, setSlider] = useState<SliderTypes>({})
    const [isRoute, setIsRoute] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSlider(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        
        // Validate description
        if (!slider.description || slider.description.length < 10) {
            toast.error('Description must be at least 10 characters long')
            return
        }
        if (slider.description.length > 500) {
            toast.error('Description cannot exceed 500 characters')
            return
        }

        // Add form submission logic here
        console.log(slider)
        const response = await createSlider(slider)
        if(response.success) {
            toast.success(response.message)
            onClose()
            refetch()
        } else {
            toast.error(response.message)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all">
            <div 
                ref={modalRef}
                className="bg-white p-0 rounded-xl shadow-2xl w-full max-w-4xl h-auto max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn"
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 sm:px-8 py-4 sm:py-6 rounded-t-xl flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Slider</h2>
                        <button 
                            onClick={onClose}
                            className="text-white/80 hover:text-white focus:outline-none transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Form */}
                <div className="px-6 sm:px-8 py-6 overflow-y-auto flex-grow">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Slider Image</label>
                            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-lg p-4">
                                <UploadImage onImageSelect={(image) => setSlider(prev => ({ ...prev, imageFile: image }))} />
                                <p className="text-xs text-gray-500 mt-2 text-center">Recommended size: 1920x1080px</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="title"
                                    name="title"
                                    value={slider.title || ''}
                                    onChange={handleChange}
                                    placeholder="Enter slider title" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                                <textarea 
                                    id="description"
                                    name="description"
                                    value={slider.description || ''}
                                    onChange={handleChange}
                                    placeholder="Enter slider description" 
                                    rows={3}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                        slider.description && (slider.description.length < 10 || slider.description.length > 500) 
                                        ? 'border-red-500' 
                                        : 'border-gray-300'
                                    }`}
                                />
                                {slider.description && slider.description.length < 10 && (
                                    <p className="mt-1 text-sm text-red-500">Description must be at least 10 characters long</p>
                                )}
                                {slider.description && slider.description.length > 500 && (
                                    <p className="mt-1 text-sm text-red-500">Description cannot exceed 500 characters</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    {slider.description ? `${slider.description.length}/500 characters` : '0/500 characters'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-5 rounded-lg border border-blue-100">
                            <div className="flex items-center mb-4">
                                <input 
                                    type="checkbox" 
                                    id="isRoute"
                                    checked={isRoute}
                                    onChange={() => {
                                        setIsRoute(!isRoute)
                                        setSlider(prev => ({ ...prev, isRoute: !isRoute }))
                                    }} 
                                    className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isRoute" className="text-gray-700 font-medium">Add Button with Route</label>
                            </div>
                            
                            {isRoute && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 sm:pl-8 animate-fadeIn">
                                    <div>
                                        <label htmlFor="route" className="block text-gray-700 font-medium mb-2">Route Path</label>
                                        <input 
                                            type="text" 
                                            id="route"
                                            name="route"
                                            value={slider.route || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., /about-us" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="buttonText" className="block text-gray-700 font-medium mb-2">Button Text</label>
                                        <input 
                                            type="text" 
                                            id="buttonText"
                                            name="buttonText"
                                            value={slider.buttonText || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., Learn More" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                
                {/* Footer */}
                <div className="px-6 sm:px-8 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200 flex-shrink-0">
                    <div className="flex justify-end space-x-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                        >
                            Save Slider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderForm