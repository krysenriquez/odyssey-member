import {useRegistrationContext} from '@/features/account/stores/RegistrationProvider'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import {useState} from 'react'
import {useEffect} from 'react'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'

const parentSides = [
  {
    value: null,
    label: 'Select Side',
  },
  {
    value: 'LEFT',
    label: 'Left',
  },
  {
    value: 'RIGHT',
    label: 'Right',
  },
]

export const StepGenealogy = (props) => {
  const {
    formField: {
      sponsorAccountId,
      sponsorAccountName,
      parentAccountId,
      parentAccountName,
      parentSide,
    },
  } = props
  const {node} = useRegistrationContext()
  const [disableField, setDisableField] = useState(false)

  useEffect(() => {
    if (node) {
      setDisableField(true)
    }
  }, [node])

  return (
    <div className='w-100'>
      <div className='mb-10 row'>
        <div className='col-6'>
          <InputField
            name={sponsorAccountId.name}
            label={sponsorAccountId.label}
            required
            disabled={disableField}
          />
        </div>
        <div className='col-6'>
          <InputField
            name={sponsorAccountName.name}
            label={sponsorAccountName.label}
            required
            disabled
          />
        </div>
      </div>
      <div className='mb-10 row'>
        <div className='col-6'>
          <InputField
            name={parentAccountId.name}
            label={parentAccountId.label}
            required
            disabled={disableField}
          />
        </div>
        <div className='col-6'>
          <InputField
            name={parentAccountName.name}
            label={parentAccountName.label}
            required
            disabled
          />
        </div>
      </div>
      <div className='mb-10 row'>
        <div className='col-12'>
          <SelectField
            name={parentSide.name}
            label={parentSide.label}
            data={parentSides}
            required
            disabled={disableField}
          />
        </div>
      </div>
    </div>
  )
}
