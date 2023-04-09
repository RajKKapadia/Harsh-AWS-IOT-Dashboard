import Cookies from 'universal-cookie'

const cookies = new Cookies()


export const setCookie = (key,value)=>{
  cookies.set(key, value, { path: '/', domain:  `${window.location.hostname}` })
}

export const getCookie = (key) =>{
  return cookies.get(key)
}

export const removeCookie = (key) =>{
  cookies.remove(key, { path: '/', domain: `${window.location.hostname}` })
}