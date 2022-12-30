import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive} from '@/utils/checkIsActive'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useLayout} from '@/providers/layout/LayoutProvider'

const AsideMenuItem = (props) => {
  const {children, to, title, icon, fontIcon} = props
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div>
      <Link
        className={clsx(
          'btn btn-icon btn-outline btn-bg-light btn-active-light-primary btn-flex flex-column flex-center w-100px h-100px border-gray-200',
          {active: isActive}
        )}
        to={to}
      >
        {icon && aside.menuIcon === 'svg' && (
          <>
            <span className='mb-2'>
              <CustomSVG path={icon} className='svg-icon-5' svgClassName=' ' />
            </span>
            <span className='fs-7 fw-bold'>{title}</span>
          </>
        )}
        {fontIcon && aside.menuIcon === 'font' ? (
          <>
            <span className='mb-2'>
              <i className={clsx('bi fs-2', fontIcon)}></i>
            </span>
            <span className='fs-7 fw-bold'>{title}</span>
          </>
        ) : (
          <span className='fs-7 fw-bold'>{title}</span>
        )}
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
