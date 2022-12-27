import {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import humps from 'humps'

const VerificationContext = createContext({
  verified: false,
  setVerified: (any) => {},
  packagePlan: undefined,
  setPackagePlan: (any) => {},
})

const VerificationProvider = ({children}) => {
  const [verified, setVerified] = useState(false)
  const [packagePlan, setPackagePlan] = useState(undefined)

  return (
    <VerificationContext.Provider value={{verified, setVerified, packagePlan, setPackagePlan}}>
      {children}
    </VerificationContext.Provider>
  )
}

const useVerificationContext = () => useContext(VerificationContext)

export {VerificationProvider, useVerificationContext}
