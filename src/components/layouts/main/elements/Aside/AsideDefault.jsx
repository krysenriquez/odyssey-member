import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {AsideMenuInfo} from './AsideMenuInfo'
import {AsideMenuUpgrade} from './AsideMenuUpgrade'
import {AsideMenuProgress} from './AsideMenuProgress'
import {AsideMenuStats} from './AsideMenuStats'
import {AsideMenu} from './AsideMenu'
import {AsideMenuFranchise} from './AsideMenuFranchise'
import {WalletProvider} from '@/features/wallets/stores/WalletProvider'
import {ActivityProvider} from '@/features/activities/stores/ActivityProvider'

const AsideDefault = () => {
  const {classes} = useLayout()
  const {mode} = useThemeMode()
  return (
    <>
      <div
        id='kt_app_sidebar'
        className='app-sidebar flex-column'
        data-drawer='true'
        data-drawer-name='app-sidebar'
        data-drawer-activate='{default: true, lg: false}'
        data-drawer-overlay='true'
        data-drawer-width='275px'
        data-drawer-direction='start'
        data-drawer-toggle='#kt_app_sidebar_toggle'
      >
        <div className='app-sidebar-wrapper py-8 py-lg-10' id='kt_app_sidebar_wrapper'>
          <div
            id='kt_app_sidebar_nav_wrapper'
            className='d-flex flex-column px-8 px-lg-10 hover-scroll-y'
            data-scroll='true'
            data-scroll-activate='true'
            data-scroll-max-height='auto'
            data-scroll-dependencies="{default: false, lg: '#kt_app_header'}"
            data-scroll-wrappers='#kt_app_sidebar, #kt_app_sidebar_wrapper'
            data-scroll-offset="{default: '10px', lg: '40px'}"
          >
            <AsideMenuInfo />
            <AsideMenuUpgrade />
            <WalletProvider>
              <AsideMenuStats />
            </WalletProvider>
            <ActivityProvider>
              <AsideMenuProgress />
            </ActivityProvider>
            <AsideMenu />
            <AsideMenuFranchise />
          </div>
        </div>
      </div>
    </>
  )
}

export {AsideDefault}
