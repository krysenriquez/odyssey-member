import clsx from 'clsx'

export default function Step(props) {
  return (
    <div className='stepper-item current'>
      <div className='stepper-wrapper'>
        <div className='stepper-icon rounded-3'>
          <i className='stepper-check fas fa-check' />
          <span className='stepper-number'>{props.index + 1}</span>
        </div>
        <div className='stepper-label'>
          <h3 className='stepper-title fs-2'>{props.title}</h3>
          <div className='stepper-desc fw-normal'>{props.subTitle}</div>
        </div>
      </div>
      <div className='stepper-line h-40px' />
    </div>
  )
}

