import {useField} from 'formik'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'

export const FormDatePicker = (props) => {
  const {name, className} = props
  const [field, meta, helpers] = useField(name)
  const {value} = meta
  const {setValue} = helpers

  const convertDate = (date) => {
    var convertedDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    return convertedDate
  }

  return (
    <DatePicker
      {...field}
      selected={value}
      dateFormat='yyyy-MM-dd'
      onChange={(date) => setValue(date)}
      className={clsx(className && className)}
    />
  )
}
