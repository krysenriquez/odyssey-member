import {useState} from 'react'
import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/store/ActivityProvider'
import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {useEffect} from 'react'

export const PointValueWallets = () => {
  const intl = useIntl()
  const {activitySummaryCount} = useActivity()
  const {pvWallets} = useWallet()
  const [pvTotalWallet, setPvTotalWallet] = useState(undefined)

  useEffect(() => {
    if (pvWallets) {
      setPvTotalWallet(
        pvWallets.find((wallet) => {
          return wallet.wallet == 'PV_TOTAL_WALLET'
        })
      )
    }
  }, [pvWallets])

  return (
    <div className='card card-flush h-xl-100 card-xl-stretch mb-xl-8'>
      <div className='px-9 pt-7 card-rounded h-250px w-100 bg-warning'>
        <div className='d-flex flex-stack'>
          <h3 className='m-0 text-white fw-bold fs-3'>Point Value Wallet</h3>
        </div>
        <div className='d-flex text-center flex-column text-white pt-8'>
          <span className='fw-semibold fs-4'>
            {pvTotalWallet ? intl.formatMessage({id: pvTotalWallet.wallet}) : <></>}
          </span>
          <span className='fw-bold fs-3x pt-1'>
            {pvTotalWallet ? toPointValue(pvTotalWallet.total) : <></>}
          </span>
        </div>
      </div>
      <div className='card-body mt-n12'>
        <div className='mt-n20 position-relative'>
          <div className='row g-3 g-lg-6'>
            {pvWallets ? (
              pvWallets
                .filter((pvWallet) => pvWallet.wallet !== 'PV_TOTAL_WALLET')
                .map((pvWallet) => {
                  return (
                    <div className='col-6' key={pvWallet.wallet}>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5'>
                        <div className='symbol symbol-30px me-5 mb-8'>
                          <span className='symbol-label'>
                            <span className='svg-icon svg-icon-1 svg-icon-primary'>
                              <svg
                                width={24}
                                height={24}
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M17.9061 13H11.2061C11.2061 12.4 10.8061 12 10.2061 12C9.60605 12 9.20605 12.4 9.20605 13H6.50606L9.20605 8.40002V4C8.60605 4 8.20605 3.6 8.20605 3C8.20605 2.4 8.60605 2 9.20605 2H15.2061C15.8061 2 16.2061 2.4 16.2061 3C16.2061 3.6 15.8061 4 15.2061 4V8.40002L17.9061 13ZM13.2061 9C12.6061 9 12.2061 9.4 12.2061 10C12.2061 10.6 12.6061 11 13.2061 11C13.8061 11 14.2061 10.6 14.2061 10C14.2061 9.4 13.8061 9 13.2061 9Z'
                                  fill='currentColor'
                                />
                                <path
                                  d='M18.9061 22H5.40605C3.60605 22 2.40606 20 3.30606 18.4L6.40605 13H9.10605C9.10605 13.6 9.50605 14 10.106 14C10.706 14 11.106 13.6 11.106 13H17.8061L20.9061 18.4C21.9061 20 20.8061 22 18.9061 22ZM14.2061 15C13.1061 15 12.2061 15.9 12.2061 17C12.2061 18.1 13.1061 19 14.2061 19C15.3061 19 16.2061 18.1 16.2061 17C16.2061 15.9 15.3061 15 14.2061 15Z'
                                  fill='currentColor'
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                        <div className='d-flex flex-wrap flex-column align-items-start gap-10'>
                          <div className='mb-8'>
                            <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                              {toPointValue(pvWallet.total)}
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>
                              {intl.formatMessage({id: pvWallet.wallet})}
                            </span>
                          </div>
                          <div className=''>
                            <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                              {toPointValue(pvWallet.runningTotal)}
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>Total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
