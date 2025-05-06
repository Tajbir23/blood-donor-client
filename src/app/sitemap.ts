import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blood-donor-bangladesh.vercel.app';
  
  // Define static routes with their properties
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blood-donation`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/organizations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Fetch dynamic routes where possible
  try {
    // Example: Fetch blog posts
    // You may need to adjust this based on your actual API structure
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/all`);
    let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
    
    if (blogResponse.ok) {
      const blogPosts = await blogResponse.json();
      dynamicBlogRoutes = blogPosts.blogs?.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug || post._id}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })) || [];
    }
    
    // Example: Fetch organization pages
    const orgsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/all`);
    let dynamicOrgRoutes: MetadataRoute.Sitemap = [];
    
    if (orgsResponse.ok) {
      const orgs = await orgsResponse.json();
      dynamicOrgRoutes = orgs.organizations?.map((org: any) => ({
        url: `${baseUrl}/organization/${org._id}`,
        lastModified: new Date(org.updatedAt || org.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })) || [];
    }
    
    // Combine all routes
    return [...staticRoutes, ...dynamicBlogRoutes, ...dynamicOrgRoutes];
    
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
    // Fallback to static routes only if there's an error
    return staticRoutes;
  }
}