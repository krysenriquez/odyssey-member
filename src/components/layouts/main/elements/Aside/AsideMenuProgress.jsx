const AsideMenuProgress = () => {
  return (
    <div className='d-flex align-items-center flex-column w-100 mb-8 mb-lg-10'>
      <div className='d-flex justify-content-between fw-bolder fs-6 text-gray-800 w-100 mt-auto mb-3'>
        <span>Your Goal</span>
      </div>
      <div className='w-100 bg-light-info rounded mb-2' style={{height: 24}}>
        <div
          className='bg-info rounded'
          role='progressbar'
          style={{height: 24, width: '37%'}}
          aria-valuenow={50}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className='fw-semibold fs-7 text-primary w-100 mt-auto'>
        <span>reached 37% of your target</span>
      </div>
    </div>
  )
}

export {AsideMenuProgress}
