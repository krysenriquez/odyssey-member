import { getUserByToken } from '@/features/auth/api'
import {createContext, useContext, useState, useEffect} from 'react'
import {useAuth} from './AuthProvider'

const StateProviderContext = createContext({
  state: undefined,
  refresh: (any) => {},
})

export const StateProvider = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const [state, setState] = useState(1)

  const refresh = () => {
    setState(Math.random())
  }

  useEffect(() => {
    const requestUser = async (apiToken) => {
      try {
        const data = await getUserByToken(apiToken)
        if (data) {
          setCurrentUser(data)
        }
      } catch (error) {
        console.error(error)
        logout()
      }
    }

    if (auth && auth.access) {
      requestUser(auth.access)
    } else {
      logout()
    }
  }, [state])

  const value = {
    state,
    refresh,
  }

  return <StateProviderContext.Provider value={value}>{children}</StateProviderContext.Provider>
}

export const useStateProviderContext = () => useContext(StateProviderContext)
