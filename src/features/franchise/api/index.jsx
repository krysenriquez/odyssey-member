import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const CREATE_FRANCHISEE_URL = `${CORE_URL}/createfranchisee/`
export const VERIFY_FRANCHISEE_CODE_URL = `${CORE_URL}/verifyfranchisecode/`

export const createFranchisee = (values) => {
  return axios.post(CREATE_FRANCHISEE_URL, humps.decamelizeKeys(values))
}
export const verifycode = (values) => {
  return axios.post(VERIFY_FRANCHISEE_CODE_URL, humps.decamelizeKeys(values))
}
