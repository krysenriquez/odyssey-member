import {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {upgradeMember} from '../../api'
import {useVerificationContext} from '../../stores/VerificationProvider'
import {useAccount} from '@/providers/AccountProvider'
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

export const UpgradeForm = () => {
  const {setVerified, setPackagePlan, setActivationCode} = useVerificationContext()
  const {currentAccount} = useAccount()

  const swal = withReactContent(Swal)

  const [initialActivationCode, setInitialActivationCode] = useState({
    activationCode: '',
    accountId: currentAccount.accountId,
  })

  return (
    <Formik
      validationSchema={activationCodeSchema}
      initialValues={initialActivationCode}
      onSubmit={async (values, actions) => {
        values.activationCode = values.activationCode.replace(/-|_/g, '')
        actions.setSubmitting(true)
        try {
          const {data: response} = await upgradeMember(values)
          actions.resetForm()
          swal.fire('Code Verified', response.message, 'success').then((result) => {
            if (result.value) {
              setVerified(true)
              setActivationCode(values.activationCode)
              setPackagePlan(response.package)
            }
          })
        } catch (error) {
          actions.setStatus('The login detail is incorrect')
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
