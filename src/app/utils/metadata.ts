import { generateMetadata as baseGenerateMetadata } from '../config/metadata'

export function generateAuthMetadata(title: string, description: string) {
  return baseGenerateMetadata({
    title,
    description,
    path: `/auth/${title.toLowerCase().replace(/\s+/g, '-')}`,
    noIndex: true,
  })
}

export function generateProfileMetadata(title: string, description: string) {
  return baseGenerateMetadata({
    title,
    description,
    path: `/profile/${title.toLowerCase().replace(/\s+/g, '-')}`,
    noIndex: true,
  })
}

export function generatePublicMetadata(title: string, description: string, path: string) {
  return baseGenerateMetadata({
    title,
    description,
    path,
  })
}

export function generateDynamicMetadata(
  title: string,
  description: string,
  path: string,
  noIndex = false
) {
  return baseGenerateMetadata({
    title,
    description,
    path,
    noIndex,
  })
} 