import { verifyJwt } from "@/app/actions/authentication"
import MemberTabs from "./components/MemberTabs"
import { JwtPayload } from "jsonwebtoken"

const page = async() => {
  const decodedUser = await verifyJwt()

  
  return (
    <div>
        <MemberTabs userId={(decodedUser as JwtPayload & { _id: string })._id} />
    </div>
  )
}

export default page