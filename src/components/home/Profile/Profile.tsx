import { User } from "@/lib/types/userType";
import Image from "next/image";
import Link from "next/link";
import { FaComment } from "react-icons/fa";

interface ProfileProps {
  userData: User; // Ensure this matches your User type
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  
  return (
    <div className="flex space-x-6 px-3 py-2">
      <Link href="/chat" passHref>
        <div className="text-gray-700 hover:text-red-600">
          <FaComment className="h-6 w-6" title="Chat" />
        </div>
      </Link>
      <Link href="/profile" passHref>
        <div className="text-gray-700 hover:text-red-600">
          <Image height={100} width={100} className="h-6 w-6 rounded-full" src={`${process.env.NEXT_PUBLIC_API_URL}${userData?.profileImageUrl}`} alt="profile" />
          {/* <FaUser className="h-6 w-6" title="Profile" /> */}
        </div>
      </Link>
    </div>
  );
};

export default Profile;
