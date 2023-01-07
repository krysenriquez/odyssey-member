import {useState} from 'react'
import {useIntl} from 'react-intl'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/stores/ActivityProvider'
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
                            <CustomSVG
                              path='/public/media/icons/general/box.svg'
                              className='svg-icon svg-icon-1 svg-icon-primary'
                            />
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
