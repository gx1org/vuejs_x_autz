<script setup>

import { apiReq, handleErrorApi } from '../helpers/fns';
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import SpinnerBox from '../components/SpinnerBox.vue';

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const authorize = () => {
  apiReq('post', '/authorize_autzorg', {auth_code: route.query.auth_code}).then(res => {
    auth.setAuth(res.data)
    router.push('/home')
  })
  .catch(handleErrorApi)
  .finally(() => {
  })
}

onMounted(() => {
  if (!route.query.auth_code) {
    alert('Missing auth code')
    return
  }
  authorize()
})
</script>

<template>
  <div>
    <SpinnerBox />
  </div>
</template>