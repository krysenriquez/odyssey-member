import {useAccount} from '@/providers/AccountProvider'
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import {getActivitySummaryTotal, getActivitySummaryCount} from '../api'

const ActivityContext = createContext({
  activitySummaryTotal: undefined,
  activitySummaryCount: undefined,
})

const useActivity = () => {
  return useContext(ActivityContext)
}

const ActivityProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const didRequestSummaryTotal = useRef(false)
  const didRequestSummaryCount = useRef(false)
  const [activitySummaryTotal, setActivitySummaryTotal] = useState(undefined)
  const [activitySummaryCount, setActivitySummaryCount] = useState(undefined)

  useEffect(() => {
    const getActivitySummaryWithTotal = async () => {
      try {
        if (!didRequestSummaryTotal.current) {
          const data = await getActivitySummaryTotal(currentAccount.accountId)
          if (data.length > 0) {
            setActivitySummaryTotal(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryTotal.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryTotal.current = true)
    }

    const getActivitySummaryWithCount = async () => {
      try {
        if (!didRequestSummaryCount.current) {
          const data = await getActivitySummaryCount(currentAccount.accountId)
          if (data.length > 0) {
            setActivitySummaryCount(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryCount.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryCount.current = true)
    }

    if (currentAccount) {
      getActivitySummaryWithTotal()
      getActivitySummaryWithCount()
    }
  }, [currentAccount])

  return (
    <ActivityContext.Provider
      value={{
        activitySummaryTotal,
        activitySummaryCount,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export {ActivityProvider, useActivity}
