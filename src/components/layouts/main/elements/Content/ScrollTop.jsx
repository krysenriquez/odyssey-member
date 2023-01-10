import React, {useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import {
  ScrollTopComponent,
  DrawerComponent,
  ToggleComponent,
  StickyComponent,
} from '@/components/assets/components'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

export function ScrollTop() {
  const {pathname} = useLocation()
  const isFirstRun = useRef(true)

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization()
      setTimeout(() => {
        ToggleComponent.reinitialization()
        DrawerComponent.reinitialization()
      }, 70)
    }, 140)
  }

  const scrollTop = () => {
    ScrollTopComponent.goTop()
  }

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(`[data-sticky-name="app-header-sticky"]`)
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(stickyHeader[0])
      if (sticky) {
        sticky.update()
      }
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      pluginsReinitialization()
    }

    updateHeaderSticky()
    setTimeout(() => {
      scrollTop()
    }, 0)
  }, [pathname])

  return (
    <div id='kt_scrolltop' className='scrolltop' data-scrolltop='true'>
      <CustomSVG path='/media/icons/arrows/scrolltop.svg' />
    </div>
  )
}
