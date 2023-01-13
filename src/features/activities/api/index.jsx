import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const CORE_URL = `${API_URL}/core`

// POST
export const GET_ACTIVITY_STATS_URL = `${CORE_URL}/getactivitystats/`
export const GET_ACTIVITY_SUMMARY_INFO_URL = `${CORE_URL}/getactivitysummaryinfo/`
export const GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL = `${CORE_URL}/getactivitytotalamount/`

export const getActivitySummaryStats = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_STATS_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getActivitySummaryCount = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_INFO_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getActivitySummaryTotal = (accountId) => {
  return axios
    .post(`${GET_ACTIVITY_SUMMARY_TOTAL_AMOUNT_URL}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}
