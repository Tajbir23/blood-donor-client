import { Metadata } from 'next'
import { getPublicOrganizationDetails } from '@/app/actions/organization'
import { getLocationString, getDistrictName, getThanaName } from '@/lib/utils/locationResolver'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
    FaGlobe, FaUsers, FaUserTie, FaTint, FaArrowLeft, FaIdCard,
    FaInfoCircle, FaHospital, FaAmbulance, FaClock
} from 'react-icons/fa'
import JoinButton from './JoinButton'

interface Props {
    params: Promise<{ id: string }>
}

// Organization type to Bengali
const getOrgTypeBangla = (type: string): string => {
    switch (type) {
        case 'hospital': return 'হাসপাতাল'
        case 'bloodBank': return 'ব্লাড ব্যাংক'
        case 'clinic': return 'ক্লিনিক'
        case 'ngo': return 'এনজিও'
        case 'volunteer': return 'স্বেচ্ছাসেবী সংগঠন'
        case 'other': return 'অন্যান্য'
        default: return type
    }
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const data = await getPublicOrganizationDetails(id)

    if (!data?.success || !data.organization) {
        return {
            title: 'প্রতিষ্ঠান খুঁজে পাওয়া যায়নি | LifeDrop',
            description: 'অনুরোধকৃত প্রতিষ্ঠানটি খুঁজে পাওয়া যায়নি।'
        }
    }

    const org = data.organization
    const location = getLocationString(org.districtId, org.thanaId)
    const bloodGroups = org.availableBloodGroups?.join(', ') || ''

    return {
        title: `${org.organizationName} | LifeDrop`,
        description: org.description
            ? `${org.organizationName} — ${org.description.slice(0, 150)}${location ? ` | ${location}` : ''}`
            : `${org.organizationName} — ${getOrgTypeBangla(org.organizationType)}${location ? `, ${location}` : ''}। উপলব্ধ রক্তের গ্রুপ: ${bloodGroups}`,
        openGraph: {
            title: org.organizationName,
            description: org.description?.slice(0, 200) || `${getOrgTypeBangla(org.organizationType)} — LifeDrop`,
            type: 'website',
            ...(org.logoImage && { images: [{ url: org.logoImage, width: 200, height: 200, alt: org.organizationName }] }),
        },
        keywords: [
            org.organizationName,
            getOrgTypeBangla(org.organizationType),
            'রক্তদান',
            'blood donation',
            ...(org.availableBloodGroups || []),
            ...(location ? [location] : []),
        ],
    }
}

