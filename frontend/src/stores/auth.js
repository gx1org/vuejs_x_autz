import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiReq } from '../helpers/fns'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(true)
  const jwtToken = ref('')
  const user = ref({})

  const isLogin = computed(() => user.value.id)
  const authHeader = computed(() => {
    return {
      headers: {
        Authorization: jwtToken.value
      }
    }
  })

  const loginByToken = async () => {
    let token = localStorage.token || ''
    if (!token) {
      isLoading.value = false
      return
    }

    await apiReq('post', '/loginbytoken', { token })
      .then(res => {
        setAuth(res.data)
      }).catch(err => {
        if ([401].includes(err.response.status)) {
          setLogout()
        }
        isLoading.value = false
      })
  }

  const setAuth = (data) => {
    user.value = data.user
    jwtToken.value = data.token
    isLoading.value = false
    localStorage.setItem('token', data.token)
  }

  const setLogout = () => {
    user.value = {}
    jwtToken.value = ''
    localStorage.removeItem('token')
  }

  const updateUser = (data) => {
    user.value = data
  }

  return {
    user,
    isLogin,
    isLoading,
    jwtToken,
    authHeader,
    loginByToken,
    setAuth,
    setLogout,
    updateUser,
  }
})
