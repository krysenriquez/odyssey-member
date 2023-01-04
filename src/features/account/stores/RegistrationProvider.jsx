import {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import humps from 'humps'

const RegistrationContext = createContext({
  node: undefined,
  setNode: (any) => {},
})

const RegistrationProvider = ({children}) => {
  const [node, setNode] = useState(undefined)

  const value = {
    node,
    setNode,
  }

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}

const useRegistrationContext = () => useContext(RegistrationContext)

export {RegistrationProvider, useRegistrationContext}
