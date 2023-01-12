import {useEffect, useState} from 'react'
import InputMask from 'react-input-mask'

export function DebouncedInputMask(props) {
  const {value: initialValue, onChange, debounce = 3000, mask} = props
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <InputMask mask={mask} {...props} value={value} onChange={(e) => setValue(e.target.value)} />
  )
}
