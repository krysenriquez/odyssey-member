import clsx from 'clsx'

const CustomCardBodyOverlay = (props) => {
  const {children, scroll, height, isLoading} = props
  return (
    <div
      className={clsx(
        'card-body',
        {
          'card-scroll': scroll,
        },
        height && `h-${height}px`
      )}
    >
      <div className='overlay-wrapper p-5'>{children}</div>
      {isLoading ? (
        <div className='overlay-layer rounded bg-dark bg-opacity-5'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export {CustomCardBodyOverlay}
