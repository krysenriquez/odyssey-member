export default {
  formId: 'registrationForm',
  formField: {
    parentAccountId: {
      key: 'parentAccountId',
      name: 'parentAccountId',
      label: 'Parent Account Number',
      requiredErrorMsg: 'Parent Account Number is required',
    },
    parentAccountName: {
      key: 'parentAccountName',
      name: 'parentAccountName',
      label: 'Parent Account Name',
      requiredErrorMsg: 'Parent Account Name is required',
    },
    parentSide: {
      key: 'parentSide',
      name: 'parentSide',
      label: 'Parent Side',
      requiredErrorMsg: 'Parent Side is required',
    },
    sponsorAccountId: {
      key: 'sponsorAccountId',
      name: 'sponsorAccountId',
      label: 'Sponsor Account Number',
      requiredErrorMsg: 'Sponsor Account Number is required',
    },
    sponsorAccountName: {
      key: 'sponsorAccountName',
      name: 'sponsorAccountName',
      label: 'Sponsor Account Name',
      requiredErrorMsg: 'Sponsor Account Name is required',
    },
    firstName: {
      key: 'firstName',
      name: 'firstName',
      label: 'First Name',
      requiredErrorMsg: 'First name is required',
    },
    middleName: {
      key: 'middleName',
      name: 'middleName',
      label: 'Middle Name',
      requiredErrorMsg: 'Middle name is required',
    },
    lastName: {
      key: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      requiredErrorMsg: 'Last name is required',
    },
    personalInfo: {
      birthdate: {
        key: 'birthdate',
        name: 'personalInfo.birthdate',
        label: 'Birthdate',
        requiredErrorMsg: 'Birthdate is required',
      },
      gender: {
        key: 'gender',
        name: 'personalInfo.gender',
        label: 'Gender',
        requiredErrorMsg: 'Gender is required',
      },
    },
    contactInfo: {
      contactNumber: {
        key: 'contactNumber',
        name: 'contactInfo.contactNumber',
        label: 'Contact Number',
        requiredErrorMsg: 'Contact Number is required',
      },
    },
    addressInfo: {
      street: {
        key: 'street',
        name: 'addressInfo.street',
        label: 'Street',
      },
      city: {
        key: 'city',
        name: 'addressInfo.city',
        label: 'City',
        requiredErrorMsg: 'City is required',
      },
      state: {
        key: 'state',
        name: 'addressInfo.state',
        label: 'Province/Region',
        requiredErrorMsg: 'Province is required',
      },
    },
    user: {
      username: {
        key: 'username',
        name: 'user.username',
        label: 'Username',
        min: 8,
        max: 20,
        requiredErrorMsg: 'Username is required',
      },
      emailAddress: {
        key: 'emailAddress',
        name: 'user.emailAddress',
        label: 'Email Address',
        requiredErrorMsg: 'Email Address is required',
        invalidErrorMsg: 'Invalid Email format',
      },
      password: {
        key: 'password',
        name: 'user.password',
        label: 'Password',
        requiredErrorMsg: 'Password is required',
      },
      repeatPassword: {
        key: 'repeatPassword',
        name: 'user.repeatPassword',
        label: 'Repeat Password',
        requiredErrorMsg: 'Repeat Password is required',
        invalidErrorMsg: 'Passwords must match',
      },
    },
  },
}
