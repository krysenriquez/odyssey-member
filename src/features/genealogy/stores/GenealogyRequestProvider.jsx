import {useAccount} from '@/providers/AccountProvider'
import {useEffect, useRef} from 'react'
import {useState, createContext, useContext} from 'react'

const GenealogyRequestContext = createContext({
  genealogyAccountId: undefined,
  updateGenealogyAccountId: (any, bool) => {},
  history: [],
  currentHistoryIndex: 0,
  setCurrentHistoryIndex: (any) => {},
})

const GenealogyRequestProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const [history, setHistory] = useState([currentAccount.accountId])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const [genealogyAccountId, setGenealogyAccountId] = useState(currentAccount.accountId)
  const isFirstRun = useRef(true)
  const isNav = useRef(false)

  const updateGenealogyAccountId = (account, nav) => {
    setGenealogyAccountId(account)
    isNav.current = nav
  }

  useEffect(() => {
    setCurrentHistoryIndex(history.length - 1)
  }, [history])

  useEffect(() => {
    if (isFirstRun.current && genealogyAccountId) {
      isFirstRun.current = false
    } else {
      if (!isNav.current) {
        if (currentHistoryIndex == history.length - 1) {
          const currentHistory = [...history]
          currentHistory.push(genealogyAccountId)
          setHistory(currentHistory)
        } else {
          const currentHistory = [...history]
          currentHistory.splice(currentHistoryIndex + 1, history.length, genealogyAccountId)
          setHistory(currentHistory)
        }
      }
    }
  }, [genealogyAccountId])

  const value = {
    genealogyAccountId,
    updateGenealogyAccountId,
    history,
    currentHistoryIndex,
    setCurrentHistoryIndex,
  }

  return (
    <GenealogyRequestContext.Provider value={value}>{children}</GenealogyRequestContext.Provider>
  )
}

const useGenealogyRequest = () => useContext(GenealogyRequestContext)
export {GenealogyRequestProvider, useGenealogyRequest}
