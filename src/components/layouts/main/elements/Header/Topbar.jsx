import clsx from 'clsx'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {HeaderNotificationsMenu} from './menus/HeaderNotificationsMenu'
import {HeaderUserMenu} from './menus/HeaderUserMenu'
import {ThemeModeSwitcher} from './theme-mode/ThemeModeSwitcher'
import {HeaderNotifications} from './notifications/HeaderNotifications'
import {HeaderUser} from './user/HeaderUser'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const itemClass = 'ms-1 ms-lg-3',
  btnClass = 'btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px',
  userAvatarClass = 'symbol-30px symbol-md-40px'

const Topbar = () => {
  return (
    <div className='app-navbar flex-shrink-0'>
      {/* begin::Notifications */}
      <div className='app-navbar-item ms-5'>
        <HeaderNotifications toggleBtnClass='btn-color-gray-700 btn-active-color-primary w-40px h-40px' />
      </div>
      {/* end::Notifications */}
      <div className='app-navbar-item ms-5'>
        <ThemeModeSwitcher toggleBtnClass='btn-color-gray-700 btn-active-color-primary w-40px h-40px' />
      </div>
      {/* end:: Notifications */}
      {/* begin::User menu */}
      <div className='app-navbar-item ms-5' id='kt_header_user_menu_toggle'>
        <HeaderUser />
      </div>
      {/* end::User menu */}
    </div>
  )
}

export {Topbar}
