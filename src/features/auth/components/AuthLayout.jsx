import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const AuthLayout = () => {
  return (
    <>
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center'
        style={{backgroundImage: 'url(/public/media/misc/auth.png)'}}
      >
        <div className='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
          <div className='mb-0 mb-lg-12'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/public/media/logos/tci.png')}
              className='h-100px h-lg-150px'
            />
          </div>
          <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
            Fast, Efficient and Productive
          </h1>
          <div className='d-none d-lg-block text-white fs-base text-center'>
            In this kind of post,
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the blogger
            </a>
            introduces a person they’ve interviewed
            <br />
            and provides some background information about
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the interviewee
            </a>
            and their
            <br />
            work following this is a transcript of the interview.
          </div>
        </div>
      </div>
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10'>
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
        </div>
        <div className='d-flex flex-center flex-wrap px-5'>
          <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='/metronic8/demo6/../demo6/pages/team.html' className='px-5' target='_blank'>
              Terms
            </a>
            <a
              href='/metronic8/demo6/../demo6/pages/pricing/column.html'
              className='px-5'
              target='_blank'
            >
              Plans
            </a>
            <a href='/metronic8/demo6/../demo6/pages/contact.html' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
