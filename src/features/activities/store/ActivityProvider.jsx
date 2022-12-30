import {useAccount} from '@/providers/AccountProvider'
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import {getActivitySummaryTotal} from '../api'

const ActivityContext = createContext({
  activitySummary: undefined,
  setActivitySummary: (any) => {},
})

const useActivity = () => {
  return useContext(ActivityContext)
}

const ActivityProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const didRequest = useRef(false)
  const [activitySummary, setActivitySummary] = useState(undefined)

  useEffect(() => {
    const getActivitySummaryWithTotal = async () => {
      try {
        if (!didRequest.current) {
          const data = await getActivitySummaryTotal(currentAccount.accountId)
          if (data.length > 0) {
            setActivitySummary(data)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequest.current = true)
    }

    if (currentAccount) {
      getActivitySummaryWithTotal()
    }
  }, [currentAccount])

  return (
    <ActivityContext.Provider
      value={{
        activitySummary,
        setActivitySummary,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export {ActivityProvider, useActivity}
