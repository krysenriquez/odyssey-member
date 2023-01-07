/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <div className='col-6'>
        <AsideMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/general/home.svg'
          title={intl.formatMessage({id: 'DASHBOARD'})}
          fontIcon='bi-app-indicator'
        />
      </div>
      <div className='col-6'>
        <AsideMenuItem
          to='/genealogy'
          icon='/media/icons/duotune/general/home.svg'
          title={intl.formatMessage({id: 'GENEALOGY'})}
          fontIcon='bi-people-fill'
        />
      </div>
      <div className='col-6'>
        <AsideMenuItem
          to='/cashouts'
          icon='/media/icons/duotune/general/home.svg'
          title={intl.formatMessage({id: 'CASHOUTS'})}
          fontIcon='bi-wallet2'
        />
      </div>
      <div className='col-6'>
        <AsideMenuItem
          to='/codes'
          icon='/media/icons/duotune/general/home.svg'
          title={intl.formatMessage({id: 'CODES'})}
          fontIcon='bi-link-45deg'
        />
      </div>
    </>
  )
}
