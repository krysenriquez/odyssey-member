import Step from './Step'

export const Stepper = (props) => {
  return (
    <div className='d-flex flex-row-fluid justify-content-center p-10'>
      <div className='stepper-nav'>
        {props.steps.map((item, index) => (
          <Step key={index} index={index} title={item.title} subTitle={item.subTitle}></Step>
        ))}
      </div>
    </div>
  )
}
