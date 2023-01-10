import {Link} from 'react-router-dom'
import {useAuth} from '@/providers/AuthProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const HeaderUser = () => {
  const {currentUser, logout} = useAuth()

  return (
    <>
      <div
        className='cursor-pointer symbol symbol-35px symbol-md-40px'
        data-menu-trigger="{default: 'click', lg: 'hover'}"
        data-menu-attach='parent'
        data-menu-placement='bottom-end'
      >
        <img
          className='symbol symbol-circle symbol-35px symbol-md-40px'
          src={toAbsoluteUrl('/media/avatars/blank.png')}
          alt='user'
        />
      </div>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
        data-menu='true'
      >
        <div className='menu-item px-3'>
          <div className='menu-content d-flex align-items-center px-3'>
            <div className='symbol symbol-50px me-5'>
              <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
            </div>

            <div className='d-flex flex-column'>
              <div className='fw-bolder d-flex align-items-center fs-5'>
                {currentUser?.username}
                <div className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>
                  {currentUser?.userType}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='separator my-2'></div>

        {/* <div className='menu-item px-5'>
          <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
            My Profile
          </Link>
        </div> */}

        {/* <div className='menu-item px-5'>
          <a href='#' className='menu-link px-5'>
            <span className='menu-text'>My Orders</span>
            <span className='menu-badge'>
              <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
            </span>
          </a>
        </div> */}

        <div className='menu-item px-5'>
          <a onClick={logout} className='menu-link px-5'>
            Sign Out
          </a>
        </div>
      </div>
    </>
  )
}

export {HeaderUser}
