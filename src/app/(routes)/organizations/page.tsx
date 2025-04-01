import { verifyJwt } from "@/app/actions/authentication";
import Organizations from "./components/Organizations"
import { Metadata } from 'next'
import decodedJwtType from "@/lib/types/decodedJwtType";

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

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organization/organizations`)
  const data = await res.json()
  const organizations: Organization[] = data.organizations || []
  
  const totalOrganizations = organizations.length
  const bloodBankCount = organizations.filter(org => org.hasBloodBank).length
  const emergencyBloodCount = organizations.filter(org => org.providesEmergencyBlood).length
  const allBloodGroups = [...new Set(organizations.flatMap(org => org.availableBloodGroups))]
  
  const title = `${totalOrganizations}টি রক্তদাতা সংগঠন | Blood Donor Organizations`
  const description = `বাংলাদেশে ${totalOrganizations}টি রক্তদাতা সংগঠন রয়েছে। ${bloodBankCount}টি রক্তের ব্যাংক এবং ${emergencyBloodCount}টি জরুরি রক্ত সরবরাহকারী সংগঠন। উপলব্ধ রক্তের গ্রুপ: ${allBloodGroups.join(', ')}।`

  return {
    title,
    description,
    keywords: `রক্তদাতা সংগঠন, রক্তের ব্যাংক, এনজিও, হাসপাতাল, জরুরি রক্ত, ${allBloodGroups.join(', ')}, ${organizations.map(org => org.organizationType).join(', ')}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'bn_BD',
      siteName: 'Blood Donor',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: 'https://blood-donor.vercel.app/organizations',
    },
  }
}

async function getOrganizations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organization/organizations`)
  const data = await res.json()
  return {
    organizations: data.organizations || [],
    totalOrganizations: data.totalOrganizations || 0
  }
}

const page = async () => {
  const initialData = await getOrganizations()
  const user = await verifyJwt(false) as decodedJwtType
  
  return (
    <div>
      <Organizations decodedUser={user} initialData={initialData} />
    </div>
  )
}

export default page
