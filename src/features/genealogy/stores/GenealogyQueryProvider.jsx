/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getGenealogy, GET_GENEALOGY_URL} from '../api'
import {useGenealogyRequest} from './GenealogyRequestProvider'
import {useMemo} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const GenealogyQueryContext = createContext(initialQuery)

const GenealogyQueryProvider = ({children}) => {
  const {genealogyAccountId} = useGenealogyRequest()
  const [accountId, setAccountId] = useState(genealogyAccountId)
  const updatedAccountId = useMemo(() => genealogyAccountId, [genealogyAccountId])
  const swal = withReactContent(Swal)

  useEffect(() => {
    if (accountId !== updatedAccountId) {
      setAccountId(updatedAccountId)
    }
  }, [updatedAccountId])

  useEffect(() => {
    refetch()
  }, [accountId])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_GENEALOGY_URL}-${accountId}`,
    () => {
      return getGenealogy(accountId)
    },
    {
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (error) => {
        swal.fire('Error!', 'Unable to fetch Account', 'error')
      },
    }
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <GenealogyQueryContext.Provider value={value}>{children}</GenealogyQueryContext.Provider>
}

const useGenealogyQueryContext = () => useContext(GenealogyQueryContext)

const useGenealogyQueryData = () => {
  const {response} = useGenealogyQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useGenealogyQueryLoading = () => {
  const {isLoading} = useGenealogyQueryContext()
  return isLoading
}

export {
  GenealogyQueryProvider,
  useGenealogyQueryContext,
  useGenealogyQueryData,
  useGenealogyQueryLoading,
}
