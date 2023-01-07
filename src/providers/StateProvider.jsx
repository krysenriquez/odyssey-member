import {createContext, useContext, useState, useEffect} from 'react'

const StateProviderContext = createContext({
  state: undefined,
  refresh: (any) => {},
})

export const StateProvider = ({children}) => {
  const [state, setState] = useState(1)

  const refresh = () => {
    setState(Math.random())
  }

  const value = {
    state,
    refresh,
  }

  return <StateProviderContext.Provider value={value}>{children}</StateProviderContext.Provider>
}

export const useStateProviderContext = () => useContext(StateProviderContext)
