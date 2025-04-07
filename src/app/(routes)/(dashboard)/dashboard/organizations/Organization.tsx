'use client'

import { getAllOrganizations } from "@/app/actions/administrator/system/organization"
import OrganizationCard from "@/components/dashboard/dashboard/organizations/OrganizationCard"
import organizationType from "@/lib/types/organizationType"
import { User } from "@/lib/types/userType"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { useEffect, useState, useRef } from "react"

interface UserDataType {
    user: User
}

const Organization = () => {
    const queryClient = useQueryClient()
    const [user, setUser] = useState<UserDataType>()
    const [organizations, setOrganizations] = useState<organizationType[]>([])
    const [orgType, setOrgType] = useState<string>("active")
    const [searchInput, setSearchInput] = useState<string>("")
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)
    
    // Fetch user data once when component mounts
    useEffect(() => {
        // Immediately try to get user data
        const userData = queryClient.getQueryData(['user'])
        if (userData) {
            setUser(userData as UserDataType)
            return; // Exit early if we have data
        }
        
        // If no data, set up a single timeout to try again
        const timer = setTimeout(() => {
            const retryUserData = queryClient.getQueryData(['user'])
            if (retryUserData) {
                setUser(retryUserData as UserDataType)
            }
        }, 1000)
        
        // Clean up timeout
        return () => clearTimeout(timer)
    }, [queryClient])
    
    // Use TanStack Query for caching organizations (no search param in the key)
    const { data: cachedOrganizationsData, isLoading: isLoadingCache, refetch } = useQuery({
        queryKey: ['admin_organizations', page, orgType],
        queryFn: async () => {
            // Only fetch with empty search to maintain cache
            const result = await getAllOrganizations("", page, orgType);
            if (!result) throw new Error('Failed to fetch organizations');
            return result;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!user && !isSearchActive, // Only enabled when not searching
        refetchOnWindowFocus: false,
    })
    
    // Update local state from query cache when not searching
    useEffect(() => {
        if (cachedOrganizationsData && !isSearchActive) {
            setOrganizations(cachedOrganizationsData.organizations || []);
            setTotalPages(cachedOrganizationsData.totalPages || 0);
        }
    }, [cachedOrganizationsData, isSearchActive]);

    // Direct API call for search functionality
    const searchOrganizations = async (search: string, currentPage: number, status: string) => {
        setIsLoadingSearch(true);
        try {
            const result = await getAllOrganizations(search, currentPage, status);
            if (result) {
                setOrganizations(result.organizations || []);
                setTotalPages(result.totalPages || 0);
                setIsSearchActive(!!search.trim()); // Only set search active if there's a non-empty search
            }
        } catch (error) {
            console.error('Failed to search organizations:', error);
            setOrganizations([]);
            setTotalPages(0);
        } finally {
            setIsLoadingSearch(false);
        }
    };
    
    // Handle search input change
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    
    // Handle search form submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // If search is empty, treat it as clearing the search
        if (!searchInput.trim()) {
            clearSearch();
            return;
        }
        
        setPage(1); // Reset page when searching
        searchOrganizations(searchInput, 1, orgType);
    };
    
    // Clear search
    const clearSearch = () => {
        setSearchInput("");
        setPage(1);
        setIsSearchActive(false);
        // Return to cached data
        if (cachedOrganizationsData) {
            setOrganizations(cachedOrganizationsData.organizations || []);
            setTotalPages(cachedOrganizationsData.totalPages || 0);
        } else {
            refetch();
        }
    };

    const handleTabChange = (type: string) => {
        setOrgType(type);
        setPage(1); // Reset page when changing tabs
        
        if (isSearchActive) {
            // If searching, perform search with new tab
            searchOrganizations(searchInput, 1, type);
        }
        // Otherwise, the query hook will handle the change
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        
        if (isSearchActive) {
            // If searching, perform search with new page
            searchOrganizations(searchInput, newPage, orgType);
        }
        // Otherwise, the query hook will handle the change
    };

    // Callback for successful actions
    const refreshData = () => {
        if (isSearchActive) {
            searchOrganizations(searchInput, page, orgType);
        } else {
            refetch();
        }
    };

    const isLoading = isLoadingCache || isLoadingSearch;

    if(!user) return <div className="flex justify-center items-center h-40">Loading...</div>
    
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Organizations</h2>
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Search organizations..."
                        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
                {isSearchActive && (
                    <div className="mt-2 text-sm text-gray-600">
                        Showing results for: <span className="font-medium">{searchInput}</span>
                        <button 
                            type="button"
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            onClick={clearSearch}
                        >
                            Clear
                        </button>
                    </div>
                )}
            </form>
            
            {/* Tabs */}
            <div className="flex mb-6 border-b">
                <button 
                    className={`px-4 py-2 font-medium ${orgType === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('active')}
                >
                    Active
                </button>
                <button 
                    className={`px-4 py-2 font-medium ${orgType === 'inactive' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('inactive')}
                >
                    Inactive
                </button>
                <button 
                    className={`px-4 py-2 font-medium ${orgType === 'ban' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleTabChange('ban')}
                >
                    Banned
                </button>
            </div>
            
            {/* Organization Cards */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">Loading organizations...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organizations && organizations.length > 0 ? (
                        organizations.map((organization) => (
                            <OrganizationCard 
                                key={organization._id} 
                                organization={organization} 
                                userRole={user.user.role} 
                                orgStatus={orgType}
                                onActionSuccess={refreshData}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No {orgType} organizations found {isSearchActive && `for "${searchInput}"`}
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <nav className="flex items-center">
                        <button 
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`px-3 py-1 mx-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                        >
                            Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 mx-1 rounded ${page === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button 
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`px-3 py-1 mx-1 rounded ${page === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default Organization