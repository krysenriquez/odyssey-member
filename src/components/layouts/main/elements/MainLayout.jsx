import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {PageDataProvider} from '@/providers/PageDataProvider'
// Layout Components
import {AsideDefault} from './Aside/AsideDefault'
import {Footer} from './Footer/Footer'
import {HeaderWrapper} from './Header/HeaderWrapper'
import {Toolbar} from './Toolbar/Toolbar'
import {Content} from './Content/Content'
import {ScrollTop} from './Content/ScrollTop'
import {MenuComponent} from '@/components/assets/components'
import clsx from 'clsx'
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
        <div className='page d-flex flex-row flex-column-fluid'>
          <AsideDefault />
          <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
            <HeaderWrapper />
            <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
              <Content>
                <Outlet />
              </Content>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MainLayout}
