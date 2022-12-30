import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useWallet} from '@/features/wallets/store/WalletProvider'
import {getMemberWalletSummaryList} from '@/features/wallets/api'
import {useAccount} from '@/providers/AccountProvider'
import {toCurrency} from '@/utils/toCurrency'
import {WalletSummaryModal} from '@/features/wallets/components/WalletSummary/WalletSummaryModal'

export const PrimaryWallets = () => {
  const intl = useIntl()
  const {currentAccount} = useAccount()
  const {wallets, setWalletSummary} = useWallet()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const getWalletSummary = async (wallet) => {
    await getMemberWalletSummaryList(currentAccount.accountId, wallet).then((response) => {
      setWalletSummary(response)
      toggleModal()
    })
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='row g-5 g-xl-10'>
      {wallets ? (
        wallets.map((wallet) => {
          return (
            <div className='col-xl-6' key={wallet.wallet}>
              <div
                className='card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-xl-100 cursor-pointer hover-elevate-up shadow-sm parent-hover'
                style={{
                  backgroundColor: '#F1416C',
                  backgroundImage:
                    'url("/metronic8/demo37/assets/media/svg/shapes/wave-bg-red.svg")',
                }}
                onClick={() => {
                  getWalletSummary(wallet.wallet)
                }}
              >
                <div className='card-header pt-8'>
                  <div
                    className='d-flex flex-center rounded-circle h-60px w-60px'
                    style={{
                      border: '1px dashed rgba(255, 255, 255, 0.4)',
                      backgroundColor: '#F1416C',
                    }}
                  >
                    <i className='fonticon-incoming-call text-white fs-2qx lh-0' />
                  </div>
                </div>
                <div className='card-body'>
                  <span className='card-title fw-bold text-white fs-5 mb-3 d-block'>
                    {intl.formatMessage({id: wallet.wallet})}
                  </span>
                  <div className='d-flex align-items-center'>
                    <span className='fs-3hx text-white fw-bold me-6'>
                      {toCurrency(wallet.total)}
                    </span>
                    <div className='fw-bold fs-6 text-white'>
                      <span className='d-block'>Total</span>
                      <span className=''>Balance</span>
                    </div>
                  </div>
                </div>
                <div
                  className='card-footer'
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className='fw-bold text-white py-2'>
                    <span className='fs-1 d-block'>{toCurrency(wallet.runningTotal)}</span>
                    <span className='opacity-50'>Total Accumulated</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <></>
      )}

      {isModalOpen && <WalletSummaryModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </div>
  )
}
