import {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useWallet} from '@/features/wallets/store/WalletProvider'
import {toPointValue} from '@/utils/toCurrency'

export const PointValueWallets = () => {
  const intl = useIntl()
  const {pvWallets} = useWallet()

  return (
    <div className='row g-5 g-xl-10 mb-5 mb-xl-0'>
      {pvWallets ? (
        pvWallets.map((pvWallet) => {
          return (
            <div className='col-md-4 mb-xl-10' key={pvWallet.wallet}>
              <div className='card card-flush'>
                <div className='card-header pt-7'>
                  <div className='card-title flex-stack flex-row-fluid'>
                    <div className='symbol symbol-45px me-5'>
                      <span className='symbol-label bg-light-info'>
                        <span className='svg-icon svg-icon-2x svg-icon-gray-800'>
                          <svg
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              opacity='0.3'
                              d='M22 8.20267V15.7027C22 19.1027 19.2 22.0026 15.7 22.0026H8.2C4.8 22.0026 2 19.2027 2 15.7027V8.20267C2 4.80267 4.8 2.0026 8.2 2.0026H15.7C19.2 1.9026 22 4.70267 22 8.20267ZM12 7.30265C9.5 7.30265 7.39999 9.40262 7.39999 11.9026C7.39999 14.4026 9.5 16.5026 12 16.5026C14.5 16.5026 16.6 14.4026 16.6 11.9026C16.6 9.30262 14.5 7.30265 12 7.30265ZM17.9 5.0026C17.3 5.0026 16.9 5.4026 16.9 6.0026C16.9 6.6026 17.3 7.0026 17.9 7.0026C18.5 7.0026 18.9 6.6026 18.9 6.0026C18.9 5.5026 18.4 5.0026 17.9 5.0026Z'
                              fill='currentColor'
                            />
                            <path
                              d='M12 17.5026C8.9 17.5026 6.39999 15.0026 6.39999 11.9026C6.39999 8.80259 8.9 6.30261 12 6.30261C15.1 6.30261 17.6 8.80259 17.6 11.9026C17.6 15.0026 15.1 17.5026 12 17.5026ZM12 8.30261C10 8.30261 8.39999 9.90259 8.39999 11.9026C8.39999 13.9026 10 15.5026 12 15.5026C14 15.5026 15.6 13.9026 15.6 11.9026C15.6 9.90259 14 8.30261 12 8.30261Z'
                              fill='currentColor'
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='card-body d-flex align-items-end'>
                  <div className='d-flex flex-column'>
                    <span className='fw-bolder fs-2x text-dark'>
                      {toPointValue(pvWallet.total)}
                    </span>
                    <span className='fw-bold fs-7 text-gray-500'>
                      {intl.formatMessage({id: pvWallet.wallet})}
                    </span>
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
  )
}
