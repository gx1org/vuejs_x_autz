import axios from "axios"
import { apiURL } from './constant'
import { useAuthStore } from "../stores/auth"

export const handleErrorApi = (err) => {
  const store = useAuthStore()
  if (!err.response) {
    alert('Internal server error')
    console.error(err);
  }

  if ([401].includes(err.response.status)) {
    store.setLogout()
    location.reload()
  }
  if (!err.response.data) {
    alert('Internal server error')
    console.error(err);
  } else {
    alert(err.response.data.message)
  }
}

export const apiReq = (method, uri, payload) => {
  const store = useAuthStore()
  return axios({
    method, 
    url: apiURL + uri,
    data: payload,
    headers: {
      Authorization: store.isLogin ? store.jwtToken : undefined,
      'Content-Language': 'en'
    }
  })
}
