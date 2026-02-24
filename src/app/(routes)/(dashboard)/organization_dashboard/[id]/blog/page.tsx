"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { createBlogPost, getOrgBlogPosts, deleteBlogPost } from '@/app/actions/blog'
import {
    FaPlus, FaTrash, FaSpinner, FaImage, FaTimes,
    FaBlog, FaCalendarAlt, FaCommentAlt, FaEye,
    FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import Link from 'next/link'

interface BlogPost {
    _id: string
    title: string
    content: string
    images: string[]
    authorId: { _id: string; fullName: string; profileImageUrl?: string }
    commentCount: number
    createdAt: string
}

const OrgBlogPage = () => {
    const { id } = useParams()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    // Create form states
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const fetchPosts = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        try {
            const data = await getOrgBlogPosts(id as string, currentPage, 10)
            if (data.success) {
                setPosts(data.posts || [])
                setTotalPages(data.totalPages || 1)
                setTotal(data.total || 0)
            }
        } catch {
            toast.error('ব্লগ পোস্ট লোড করতে ব্যর্থ')
        } finally {
            setIsLoading(false)
        }
    }, [id, currentPage])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (selectedImages.length + files.length > 10) {
            toast.error('সর্বোচ্চ ১০টি ছবি আপলোড করা যাবে')
            return
        }
        const newImages = [...selectedImages, ...files]
        setSelectedImages(newImages)

        // Generate previews
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setImagePreviews(prev => [...prev, ...newPreviews])
    }

    const removeImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index])
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const handleCreate = async () => {
        if (!title.trim()) {
            toast.error('শিরোনাম লিখুন')
            return
        }
        if (!content.trim()) {
            toast.error('বিষয়বস্তু লিখুন')
            return
        }

        setIsCreating(true)
        try {
            const formData = new FormData()
            formData.append('title', title.trim())
            formData.append('content', content.trim())
            selectedImages.forEach(img => formData.append('blogImages', img))

            const result = await createBlogPost(id as string, formData)
            if (result.success) {
                toast.success('ব্লগ পোস্ট প্রকাশিত হয়েছে!')
                setTitle('')
                setContent('')
                setSelectedImages([])
                imagePreviews.forEach(p => URL.revokeObjectURL(p))
                setImagePreviews([])
                setShowCreateForm(false)
                setCurrentPage(1)
                await fetchPosts()
            } else {
                toast.error(result.message || 'পোস্ট তৈরি করতে ব্যর্থ')
            }
        } catch {
            toast.error('সার্ভার ত্রুটি')
        } finally {
            setIsCreating(false)
        }
    }

    const handleDelete = async (postId: string) => {
        if (!confirm('আপনি কি এই পোস্টটি মুছতে চান?')) return
        setDeletingId(postId)
        try {
            const result = await deleteBlogPost(postId)
            if (result.success) {
                toast.success('পোস্ট মুছে ফেলা হয়েছে')
                await fetchPosts()
            } else {
                toast.error(result.message || 'মুছতে ব্যর্থ')
            }
        } catch {
            toast.error('সার্ভার ত্রুটি')
        } finally {
            setDeletingId(null)
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('bn-BD', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    }

    return (
        <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaBlog className="text-red-500" />
                        ব্লগ পোস্ট
                    </h1>
                    <p className="text-gray-500 mt-1">আপনার সংগঠনের কার্যক্রম শেয়ার করুন ({total} টি পোস্ট)</p>
                </div>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    {showCreateForm ? <FaTimes /> : <FaPlus />}
                    {showCreateForm ? 'বাতিল' : 'নতুন পোস্ট'}
                </button>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">নতুন ব্লগ পোস্ট তৈরি করুন</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="ব্লগ পোস্টের শিরোনাম লিখুন..."
                                maxLength={200}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">বিষয়বস্তু *</label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="আপনার কার্যক্রম সম্পর্কে বিস্তারিত লিখুন..."
                                rows={8}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ছবি সংযুক্ত করুন (সর্বোচ্চ ১০টি)
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {imagePreviews.map((preview, idx) => (
                                    <div key={idx} className="relative w-24 h-24 group">
                                        <Image
                                            src={preview}
                                            alt={`Preview ${idx + 1}`}
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                                {selectedImages.length < 10 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors"
                                    >
                                        <FaImage className="text-xl mb-1" />
                                        <span className="text-xs">ছবি যোগ</span>
                                    </button>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <p className="text-xs text-gray-400 mt-2">ছবি স্বয়ংক্রিয়ভাবে compress হয়ে আপলোড হবে</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleCreate}
                                disabled={isCreating}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isCreating ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                                {isCreating ? 'প্রকাশ করা হচ্ছে...' : 'প্রকাশ করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Posts List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                    <FaBlog className="text-gray-300 text-5xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">এখনো কোনো ব্লগ পোস্ট নেই</p>
                    <p className="text-gray-400 text-sm mt-1">আপনার সংগঠনের কার্যক্রম শেয়ার করতে প্রথম পোস্ট তৈরি করুন</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5">
                                {/* Author & Meta */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {post.authorId?.profileImageUrl ? (
                                            <Image
                                                src={post.authorId.profileImageUrl}
                                                alt={post.authorId.fullName}
                                                width={36}
                                                height={36}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                                                {post.authorId?.fullName?.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{post.authorId?.fullName}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <FaCalendarAlt className="text-[10px]" />
                                                {formatDate(post.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/blog/${post._id}`}
                                            target="_blank"
                                            className="text-gray-400 hover:text-blue-500 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                            title="দেখুন"
                                        >
                                            <FaEye />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            disabled={deletingId === post._id}
                                            className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            title="মুছুন"
                                        >
                                            {deletingId === post._id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                        </button>
                                    </div>
                                </div>

                                {/* Title & Content */}
                                <Link href={`/blog/${post._id}`} target="_blank">
                                    <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                    {post.content}
                                </p>

                                {/* Images preview */}
                                {post.images && post.images.length > 0 && (
                                    <div className="flex gap-2 mb-3 overflow-x-auto">
                                        {post.images.slice(0, 4).map((img, idx) => (
                                            <div key={idx} className="relative flex-shrink-0">
                                                <Image
                                                    src={img}
                                                    alt={`Image ${idx + 1}`}
                                                    width={120}
                                                    height={80}
                                                    className="w-[120px] h-[80px] object-cover rounded-lg"
                                                />
                                                {idx === 3 && post.images.length > 4 && (
                                                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-bold">
                                                        +{post.images.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <FaCommentAlt className="text-xs" /> {post.commentCount} মন্তব্য
                                    </span>
                                    {post.images.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <FaImage className="text-xs" /> {post.images.length} ছবি
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                        <FaChevronLeft />
                    </button>
                    <span className="text-sm text-gray-600 px-4">
                        পৃষ্ঠা {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}

export default OrgBlogPage
