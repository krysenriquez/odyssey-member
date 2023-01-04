import {useState, useRef} from 'react'
import {Field, ErrorMessage, Formik, Form} from 'formik'
import * as Yup from 'yup'
import humps from 'humps'
import InputMask from 'react-input-mask'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {verifycode} from '../../api'
import {useVerificationContext} from '../../stores/VerificationProvider'
import {ActivationCodeForm} from '@/components/elements/Form/ActivationCodeForm'

const activationCodeSchema = Yup.object().shape({
  activationCode: Yup.string()
    .required()
    .label('Activation Code')
    .test('len', 'Minimum 15 characters', (val) => {
      if (val) {
        const valWithoutMask = val.replace(/-|_/g, '').length
        return valWithoutMask === 15
      }
    }),
})

export const VerificationForm = () => {
  const {setVerified, setPackagePlan, setActivationCode} = useVerificationContext()

  const swal = withReactContent(Swal)
  const [initialActivationCode, setInitialActivationCode] = useState({
    activationCode: 'NL074O156NOIY2U',
  })

  return (
    <Formik
      validationSchema={activationCodeSchema}
      initialValues={initialActivationCode}
      onSubmit={async (values, actions) => {
        values.activationCode = values.activationCode.replace(/-|_/g, '')
        actions.setSubmitting(true)
        try {
          const {data: response} = await verifycode(values)
          actions.resetForm()
          swal.fire('Code Verified', response.message, 'success').then((result) => {
            if (result.value) {
              setVerified(true)
              setActivationCode(values.activationCode)
              setPackagePlan(response.package)
            }
          })
        } catch (error) {
          actions.setStatus('The activation code is invalid')
          actions.setSubmitting(false)
          actions.resetForm()
          swal.fire('Invalid Code', error.response.data.message, 'error').then((result) => {
            setVerified(false)
          })
        }
      }}
    >
      {(actions) => {
        return <ActivationCodeForm actions={actions} />
      }}
    </Formik>
  )
}
