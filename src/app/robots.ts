import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/organization_dashboard/', '/admin/', '/dashboard/'],
    },
    sitemap: 'https://blood-donor-bangladesh.vercel.app/sitemap.xml',
  };
}