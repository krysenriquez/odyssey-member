import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {useAccount} from '../../../providers/AccountProvider'
import {getCashoutMethods, getAccountCashoutMethods} from '../api'

const CashoutsContext = createContext({
  accountCashoutMethods: undefined,
  cashoutMethods: undefined,
  cashout: undefined,
  setCashout: (any) => {},
})

const useCashouts = () => {
  return useContext(CashoutsContext)
}

const CashoutsProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const didRequestAccountCashoutMethods = useRef(false)
  const didRequestCashoutMethods = useRef(false)
  const [cashoutMethods, setCashoutMethods] = useState(undefined)
  const [accountCashoutMethods, setAccountCashoutMethods] = useState(undefined)
  const [cashout, setCashout] = useState(undefined)

  useEffect(() => {
    const requestAccountCashoutMethods = async () => {
      try {
        if (!didRequestAccountCashoutMethods.current) {
          const data = await getAccountCashoutMethods({accountId: currentAccount.accountId})
          if (data.length > 0) {
            setAccountCashoutMethods(data)
          }
        }
      } catch (error) {
        if (!didRequestAccountCashoutMethods.current) {
          toast.error('Unable to fetch Cashout Methods')
        }
      }

      return () => (didRequestAccountCashoutMethods.current = true)
    }

    const requestCashoutMethods = async () => {
      try {
        if (!didRequestCashoutMethods.current) {
          const data = await getCashoutMethods()
          console.log(data)
          if (data.length > 0) {
            console.log(data)
            setCashoutMethods(data)
          }
        }
      } catch (error) {
        if (!didRequestCashoutMethods.current) {
          toast.error('Unable to fetch Cashout Methods')
        }
      }

      return () => (didRequestCashoutMethods.current = true)
    }

    if (currentAccount) {
      requestAccountCashoutMethods()
      requestCashoutMethods()
    }
  }, [currentAccount])

  return (
    <CashoutsContext.Provider
      value={{
        accountCashoutMethods,
        cashoutMethods,
        cashout,
        setCashout,
      }}
    >
      {children}
    </CashoutsContext.Provider>
  )
}

export {CashoutsProvider, useCashouts}
