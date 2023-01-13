import {useActivity} from '@/features/activities/stores/ActivityProvider'
import {toPointValue} from '@/utils/toCurrency'
import {useState, useEffect} from 'react'

const AsideMenuProgress = () => {
  const {activitySummaryStats} = useActivity()
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (activitySummaryStats) {
      setPercentage(
        ((activitySummaryStats.flushoutLimit -
          activitySummaryStats.remainingSalesMatchPointsToday) /
          activitySummaryStats.flushoutLimit) *
          100
      )
    }
  }, [activitySummaryStats])

  return (
    <div className='d-flex align-items-center flex-column w-100 mb-8 mb-lg-10'>
      <div className='d-flex justify-content-between fw-bolder fs-6 text-gray-800 w-100 mt-auto mb-3'>
        <span>PV Sales Match Flushout</span>
      </div>
      {activitySummaryStats ? (
        <>
          <div className='w-100 bg-light-info rounded mb-2' style={{height: 24}}>
            <div
              className='bg-danger rounded'
              role='progressbar'
              style={{height: 24, width: `${percentage}%`}}
            />
          </div>
          <div className='fw-semibold fs-7 text-primary w-100 mt-auto'>
            <span>
              remaining {toPointValue(activitySummaryStats.remainingSalesMatchPointsToday)} of
              {' ' + toPointValue(activitySummaryStats.flushoutLimit)} today
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export {AsideMenuProgress}