export default async function OrganizationPage({ params }: Props) {
    const { id } = await params
    const data = await getPublicOrganizationDetails(id)

    if (!data?.success || !data.organization) {
        notFound()
    }

    const org = data.organization
    const districtName = getDistrictName(org.districtId)
    const thanaName = getThanaName(org.districtId, org.thanaId)

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Back */}
            <Link href="/organizations" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <FaArrowLeft className="mr-2" /> সকল প্রতিষ্ঠান
            </Link>

            {/* Hero Card */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Header */}
                <header className="bg-gradient-to-r from-red-600 to-red-700 p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                            {org.logoImage ? (
                                <Image
                                    src={org.logoImage}
                                    alt={org.organizationName}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            ) : (
                                <FaBuilding className="text-red-400 text-4xl" />
                            )}
                        </div>
                        <div className="text-white text-center sm:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold">{org.organizationName}</h1>
                            <p className="text-red-100 mt-1 text-lg">{getOrgTypeBangla(org.organizationType)}</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                                {org.registrationNumber && (
                                    <span className="inline-flex items-center gap-1 text-red-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                                        <FaIdCard /> {org.registrationNumber}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1 text-red-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                                    <FaCalendarAlt /> প্রতিষ্ঠিত: {org.establishmentYear}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                    <div className="py-5 text-center">
                        <FaUsers className="mx-auto text-blue-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.membersCount || 0}</div>
                        <div className="text-xs text-gray-500">সদস্য</div>
                    </div>
                    <div className="py-5 text-center">
                        <FaTint className="mx-auto text-red-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.availableBloodGroups?.length || 0}</div>
                        <div className="text-xs text-gray-500">রক্তের গ্রুপ</div>
                    </div>
                    <div className="py-5 text-center">
                        <FaHospital className="mx-auto text-green-500 text-xl mb-1" />
                        <div className="text-2xl font-bold text-gray-800">{org.hasBloodBank ? '✓' : '✗'}</div>
                        <div className="text-xs text-gray-500">ব্লাড ব্যাংক</div>
                    </div>
                </div>

                {/* Description */}
                {org.description && (
                    <section className="p-6 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <FaInfoCircle className="text-gray-400" /> পরিচিতি
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{org.description}</p>
                    </section>
                )}

                {/* Two-column detail grid */}
                <div className="grid md:grid-cols-2 gap-0 md:divide-x divide-gray-100">
                    {/* Contact */}
                    <section className="p-6 border-b md:border-b-0 border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">যোগাযোগ</h2>
                        <div className="space-y-3">
                            {org.email && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                    <a href={`mailto:${org.email}`} className="hover:text-red-600 transition-colors">{org.email}</a>
                                </div>
                            )}
                            {org.phone && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaPhone className="text-gray-400 flex-shrink-0" />
                                    <a href={`tel:${org.phone}`} className="hover:text-red-600 transition-colors">{org.phone}</a>
                                </div>
                            )}
                            {org.website && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <FaGlobe className="text-gray-400 flex-shrink-0" />
                                    <a href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                                       target="_blank" rel="noopener noreferrer"
                                       className="text-blue-600 hover:underline truncate">
                                        {org.website}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-start gap-3 text-gray-700">
                                <FaMapMarkerAlt className="text-gray-400 flex-shrink-0 mt-1" />
                                <div>
                                    <span>{org.address}</span>
                                    {(districtName || thanaName) && (
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {thanaName && `${thanaName}, `}{districtName || ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Representative */}
                    <section className="p-6">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">প্রতিনিধি</h2>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <FaUserTie className="text-red-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{org.representativeName}</p>
                                    <p className="text-sm text-gray-500">{org.representativePosition}</p>
                                </div>
                            </div>
                        </div>

                        {/* Owner */}
                        {org.owner && (
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">প্রতিষ্ঠাতা</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {org.owner.profileImage ? (
                                            <Image src={org.owner.profileImage} alt={org.owner.fullName} width={40} height={40} className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserTie className="text-blue-500 text-sm" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{org.owner.fullName}</p>
                                        {org.owner.bloodGroup && (
                                            <span className="text-xs text-red-600 font-medium">{org.owner.bloodGroup}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Services & Blood Groups */}
                <section className="p-6 border-t border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">সেবা সমূহ</h2>

                    <div className="flex flex-wrap gap-3 mb-5">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${org.hasBloodBank ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                            <FaHospital />
                            ব্লাড ব্যাংক {org.hasBloodBank ? '✓' : '✗'}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${org.providesEmergencyBlood ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                            <FaAmbulance />
                            জরুরি রক্ত সরবরাহ {org.providesEmergencyBlood ? '✓' : '✗'}
                        </div>
                    </div>

                    {org.availableBloodGroups && org.availableBloodGroups.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-500 mb-3">উপলব্ধ রক্তের গ্রুপ:</p>
                            <div className="flex flex-wrap gap-2">
                                {org.availableBloodGroups.map((group: string) => (
                                    <span key={group} className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-700 font-bold rounded-full text-sm border-2 border-red-200 shadow-sm">
                                        {group}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Footer: date + join */}
                <footer className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <FaClock />
                        <time dateTime={org.createdAt}>
                            প্রতিষ্ঠিত: {org.createdAt ? new Date(org.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                        </time>
                    </div>

                    <JoinButton organizationId={id} />
                </footer>
            </article>

            {/* JSON-LD structured data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: org.organizationName,
                        description: org.description,
                        email: org.email,
                        telephone: org.phone,
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: org.address,
                            addressLocality: districtName || '',
                            addressRegion: 'রংপুর বিভাগ',
                            addressCountry: 'BD'
                        },
                        ...(org.website && { url: org.website.startsWith('http') ? org.website : `https://${org.website}` }),
                        ...(org.logoImage && { logo: org.logoImage }),
                        foundingDate: org.establishmentYear,
                    })
                }}
            />
        </div>
    )
}