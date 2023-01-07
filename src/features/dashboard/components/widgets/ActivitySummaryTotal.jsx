import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/stores/ActivityProvider'

export const ActivitySummaryTotal = () => {
  const intl = useIntl()
  const {activitySummaryTotal} = useActivity()

  return (
    <div className='card card-flush h-xl-100'>
      <div className='card-header pt-7'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-800'>Activity Totals</span>
        </h3>
      </div>
      <div className='card-body d-flex align-items-end'>
        <div className='w-100'>
          {activitySummaryTotal ? (
            activitySummaryTotal.map((activity, index) => {
              return (
                <div key={activity.activity}>
                  <div className='d-flex flex-stack'>
                    <div className='d-flex align-items-center me-5'>
                      <div className='me-5'>
                        <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                          {intl.formatMessage({id: activity.activity})}
                        </span>
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
                      <span className='text-gray-800 fw-bold fs-4 me-3'>
                        {intl.formatMessage({id: activity.activity}) !== 'PV Sales Match'
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
