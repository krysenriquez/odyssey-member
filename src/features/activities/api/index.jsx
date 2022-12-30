import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const CORE_URL = `${API_URL}/core`

// POST
export const GET_ACTIVITY_SUMMARY_INFO = `${CORE_URL}/getactivitysummaryinfo/`
export const GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT = `${CORE_URL}/getactivitytotalamount/`

export const getActivitySummaryInfo = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_INFO}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getActivitySummaryTotal = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}
