export const dynamic = 'force-static'; // Cache UI as static
export const revalidate = 86400;

import Profile from "./Profile"


const page = () => {
  return (
    <div>
      <Profile />
    </div>
  )
}

export default page
