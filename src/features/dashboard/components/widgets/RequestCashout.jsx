export const RequestCashout = () => {
  return (
    <div className='card h-xl-100'>
      <div className='card-header position-relative min-h-50px p-0 border-bottom-2'>
        <ul className='nav nav-pills nav-pills-custom d-flex position-relative w-100'>
          <li className='nav-item mx-0 p-0 w-50'>
            <a
              className='nav-link btn btn-color-muted active border-0 h-100 px-0'
              data-bs-toggle='pill'
              id='kt_forms_widget_1_tab_1'
              href='#kt_forms_widget_1_tab_content_1'
            >
              <span className='nav-text fw-bold fs-4 mb-3'>Buy</span>
              <span className='bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded' />
            </a>
          </li>
          <li className='nav-item mx-0 px-0 w-50'>
            <a
              className='nav-link btn btn-color-muted border-0 h-100 px-0'
              data-bs-toggle='pill'
              id='kt_forms_widget_1_tab_2'
              href='#kt_forms_widget_1_tab_content_2'
            >
              <span className='nav-text fw-bold fs-4 mb-3'>Sell</span>
              <span className='bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded' />
            </a>
          </li>
        </ul>
      </div>
      <div className='card-body'>
        <div className='tab-content'>
          <div className='tab-pane fade active show' id='kt_forms_widget_1_tab_content_1'>
            <div className='form-floating border border-gray-300 rounded mb-7'>
              <select
                className='form-select form-select-transparent'
                id='kt_forms_widget_1_select_1'
              >
                <option />
                <option
                  value={0}
                  data-kt-select2-icon='assets/media/svg/coins/bitcoin.svg'
                  selected={true}
                >
                  Bitcoin/BTC
                </option>
                <option value={1} data-kt-select2-icon='assets/media/svg/coins/ethereum.svg'>
                  Ethereum/ETH
                </option>
                <option value={2} data-kt-select2-icon='assets/media/svg/coins/filecoin.svg'>
                  Filecoin/FLE
                </option>
                <option value={3} data-kt-select2-icon='assets/media/svg/coins/chainlink.svg'>
                  Chainlink/CIN
                </option>
                <option value={4} data-kt-select2-icon='assets/media/svg/coins/binance.svg'>
                  Binance/BCN
                </option>
              </select>
              <label htmlFor='floatingInputValue'>Coin Name</label>
            </div>
            <div className='row mb-7'>
              <div className='col-6'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control text-gray-800 fw-bold'
                    placeholder={`0.00`}
                    id='floatingInputValue'
                    defaultValue='$23000'
                  />
                  <label htmlFor='floatingInputValue'>Amount(USD)</label>
                </div>
              </div>
              <div className='col-6'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control text-gray-800 fw-bold'
                    placeholder={`0.00`}
                    id='floatingInputValue'
                    defaultValue='$000000032'
                  />
                  <label htmlFor='floatingInputValue'>Amount(BTC)</label>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-end'>
              <a
                href='#'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_top_up_wallet'
                className='btn btn-primary fs-3 w-100'
              >
                Make Payment
              </a>
            </div>
          </div>
          <div className='tab-pane fade' id='kt_forms_widget_1_tab_content_2'>
            <div className='form-floating border rounded mb-7'>
              <select
                className='form-select form-select-transparent'
                id='kt_forms_widget_1_select_2'
              >
                <option />
                <option
                  value={0}
                  data-kt-select2-icon='assets/media/svg/coins/bitcoin.svg'
                  selected={true}
                >
                  Bitcoin/BTC
                </option>
                <option value={1} data-kt-select2-icon='assets/media/svg/coins/ethereum.svg'>
                  Ethereum/ETH
                </option>
                <option value={2} data-kt-select2-icon='assets/media/svg/coins/filecoin.svg'>
                  Filecoin/FLE
                </option>
                <option value={3} data-kt-select2-icon='assets/media/svg/coins/chainlink.svg'>
                  Chainlink/CIN
                </option>
                <option value={4} data-kt-select2-icon='assets/media/svg/coins/binance.svg'>
                  Binance/BCN
                </option>
              </select>
              <label htmlFor='floatingInputValue'>Coin Name</label>
            </div>
            <div className='row mb-7'>
              <div className='col-6'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control text-gray-800 fw-bold'
                    placeholder={`0.00`}
                    id='floatingInputValue'
                    defaultValue='$0,0000005'
                  />
                  <label htmlFor='floatingInputValue'>Amount(BTC)</label>
                </div>
              </div>
              <div className='col-6'>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control text-gray-800 fw-bold'
                    placeholder={`0.00`}
                    id='floatingInputValue'
                    defaultValue='$1230.00'
                  />
                  <label htmlFor='floatingInputValue'>Amount(USD)</label>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-end'>
              <a
                href='#'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_top_up_wallet'
                className='btn btn-primary fs-3 w-100'
              >
                Place Offer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
