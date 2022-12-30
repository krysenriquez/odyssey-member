import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CodesListWrapper} from '../components/CashoutsList/CashoutsListWrapper'

const CodesRoutes = () => {
  const intl = useIntl()

  const codesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'CASHOUTS'}),
      path: '/codes',
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
            <PageTitle breadcrumbs={codesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'CASHOUTS'})}
            </PageTitle>
            <CodesListWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default CodesRoutes
