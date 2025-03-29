import { User } from '@/lib/types/userType'
import PersonalInformation from './PersonalInformation'
import Achievements from './Achievements'

interface ProfileOverviewProps {
  userProfile: User;
}

const ProfileOverview = ({ userProfile }: ProfileOverviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <PersonalInformation userProfile={userProfile} />
      <Achievements userProfile={userProfile} />
    </div>
  )
}

export default ProfileOverview 