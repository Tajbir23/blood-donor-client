"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts } from '@/app/actions/blog'

interface BlogPost {
    _id: string
    title: string
    content: string
    images: string[]
    authorId: { _id: string; fullName: string; profileImageUrl?: string }
    organizationId: { _id: string; organizationName: string; logoImage?: string }
    commentCount: number
    createdAt: string
}

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const fetchPosts = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getAllBlogPosts(currentPage, 12, searchQuery)
            if (data.success) {
                setPosts(data.posts || [])
                setTotalPages(data.totalPages || 1)
                setTotal(data.total || 0)
            }
        } catch {
            console.error('Blog fetch failed')
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, searchQuery])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1)
        setSearchQuery(searchInput.trim())
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('bn-BD', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    }

    const getExcerpt = (content: string, maxLen = 150) => {
        if (content.length <= maxLen) return content
        return content.slice(0, maxLen) + '...'
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero */}
            <div className="bg-red-700 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-300 mb-2">সংগঠনের কার্যক্রম</p>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">ব্লগ</h1>
                    <p className="text-red-100 text-sm max-w-xl mx-auto">
                        রক্তদান সংগঠনগুলোর কার্যক্রম, অভিজ্ঞতা এবং গল্প পড়ুন
                    </p>
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto flex gap-2">
                        <div className="flex-1 relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="ব্লগ খুঁজুন..."
                                className="w-full pl-10 pr-4 py-2.5 rounded border-0 text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                        </div>
                        <button type="submit" className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap">
                            খুঁজুন
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {searchQuery && (
                    <div className="mb-6 flex items-center gap-2 text-stone-600 text-sm">
                        <span>&ldquo;{searchQuery}&rdquo; এর জন্য {total} টি ফলাফল পাওয়া গেছে</span>
                        <button
                            onClick={() => { setSearchQuery(''); setSearchInput(''); setCurrentPage(1) }}
                            className="text-red-700 hover:underline"
                        >
                            মুছুন
                        </button>
                    </div>
                )}

                {/* Posts Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="card-classic h-80 animate-pulse" />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <svg className="w-16 h-16 text-stone-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
                        </svg>
                        <p className="text-stone-500">
                            {searchQuery ? 'কোনো ব্লগ পোস্ট পাওয়া যায়নি' : 'এখনো কোনো ব্লগ পোস্ট প্রকাশিত হয়নি'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <Link
                                key={post._id}
                                href={`/blog/${post._id}`}
                                className="card-classic overflow-hidden group"
                            >
                                {/* Featured Image */}
                                {post.images && post.images.length > 0 ? (
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.images[0]}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {post.images.length > 1 && (
                                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                                                </svg>
                                                {post.images.length}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-48 bg-stone-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-stone-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
                                        </svg>
                                    </div>
                                )}

                                <div className="p-5">
                                    {/* Org Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        {post.organizationId?.logoImage ? (
                                            <Image
                                                src={post.organizationId.logoImage}
                                                alt={post.organizationId.organizationName}
                                                width={20}
                                                height={20}
                                                className="w-5 h-5 rounded-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                                            </svg>
                                        )}
                                        <span className="text-xs text-stone-500 truncate">
                                            {post.organizationId?.organizationName}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-base font-bold text-stone-800 group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm line-clamp-3 mb-4">
                                        {getExcerpt(post.content)}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-100">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(post.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            {post.commentCount}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-4 py-2 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            পূর্ববর্তী
                        </button>
                        <span className="text-sm text-stone-500">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-4 py-2 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors"
                        >
                            পরবর্তী
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogPage
