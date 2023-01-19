import {useAccount} from '@/providers/AccountProvider'
import {ProfileInfoQueryProvider} from '../stores/ProfileInfoQueryProvider'
import {ProfileInfoPage} from '../components/Profile/ProfileInfoPage'

export const ProfileInfo = () => {
  const {currentAccount} = useAccount()

  if (!currentAccount) return null

  return (
    <ProfileInfoQueryProvider>
      <ProfileInfoPage />
    </ProfileInfoQueryProvider>
  )
}
