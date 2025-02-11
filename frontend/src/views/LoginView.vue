<script setup>

import { ref } from 'vue';
import { apiReq, handleErrorApi } from '../helpers/fns';
import { useAuthStore } from '../stores/auth';
import { kunberAppID } from '../helpers/constant';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const auth = useAuthStore()
const form = ref({
  email: '',
  password: ''
})
const router = useRouter()

const loginBtn = () => {
  apiReq('post', '/login', form.value).then(async res => {
    auth.setAuth(res.data)
    router.push('/home')
  })
  .catch(handleErrorApi)
}
onMounted(() => {
  if (auth.isLogin) {
    router.push('/home')
  }
})
</script>

<template>
  <div>
    <img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <div class="alert alert-info small my-3">
        User demo
        <ul class="mb-0">
            <li>
            email: <code>demo@example.com</code>
            </li>
            <li>
            password: <code>demo123</code>
            </li>
        </ul>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" v-model="form.email" id="floatingInput">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" v-model="form.password" id="floatingPassword">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" @click="loginBtn">Sign in</button>
    <p class="my-3 text-center text-muted">OR</p>
    <a :href="`https://kunber.zone.id/onboarding/${kunberAppID}?callback_url=http://localhost:3001/authorize_kunber`" class="btn btn-outline-primary w-100 py-2">
        Continue with Kunber &nearr;
    </a>
  </div>
</template>