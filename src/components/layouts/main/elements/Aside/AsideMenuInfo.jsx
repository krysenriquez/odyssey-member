import {useAccount} from '@/providers/AccountProvider'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
const AsideMenuInfo = () => {
  const {currentAccount} = useAccount()
  return (
    <div className='d-flex align-items-start flex-column w-100 mb-5 mb-lg-5'>
      {currentAccount ? (
        <>
          <div className='d-flex align-items-center mb-2'>
            <span className='text-gray-900 fs-2 fw-bold me-1'>{currentAccount.accountName}</span>
            <div>
              <CustomSVG
                path='/public/media/icons/general/verified.svg'
                className='svg-icon-1 svg-icon-2x svg-icon-primary'
              />
            </div>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <span className='text-gray-900 fs-4 fw-bold me-1'>{currentAccount.accountNumber}</span>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <span className='badge badge-outline badge-warning'>{currentAccount.packageName}</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export {AsideMenuInfo}
