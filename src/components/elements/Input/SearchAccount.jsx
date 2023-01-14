import {useEffect, useState} from 'react'
import InputMask from 'react-input-mask'
import {CustomSVG} from '../SVG/CustomSVG'

export function SearchAccount(props) {
  const {mask, handleClick, ...rest} = props
  const [value, setValue] = useState('')

  const searchAccount = () => {
    return value
  }

  return (
    <div className='input-group input-group-solid mb-5'>
      <span className='input-group-text border-0'>
        <CustomSVG path='/media/icons/search.svg' className='svg-icon-1' />
      </span>
      <input {...rest} type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        type='button'
        className='btn btn-active-primary btn-sm'
        onClick={() => handleClick(searchAccount)}
      >
        Search
      </button>
    </div>
  )
}
