import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {Stepper} from '@/components/elements/Stepper/components/Stepper'

const steps = [
  {title: 'Account Type', subTitle: 'Select your account type'},
  {title: 'Account Info', subTitle: 'Setup your account settings'},
  {title: 'Business Details', subTitle: 'Setup your business details'},
  {title: 'Completed', subTitle: 'Provide your payment info'},
  {title: 'Billing Details', subTitle: 'Your account is created'},
]

export const RegistrationLayout = () => {
  return (
    <>
      <div className='d-flex flex-column flex-lg-row-auto w-lg-50 w-xl-50'>
        {/* d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-350px w-xl-500px scroll-y bgi-size-cover bgi-position-center */}
        {/* d-flex flex-lg-row-fluid w-lg-100 bgi-size-cover bgi-position-center */}
        <div
          className='d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-50 scroll-y bgi-size-cover bgi-position-center stepper stepper-pills stepper-column stepper-multistep'
          style={{backgroundImage: 'url(/public/media/misc/auth.png)'}}
        >
          <div className='d-flex flex-center py-10 py-lg-20 mt-lg-20'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/public/media/logos/tci.png')}
              className='h-100px h-lg-150px'
            />
          </div>
          {/* <div className='d-flex flex-row-fluid justify-content-center p-10'>
            <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
              Fast, Efficient and Productivesssssssssss
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
            </h1>
          </div> */}
          <Stepper steps={steps} />
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
