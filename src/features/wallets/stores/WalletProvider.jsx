import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {useAccount} from '../../../providers/AccountProvider'
import {getWalletSummary, getPvWalletSummary} from '@/features/wallets/api'

const WalletContext = createContext({
  wallets: undefined,
  setWallets: (any) => {},
  walletSummary: undefined,
  setWalletSummary: (any) => {},
  pvWallets: undefined,
  setPvWallets: (any) => {},
})

const useWallet = () => {
  return useContext(WalletContext)
}

const WalletProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const didRequestWallet = useRef(false)
  const didRequestPvWallet = useRef(false)
  const [wallets, setWallets] = useState(undefined)
  const [pvWallets, setPvWallets] = useState(undefined)
  const [walletSummary, setWalletSummary] = useState(undefined)

  useEffect(() => {
    const requestWallet = async () => {
      try {
        if (!didRequestWallet.current) {
          const data = await getWalletSummary(currentAccount.accountId)
          if (data.length > 0) {
            setWallets(data)
          }
        }
      } catch (error) {
        if (!didRequestWallet.current) {
          toast.error('Unable to fetch Wallet Information')
        }
      }

      return () => (didRequestWallet.current = true)
    }

    const requestPvWallet = async () => {
      try {
        if (!didRequestPvWallet.current) {
          const data = await getPvWalletSummary(currentAccount.accountId)
          if (data.length > 0) {
            setPvWallets(data)
          }
        }
      } catch (error) {
        if (!didRequestPvWallet.current) {
          toast.error('Unable to fetch PV Wallet Information')
        }
      }

      return () => (didRequestPvWallet.current = true)
    }

    if (currentAccount) {
      requestWallet()
      requestPvWallet()
    }
  }, [currentAccount])

  return (
    <WalletContext.Provider
      value={{
        wallets,
        setWallets,
        walletSummary,
        setWalletSummary,
        pvWallets,
        setPvWallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export {WalletProvider, useWallet}
