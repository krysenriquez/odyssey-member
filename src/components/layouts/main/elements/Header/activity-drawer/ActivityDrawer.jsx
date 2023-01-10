import React from 'react'
import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
// import {Item1, Item2, Item3, Item4} from '@/mock/activity'

const ActivityDrawer = () => (
  <div
    id='kt_activities'
    className='bg-body'
    data-drawer='true'
    data-drawer-name='activities'
    data-drawer-activate='true'
    data-drawer-overlay='true'
    data-drawer-width="{default:'300px', 'lg': '900px'}"
    data-drawer-direction='end'
    data-drawer-toggle='#kt_activities_toggle'
    data-drawer-close='#kt_activities_close'
  >
    <div className='card shadow-none rounded-0'>
      <div className='card-header' id='kt_activities_header'>
        <h3 className='card-title fw-bolder text-dark'>Activity Logs</h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-active-light-primary me-n5'
            id='kt_activities_close'
          >
            <CustomSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
          </button>
        </div>
      </div>
      <div className='card-body position-relative' id='kt_activities_body'>
        <div
          id='kt_activities_scroll'
          className='position-relative scroll-y me-n5 pe-5'
          data-scroll='true'
          data-scroll-height='auto'
          data-scroll-wrappers='#kt_activities_body'
          data-scroll-dependencies='#kt_activities_header, #kt_activities_footer'
          data-scroll-offset='5px'
        >
          <div className='timeline'>
            {/* <Item1 />
            <Item2 />
            <Item3 />
            <Item4 /> */}
            {/* <Item5 />
            <Item6 />
            <Item7 />
            <Item8 /> */}
          </div>
        </div>
      </div>
      <div className='card-footer py-5 text-center' id='kt_activities_footer'>
        <Link to='/crafted/pages/profile' className='btn btn-bg-body text-primary'>
          View All Activities
          <CustomSVG
            path='/media/icons/duotune/arrows/arr064.svg'
            className='svg-icon-3 svg-icon-primary'
          />
        </Link>
      </div>
    </div>
  </div>
)

export {ActivityDrawer}
