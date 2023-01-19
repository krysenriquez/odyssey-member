import {useProfileInfoQueryData} from '../../stores/ProfileInfoQueryProvider'
import {ProfileForm} from './components/ProfileForm'
import {ChangeUsernameForm} from './components/ChangeUsernameForm'
import {ChangePasswordForm} from './components/ChangePasswordForm'
import {ChangeEmailAddressForm} from './components/ChangeEmaillAddressForm'
import {useAuth} from '@/providers/AuthProvider'

export const ProfileInfoPage = () => {
  const profile = useProfileInfoQueryData()
  const {currentUser} = useAuth()

  return (
    <>
      <ProfileForm profile={profile} />
      {currentUser.ccu | currentUser.cce | currentUser.ccp ? (
        <div className='card mb-5 mb-xl-10'>
          <div className='card-header border-0'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Authentication Method</h3>
            </div>
          </div>
          <div className='card-body border-top p-9'>
            {currentUser.ccu ? (
              <>
                <ChangeUsernameForm />
                <div className='separator separator-dashed my-6' />
              </>
            ) : (
              <></>
            )}
            {currentUser.cce ? (
              <>
                <ChangeEmailAddressForm />
                <div className='separator separator-dashed my-6' />
              </>
            ) : (
              <></>
            )}
            {currentUser.ccp ? (
              <>
                <ChangePasswordForm />
                <div className='separator separator-dashed my-6' />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
