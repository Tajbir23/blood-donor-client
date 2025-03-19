import { Metadata } from 'next';
import Blogs from '@/components/home/Blogs';
import CallToAction from '@/components/home/CallToAction';
import FindBlood from '@/components/home/FindBlood';
import Hero from '@/components/home/Hero/Hero';
import OurServices from '@/components/home/OurServices';
import RegularDonor from '@/components/home/RegularDonor';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Blood Donation Service | Find Blood Donors Near You',
  description: 'Connect with blood donors in your area for emergency needs. Our platform helps you find the right blood type quickly and efficiently.',
  keywords: ['blood donation', 'find blood donors', 'blood bank', 'emergency blood'],
  openGraph: {
    title: 'Blood Donation Service | Find Blood Donors Near You',
    description: 'Connect with blood donors in your area for emergency needs.',
    type: 'website',
    url: 'https://yourwebsite.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blood Donation Service',
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 ">
      <Hero />
      <FindBlood />
      <OurServices />
      <Blogs />
      <RegularDonor />
      <CallToAction />
    </div>
  );
}
