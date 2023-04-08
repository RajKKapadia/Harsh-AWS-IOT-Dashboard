import Cookies from 'universal-cookie'

const cookies = new Cookies()


export const setCookie = (key,value)=>{
  cookies.set(key,value)
}

export const getCookie = (key) =>{
  return cookies.get(key)
}

export const removeCookie = (key) =>{
  return cookies.remove(key)
}