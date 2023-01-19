import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const AUTH_URL = `${API_URL}/vanguard`
const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_URL}/whoami/`
const LOGIN_URL = `${AUTH_URL}/login/`
const REFRESH_URL = `${AUTH_URL}/refresh/`
export const REQUEST_RESET_PASSWORD_URL = `${AUTH_URL}/requestresetpassword/`

const CORE_URL = `${API_URL}/core`
const VERIFY_CODE_URL = `${CORE_URL}/verifycode/`

const ACCOUNTS_URL = `${API_URL}/accounts`
const GET_ACCOUNTS_URL = `${ACCOUNTS_URL}/getaccount`

const USER_URL = `${API_URL}/users`
const RESET_PASSWORD_URL = `${USER_URL}/resetpassword/`

export function login(username, password) {
  return axios.post(LOGIN_URL, {username, password})
}

export function refreshToken(refresh) {
  return axios.post(`${REFRESH_URL}`, {
    refresh,
  })
}

export function requestResetPassword(values) {
  return axios.post(`${REQUEST_RESET_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

export function verifyResetPassword(values) {
  return axios
    .get(`${REQUEST_RESET_PASSWORD_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data))
}

export function resetPassword(values, token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  }
  return axios.post(`${RESET_PASSWORD_URL}`, humps.decamelizeKeys(values), config)
}

export function getUserByToken(token) {
  return axios.post(`${GET_USER_BY_ACCESSTOKEN_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function verifycode(values) {
  return axios.post(VERIFY_CODE_URL, humps.decamelizeKeys(values))
}

export function getAccount() {
  return axios.get(`${GET_ACCOUNTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}
