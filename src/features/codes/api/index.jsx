import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_ACCOUNT_CODES = `${CORE_URL}/getaccountcodes/`

export const getAccountCodes = (accountId) => {
  return axios
    .get(`${GET_ACCOUNT_CODES}`, {params: {account_id: accountId}})
    .then((d) => humps.camelizeKeys(d.data))
}
