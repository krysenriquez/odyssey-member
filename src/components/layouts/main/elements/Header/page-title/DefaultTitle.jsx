import {Fragment} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {usePageData} from '@/providers/PageDataProvider'

const DefaultTitle = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const {config, classes} = useLayout()
  return (
    // <div
    //   data-swapper='true'
    //   data-swapper-mode='prepend'
    //   data-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}"
    //   className='page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0'
    // >
    //   {/* begin::Heading */}
    //   {pageTitle && (
    //     <h1 className='d-flex flex-column text-dark fw-bolder my-0 fs-1'>
    //       {pageTitle}
    //       {pageDescription && (
    //         <small className='text-muted fs-6 fw-bold ms-1 pt-1'>{pageDescription}</small>
    //       )}
    //     </h1>
    //   )}
    //   {/* end::Heading */}

    //   {pageBreadcrumbs &&
    //     pageBreadcrumbs.length > 0 &&
    //     config.pageTitle &&
    //     config.pageTitle.breadCrumbs && (
    //       <ul className='breadcrumb breadcrumb-dot fw-bold fs-base my-1'>
    //         {Array.from(pageBreadcrumbs)
    //           .filter((b) => !b.isSeparator)
    //           .map((item, index) => (
    //             <li
    //               className={clsx('breadcrumb-item', {
    //                 'text-dark': !item.isSeparator && item.isActive,
    //                 'text-muted': !item.isSeparator && !item.isActive,
    //               })}
    //               key={`${item.path}${index}`}
    //             >
    //               <Link className='text-muted' to={item.path}>
    //                 {item.title}
    //               </Link>
    //             </li>
    //           ))}
    //         <li className='breadcrumb-item text-dark'>{pageTitle}</li>
    //       </ul>
    //     )}
    // </div>
    <div className='page-title d-flex align-items-center me-3'>
      <h1 className='page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-lg-2x gap-2'>
        <span>
          <span className='fw-light'>{pageTitle}</span>
        </span>
        {pageDescription && (
          <small className='text-muted fs-6 fw-bold ms-1 pt-1'>{pageDescription}</small>
        )}
      </h1>
    </div>
  )
}

export {DefaultTitle}
