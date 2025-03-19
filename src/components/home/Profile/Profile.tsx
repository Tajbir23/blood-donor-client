import Link from "next/link";
import { FaComment, FaUser } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex space-x-6 px-3 py-2">
      <Link href="/chat" passHref>
        <div className="text-gray-700 hover:text-red-600">
          <FaComment className="h-6 w-6" title="Chat" />
        </div>
      </Link>
      <Link href="/profile" passHref>
        <div className="text-gray-700 hover:text-red-600">
          <FaUser className="h-6 w-6" title="Profile" />
        </div>
      </Link>
    </div>
  );
};

export default Profile;
