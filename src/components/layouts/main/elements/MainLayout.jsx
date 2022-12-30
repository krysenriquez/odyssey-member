import {useEffect} from 'react'
import clsx from 'clsx'
import {Outlet, useLocation} from 'react-router-dom'
import {PageDataProvider} from '@/providers/PageDataProvider'
// Layout Components
import {AsideDefault} from './Aside/AsideDefault'
import {Footer} from './Footer/Footer'
import {HeaderWrapper} from './Header/HeaderWrapper'
import {Content} from './Content/Content'
import {ScrollTop} from './Content/ScrollTop'
import {MenuComponent} from '@/components/assets/components'
import {Toolbar} from './Toolbar/Toolbar'
import {useLayout} from '@/providers/layout/LayoutProvider'

const MainLayout = () => {
  const location = useLocation()
  const {classes} = useLayout()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root'>
        <div className='app-page d-flex flex-column flex-column-fluid'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid'>
            <div
              className={clsx(
                'app-container d-flex flex-row-fluid',
                classes.contentContainer.join(' ')
              )}
            >
              <AsideDefault />
              <div className='app-main flex-column flex-row-fluid ms-lg-8'>
                <Content>
                  <Toolbar />
                  <Outlet />
                </Content>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MainLayout}
