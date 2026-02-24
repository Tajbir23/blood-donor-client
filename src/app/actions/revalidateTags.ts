'use server'

import { revalidateTag } from "next/cache"


const revalidateTags = async (tag: string) => {
  
 revalidateTag(tag, {})
  
}

export default revalidateTags

