import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_CASHOUTS_URL = `${CORE_URL}/getcashouts`
export const REQUEST_CASHOUT_URL = `${CORE_URL}/request/`

export const getCashouts = (accountId) => {
  return axios
    .get(`${GET_CASHOUTS_URL}`, {params: {account_id: accountId}})
    .then((d) => humps.camelizeKeys(d.data))
}

export const requestCashout = (values) => {
  return axios.post(`${REQUEST_CASHOUT_URL}`, humps.decamelizeKeys(values))
}
