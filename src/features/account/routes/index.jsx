import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {ProfileInfo} from './ProfileInfo'

const AccountsRoutes = () => {
  const intl = useIntl()

  const profileBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PROFILE'}),
      path: '/profile',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PROFILE'})}
            </PageTitle>
            <ProfileInfo />
          </>
        }
      />
    </Routes>
  )
}

export default AccountsRoutes
