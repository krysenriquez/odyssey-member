import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
export const StepCompleted = () => {
  return (
    <div className='w-100 text-center'>
      <h1 className='fw-bold text-dark mb-3'>One Step Away!</h1>
      <div className='text-muted fw-semibold fs-3'>
        Submit your application to create your account.
      </div>
      <div className='text-center px-4 py-15'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/public/media/logos/tci.png')}
          className='mw-100 mh-250px'
        />
      </div>
    </div>
  )
}
