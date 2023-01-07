import {useThemeMode} from '@/providers/ThemeModeProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const StepCompleted = () => {
  const {mode} = useThemeMode()
  return (
    <div className='w-100 text-center'>
      <h1 className='fw-bold text-dark mb-3'>One Step Away!</h1>
      <div className='text-muted fw-semibold fs-3'>
        Submit your application to create your account.
      </div>
      <div className='text-center px-4 py-15'>
        <img
          alt='Logo'
          src={toAbsoluteUrl(
            mode == 'dark'
              ? '/public/media/illustrations/palms/creation-dark.png'
              : '/public/media/illustrations/palms/creation.png'
          )}
          className='mw-100 mh-250px'
        />
      </div>
    </div>
  )
}
