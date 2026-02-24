"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { getBlogPostById, addBlogComment } from '@/app/actions/blog'
import {
    FaBlog, FaCalendarAlt, FaCommentAlt, FaBuilding,
    FaArrowLeft, FaSpinner, FaPaperPlane, FaUser
} from 'react-icons/fa'

interface Author {
    _id: string
    fullName: string
    profileImageUrl?: string
}

interface Organization {
    _id: string
    organizationName: string
    logoImage?: string
}

interface Comment {
    _id: string
    userId: Author
    content: string
    createdAt: string
}

interface BlogPost {
    _id: string
    title: string
    content: string
    images: string[]
    authorId: Author
    organizationId: Organization
    commentCount: number
    createdAt: string
}

const BlogDetailPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const [post, setPost] = useState<BlogPost | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentText, setCommentText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const fetchPost = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        try {
            const data = await getBlogPostById(id as string)
            if (data.success) {
                setPost(data.post)
                setComments(data.comments || [])
            } else {
                toast.error('পোস্ট খুঁজে পাওয়া যায়নি')
                router.push('/blog')
            }
        } catch {
            toast.error('লোড করতে ব্যর্থ')
        } finally {
            setIsLoading(false)
        }
    }, [id, router])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    const handleComment = async () => {
        if (!commentText.trim()) {
            toast.error('মন্তব্য লিখুন')
            return
        }
        setIsSubmitting(true)
        try {
            const result = await addBlogComment(id as string, commentText.trim())
            if (result.success) {
                setComments(prev => [result.comment, ...prev])
                setCommentText('')
                if (post) setPost({ ...post, commentCount: post.commentCount + 1 })
                toast.success('মন্তব্য প্রকাশিত')
            } else {
                toast.error(result.message || 'মন্তব্য করতে ব্যর্থ। লগইন করা আছে কি?')
            }
        } catch {
            toast.error('মন্তব্য করতে লগইন করুন')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('bn-BD', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    }

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('bn-BD', {
            hour: '2-digit', minute: '2-digit'
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <FaSpinner className="text-red-500 text-3xl animate-spin" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
                <FaBlog className="text-gray-300 text-6xl" />
                <p className="text-gray-500 text-lg">পোস্ট খুঁজে পাওয়া যায়নি</p>
                <Link href="/blog" className="text-red-500 hover:underline flex items-center gap-2">
                    <FaArrowLeft /> ব্লগে ফিরে যান
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Image Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <Image
                        src={selectedImage}
                        alt="Full size"
                        width={1200}
                        height={800}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    />
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 mb-6 transition-colors">
                    <FaArrowLeft className="text-sm" /> ব্লগে ফিরে যান
                </Link>

                {/* Article */}
                <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-8">
                        {/* Organization */}
                        <Link
                            href={`/organizations/${post.organizationId?._id}`}
                            className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm px-3 py-1.5 rounded-full mb-4 hover:bg-red-100 transition-colors"
                        >
                            {post.organizationId?.logoImage ? (
                                <Image
                                    src={post.organizationId.logoImage}
                                    alt={post.organizationId.organizationName}
                                    width={18}
                                    height={18}
                                    className="w-[18px] h-[18px] rounded-full object-cover"
                                />
                            ) : (
                                <FaBuilding className="text-xs" />
                            )}
                            {post.organizationId?.organizationName}
                        </Link>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                            {post.title}
                        </h1>

                        {/* Author & Date */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                            {post.authorId?.profileImageUrl ? (
                                <Image
                                    src={post.authorId.profileImageUrl}
                                    alt={post.authorId.fullName}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <FaUser />
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-800">{post.authorId?.fullName}</p>
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <FaCalendarAlt className="text-xs" />
                                    {formatDate(post.createdAt)} • {formatTime(post.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {post.content}
                        </div>

                        {/* Images Gallery */}
                        {post.images && post.images.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                                    📷 ছবিসমূহ ({post.images.length})
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {post.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="relative aspect-[4/3] cursor-pointer group rounded-lg overflow-hidden"
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Photo ${idx + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Comments Section */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
                        <FaCommentAlt className="text-red-500" />
                        মন্তব্য ({post.commentCount})
                    </h2>

                    {/* Comment Input */}
                    <div className="mb-6">
                        <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="আপনার মন্তব্য লিখুন... (লগইন প্রয়োজন)"
                            rows={3}
                            maxLength={1000}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none text-sm"
                        />
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{commentText.length}/1000</span>
                            <button
                                onClick={handleComment}
                                disabled={isSubmitting || !commentText.trim()}
                                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                                {isSubmitting ? 'পাঠানো হচ্ছে...' : 'মন্তব্য করুন'}
                            </button>
                        </div>
                    </div>

                    {/* Comments List */}
                    {comments.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">
                            এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div key={comment._id} className="flex gap-3 p-4 rounded-lg bg-gray-50">
                                    {comment.userId?.profileImageUrl ? (
                                        <Image
                                            src={comment.userId.profileImageUrl}
                                            alt={comment.userId.fullName}
                                            width={36}
                                            height={36}
                                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 flex-shrink-0">
                                            <FaUser className="text-sm" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-gray-800">
                                                {comment.userId?.fullName}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogDetailPage
