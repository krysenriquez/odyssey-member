/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {Topbar} from './Topbar'
import {DefaultTitle} from './page-title/DefaultTitle'

const calculateStickyOffset = (header) => {
  if (header.fixed.desktop && header.fixed.tabletAndMobile) {
    return '{default: "200px", lg: "300px"}'
  }

  if (header.fixed.desktop && !header.fixed.tabletAndMobile) {
    return '{lg: "300px"}'
  }

  if (header.fixed.tabletAndMobile && !header.fixed.desktop) {
    return '{default: "200px", lg: false}'
  }

  return ''
}

const calculateShowSticky = (header) => {
  return (
    (header.fixed.desktop && header.fixed.tabletAndMobile) ||
    (header.fixed.desktop && !header.fixed.tabletAndMobile) ||
    (header.fixed.tabletAndMobile && !header.fixed.desktop)
  )
}

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header} = config
  const [stickyOffset, setStickyOffset] = useState(calculateStickyOffset(header))

  const [showSticky, setShowSticky] = useState(calculateShowSticky(header))
  useEffect(() => {
    setStickyOffset(calculateStickyOffset(header))
    setShowSticky(calculateShowSticky(header))
  }, [header])

  return (
    <div
      id='kt_app_header'
      className={clsx('app-header', classes.header.join(' '))}
      {...attributes.headerMenu}
      data-sticky={showSticky ? 'true' : 'false'}
      data-sticky-activate={showSticky ? 'true' : 'false'}
      data-sticky-name='app-header-sticky'
      data-sticky-offset={stickyOffset}
    >
      <div
        className={clsx(
          'app-container d-flex align-items-stretch justify-content-between',
          classes.headerContainer.join(' ')
        )}
      >
        <div className='app-header-wrapper d-flex flex-grow-1 align-items-stretch justify-content-between'>
          <div className='app-header-logo d-flex flex-shrink-0 align-items-center justify-content-between justify-content-lg-center'>
            <button
              className='btn btn-icon btn-color-gray-600 btn-active-color-primary ms-n3 me-2 d-flex d-lg-none'
              id='kt_app_sidebar_toggle'
            >
              <CustomSVG path='/public/media/icons/hamburger.svg' className='svg-icon-1' />
            </button>
            <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
              <Link to='/dashboard'>
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/public/media/logos/tci.png')}
                  className='h-30px h-lg-70px'
                />
              </Link>
            </div>
          </div>
          <Topbar />
        </div>
      </div>
    </div>
  )
}
