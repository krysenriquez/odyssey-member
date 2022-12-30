import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'

const PrivateRoutes = () => {
  const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Genealogy = lazy(() => import('@/features/genealogy/routes'))
  const Codes = lazy(() => import('@/features/codes/routes'))
  const Cashouts = lazy(() => import('@/features/cashouts/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {
          path: 'dashboard/*',
          element: (
            <SuspensedView>
              <Dashboard />
            </SuspensedView>
          ),
        },
        {
          path: 'genealogy/*',
          element: (
            <SuspensedView>
              <Genealogy />
            </SuspensedView>
          ),
        },
        {
          path: 'codes/*',
          element: (
            <SuspensedView>
              <Codes />
            </SuspensedView>
          ),
        },
        {
          path: 'cashouts/*',
          element: (
            <SuspensedView>
              <Cashouts />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes
