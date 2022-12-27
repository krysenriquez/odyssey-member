import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`
const ACCOUNTS_URL = `${API_URL}/accounts`

const VERIFY_CODE_URL = `${CORE_URL}/verifycode/`
const VERIFY_ACCOUNT_NUMBER_URL = `${ACCOUNTS_URL}/verifyaccountnumber/`
export const CREATE_MEMBER_URL = `${ACCOUNTS_URL}/create/`

export const verifycode = (values) => {
  return axios.post(VERIFY_CODE_URL, humps.decamelizeKeys(values))
}

export const createMember = (member) => {
  return axios.post(`${CREATE_MEMBER_URL}`, humps.decamelizeKeys(member))
}

export const verifyAccountNumber = (value) => {
  return axios.post(`${VERIFY_ACCOUNT_NUMBER_URL}`, {account_id: value})
}
