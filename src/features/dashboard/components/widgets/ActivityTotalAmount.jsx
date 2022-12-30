import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/store/ActivityProvider'

export const ActivityTotalAmount = () => {
  const intl = useIntl()
  const {activitySummary} = useActivity()

  return (
    <div className='card card-flush h-xl-100'>
      <div className='card-header pt-7'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-800'>Activity Summary</span>
        </h3>
      </div>
      <div className='card-body d-flex align-items-end'>
        <div className='w-100'>
          {activitySummary ? (
            activitySummary.map((activity, index) => {
              return (
                <div key={activity.activity}>
                  <div className='d-flex flex-stack'>
                    <div className='d-flex align-items-center me-5'>
                      <img
                        src='/metronic8/demo37/assets/media/svg/brand-logos/atica.svg'
                        className='me-4 w-30px'
                        alt=''
                      />
                      <div className='me-5'>
                        <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                          {intl.formatMessage({id: activity.activity})}
                        </span>
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
                      <span className='text-gray-800 fw-bold fs-4 me-3'>
                        {intl.formatMessage({id: activity.activity}) !== 'PV Sales Match' &&
                        intl.formatMessage({id: activity.activity}) !== 'Leadership Bonus'
                          ? toCurrency(activity.total)
                          : toPointValue(activity.total)}
                      </span>
                    </div>
                  </div>
                  <div className='separator separator-dashed my-3' />
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
