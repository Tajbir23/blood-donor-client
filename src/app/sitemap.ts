import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://blooddonation-rangpur.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://blooddonation-rangpur.com/find-blood',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://blooddonation-rangpur.com/register',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // অন্যান্য পেজ যোগ করুন...
  ];
} 