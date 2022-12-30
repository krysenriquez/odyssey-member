import clsx from 'clsx'
import React from 'react'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {DefaultTitle} from '../Header/page-title/DefaultTitle'

const Toolbar = () => {
  return (
    <div className='app-toolbar d-flex pb-3 pb-lg-5'>
      <div className='d-flex flex-stack flex-row-fluid'>
        <div className='d-flex flex-column flex-row-fluid'>
          <DefaultTitle />
        </div>
      </div>
    </div>
  )
}

export {Toolbar}
