import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`
const ACCOUNTS_URL = `${API_URL}/accounts`

export const GET_ACCOUNT_CASHOUT_METHODS = `${ACCOUNTS_URL}/getaccountcashoutmethods/`

export const GET_CASHOUTS_URL = `${CORE_URL}/getcashouts`
export const GET_CASHOUT_METHODS_URL = `${CORE_URL}/getcashoutmethods/`
export const GET_CASHOUT_TOTAL_URL = `${CORE_URL}/getcashouttotal/`
export const GET_CASHOUT_TOTAL_FEE_URL = `${CORE_URL}/getcashouttotalfee/`
export const GET_WALLET_CASHOUT_SCHEDULE = `${CORE_URL}/checkwalletcashout/`
export const GET_ALL_WALLET_CASHOUT_SCHEDULES = `${CORE_URL}/getcashoutschedule/`
export const GET_WALLET_MAX_CASHOUT = `${CORE_URL}/checkwalletmaxcashout/`
export const REQUEST_CASHOUT_URL = `${CORE_URL}/request/`
export const GET_CASHOUT_INFO_URL = `${CORE_URL}/getcashoutinfo`

export const getAccountCashoutMethods = (values) => {
  return axios
    .get(`${GET_ACCOUNT_CASHOUT_METHODS}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCashouts = (accountId) => {
  return axios
    .get(`${GET_CASHOUTS_URL}`, {params: {account_id: accountId}})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCashout = (values) => {
  return axios
    .get(`${GET_CASHOUT_INFO_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getCashoutMethods = () => {
  return axios.post(`${GET_CASHOUT_METHODS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getCashoutTotal = (values) => {
  return axios
    .post(`${GET_CASHOUT_TOTAL_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCashoutTotalFee = () => {
  return axios.post(`${GET_CASHOUT_TOTAL_FEE_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getWalletCashoutSchedule = (values) => {
  return axios.post(`${GET_WALLET_CASHOUT_SCHEDULE}`, humps.decamelizeKeys(values))
}

export const getAllWalletCashoutSchedule = () => {
  return axios.post(`${GET_ALL_WALLET_CASHOUT_SCHEDULES}`)
}

export const getWalletMaxCashout = (values) => {
  return axios.post(`${GET_WALLET_MAX_CASHOUT}`, humps.decamelizeKeys(values))
}

export const requestCashout = (values) => {
  return axios.post(`${REQUEST_CASHOUT_URL}`, humps.decamelizeKeys(values))
}
