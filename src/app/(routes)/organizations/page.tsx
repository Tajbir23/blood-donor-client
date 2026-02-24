
import { verifyJwt } from "@/app/actions/authentication";
import Organizations from "./components/Organizations"
import { Metadata } from 'next'
import decodedJwtType from "@/lib/types/decodedJwtType";

// Add this line to make the page dynamic
export const dynamic = 'force-dynamic'

interface Organization {
  organizationName: string;
  organizationType: string;
  description: string;
  availableBloodGroups: string[];
  hasBloodBank: boolean;
  providesEmergencyBlood: boolean;
  districtId: string;
  thanaId: string;
}

const ITEMS_PER_PAGE = 9;

async function getOrganizations() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/organizations?page=1&limit=${ITEMS_PER_PAGE}`,
      {
        signal: controller.signal,
        next: { revalidate: 60 } // Revalidate every minute
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('Failed to fetch organizations');
    }

    const data = await res.json();
    return {
      organizations: data.organizations || [],
      totalOrganizations: data.totalOrganizations || 0
    };
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return {
      organizations: [],
      totalOrganizations: 0
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/organizations`,
      {
        signal: controller.signal,
        next: { revalidate: 60 }
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('Failed to fetch organizations for metadata');
    }

    const data = await res.json();
    const organizations: Organization[] = data.organizations || [];
    
    const totalOrganizations = organizations.length;
    const bloodBankCount = organizations.filter(org => org.hasBloodBank).length;
    const emergencyBloodCount = organizations.filter(org => org.providesEmergencyBlood).length;
    const allBloodGroups = [...new Set(organizations.flatMap(org => org.availableBloodGroups))];
    
    const title = `${totalOrganizations}টি রক্তদাতা সংগঠন | LifeDrop`;
    const description = `বাংলাদেশে ${totalOrganizations}টি রক্তদাতা সংগঠন রয়েছে। ${bloodBankCount}টি রক্তের ব্যাংক এবং ${emergencyBloodCount}টি জরুরি রক্ত সরবরাহকারী সংগঠন। উপলব্ধ রক্তের গ্রুপ: ${allBloodGroups.join(', ')}।`;

    return {
      title,
      description,
      keywords: `রক্তদাতা সংগঠন, রক্তের ব্যাংক, এনজিও, হাসপাতাল, জরুরি রক্ত, ${allBloodGroups.join(', ')}, ${organizations.map(org => org.organizationType).join(', ')}`,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'bn_BD',
        siteName: 'LifeDrop',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: 'https://blood-donor.vercel.app/organizations',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Organizations | LifeDrop',
      description: 'Find and join blood donation organizations',
    };
  }
}

const page = async () => {
  try {
    const [initialData, user] = await Promise.all([
      getOrganizations(),
      verifyJwt(false) as Promise<decodedJwtType>
    ]);
    
    return (
      <Organizations decodedUser={user} initialData={initialData} />
    );
  } catch (error) {
    console.error('Error in organizations page:', error);
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="font-serif text-xl font-bold text-stone-800 mb-2">লোড করতে সমস্যা হয়েছে</h1>
          <p className="text-stone-500 text-sm">দয়া করে পেজটি রিফ্রেশ করুন অথবা পরে আবার চেষ্টা করুন।</p>
        </div>
      </div>
    );
  }
}

export default page;
