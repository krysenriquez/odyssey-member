import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {useAccount} from '@/providers/AccountProvider'
import {getCashouts, GET_CASHOUTS_URL} from '../api'

const CashoutsListQueryContext = createContext(initialQuery)

const CashoutsListQueryProvider = ({children}) => {
  const {currentAccount} = useAccount()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_CASHOUTS_URL}`,
    () => {
      return getCashouts(currentAccount.accountId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <CashoutsListQueryContext.Provider value={value}>{children}</CashoutsListQueryContext.Provider>
  )
}

const useCashoutsListQueryContext = () => useContext(CashoutsListQueryContext)

const useCashoutsListQueryData = () => {
  const {response} = useCashoutsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useCashoutsListQueryLoading = () => {
  const {isLoading} = useCashoutsListQueryContext()
  return isLoading
}

export {
  CashoutsListQueryProvider,
  useCashoutsListQueryContext,
  useCashoutsListQueryData,
  useCashoutsListQueryLoading,
}
