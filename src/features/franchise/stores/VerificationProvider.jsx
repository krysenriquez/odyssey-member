import {createContext, useContext, useState, useEffect} from 'react'

const VerificationContext = createContext({
  verified: false,
  setVerified: (any) => {},
  packagePlan: undefined,
  setPackagePlan: (any) => {},
  activationCode: undefined,
  setActivationCode: (any) => {},
})

const VerificationProvider = ({children}) => {
  const [verified, setVerified] = useState(false)
  const [packagePlan, setPackagePlan] = useState(undefined)
  const [activationCode, setActivationCode] = useState(undefined)

  return (
    <VerificationContext.Provider
      value={{
        verified,
        setVerified,
        packagePlan,
        setPackagePlan,
        activationCode,
        setActivationCode,
      }}
    >
      {children}
    </VerificationContext.Provider>
  )
}

const useVerificationContext = () => useContext(VerificationContext)

export {VerificationProvider, useVerificationContext}
