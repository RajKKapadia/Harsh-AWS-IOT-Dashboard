import { getCookie, removeCookie, setCookie } from '../storage/storage'

export const setAuthToken = (token) => {
  setCookie('AUTH_TOKEN', token)
}
export const getAuthToken = () => {
  return getCookie('AUTH_TOKEN')
}

export const removeAuthToken = () => {
  return removeCookie('AUTH_TOKEN')
}

export const isLoggedIn = () => {
  if (getAuthToken()) {
    return true
  } else {
    return false
  }
}

export const loggedOut = () =>{
  removeAuthToken()
}