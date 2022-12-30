import clsx from 'clsx'
import {toNumber} from '@/utils/toCurrency'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

export const StepPackage = ({packagePlan}) => {
  return (
    <div className='w-100'>
      <div className='d-flex h-100 align-items-center'>
        <div className='w-100 d-flex flex-column flex-center px-10'>
          <div className='mb-7 text-center'>
            <h1 className='text-dark mb-5 fw-bolder'>{packagePlan.packageName}</h1>
            <div className='text-center'>
              <span className='mb-2 text-primary'>₱</span>
              <span className='fs-3x fw-bold text-primary'>
                {toNumber(packagePlan.packageAmount)}
              </span>
            </div>
          </div>
          <div className='w-100 mb-10'>
            {packagePlan.packageDetails.map((details) => {
              return Object.entries(details).map(([key, value]) => {
                return (
                  <div className='d-flex align-items-center mb-5' key={key}>
                    <span
                      className={clsx('fw-semibold fs-6 flex-grow-1 pe-3', {
                        'text-gray-800': value,
                        'text-gray-400': !value,
                      })}
                    >
                      {key}
                    </span>
                    {value ? (
                      <CustomSVG
                        path='/public/media/icons/general/check.svg'
                        className='svg-icon svg-icon-1 svg-icon-success'
                      />
                    ) : (
                      <CustomSVG
                        path='/public/media/icons/general/cross.svg'
                        className='svg-icon svg-icon-1'
                      />
                    )}
                  </div>
                )
              })
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
