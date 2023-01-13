import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const AuthLayout = () => {
  return (
    <>
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center'
        style={{backgroundImage: 'url(/media/misc/auth.png)'}}
      >
        <div className='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
          <div className='mb-0 mb-lg-12'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/tci.png')}
              className='h-100px h-lg-150px'
            />
          </div>
          <div className='p-5'>
            <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
              Mission
            </h1>
            <div className='d-none d-lg-block text-white  fs-6 text-center'>
              Our Mission is to be the consumer's
              <span className='text-warning fw-bold mx-1'>TOP CHOICE</span>
              for Food Franchising,
              <br /> Delivering Products of outstanding quality, and great service at a competitive
              cost.
              <br />
              <span className='text-warning fw-bold mx-1'>TOP CHOICE FRANCHISE</span> is commited on
              uplifting the lives of everyone
              <br /> by empowering him/her with the business knowledge to become a successful
              business owner.
            </div>
          </div>
          <div className='p-5'>
            <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
              Vision
            </h1>
            <div className='d-none d-lg-block text-white  fs-6 text-center'>
              To provide excellent services on Food Franchising Business
              <br /> and create and endless opportunity and be the{' '}
              <span className='text-warning fw-bold mx-1'>TOP CHOICE</span>
              in the market. for Food Franchising,
            </div>
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
