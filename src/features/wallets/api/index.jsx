import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const CORE_URL = `${API_URL}/core`

// GET
export const GET_MEMBER_WALLET_SUMMARY_LIST = `${CORE_URL}/getwalletsummarylist`
// POST
export const GET_WALLET_SUMMARY = `${CORE_URL}/getwalletsummary/`
export const GET_PV_WALLET_SUMMARY = `${CORE_URL}/getpvwalletsummary/`

export const getMemberWalletSummaryList = (accountId, wallet) => {
  return axios
    .get(`${GET_MEMBER_WALLET_SUMMARY_LIST}`, {params: {account_id: accountId, wallet: wallet}})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getWalletSummary = (accountId) => {
  return axios
    .post(`${GET_WALLET_SUMMARY}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getPvWalletSummary = (accountId) => {
  return axios
    .post(`${GET_PV_WALLET_SUMMARY}`, {account_id: accountId})
    .then((d) => humps.camelizeKeys(d.data))
}
