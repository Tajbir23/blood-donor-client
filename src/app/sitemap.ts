import { MetadataRoute } from 'next';

// Define valid changeFrequency values
type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blood-donor-bangladesh.vercel.app';
  
  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${baseUrl}/blood-donation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/organizations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.3,
    },
  ];

  // Return static routes only - we'll add dynamic routes in a future update when API is fixed
  return routes;
  
  /* 
  // Keep this commented out until API is fixed
  // Dynamic routes from organizations
  let organizationRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.blood-donor-bangladesh.vercel.app';
    const response = await fetch(`${apiUrl}/api/organizations/all`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const organizations = await response.json();
    if (organizations?.organizations?.length > 0) {
      organizationRoutes = organizations.organizations.map((org: Organization) => {
        return {
          url: `${baseUrl}/organization/${org._id}`,
          lastModified: org.updatedAt || org.createdAt || new Date(),
          changeFrequency: 'weekly' as ChangeFrequency,
          priority: 0.6,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching organizations for sitemap:", error);
  }

  return [...routes, ...organizationRoutes];
  */
} 