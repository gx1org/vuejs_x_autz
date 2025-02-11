<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore()
const user = auth.user
const router = useRouter()
</script>

<template>
  <div>
    <img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Welcome back, {{ user.name }}!</h1>
    <p class="text-muted small my-3">
        Here is your data
    </p>
    <div class="form-floating">
      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="demo@example.com" :value="user.email" disabled>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="demo@example.com" :value="user.phone || '-'" disabled>
      <label for="floatingInput">Phone number</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="demo@example.com" :value="user.address || '-'" disabled>
      <label for="floatingInput">Address</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="demo@example.com" :value="user.dob || '-'" disabled>
      <label for="floatingInput">Date of Birth</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="demo@example.com" :value="user.gender || '-'" disabled>
      <label for="floatingInput">Gender</label>
    </div>
    <button @click="auth.setLogout();router.push('/')" class=" mt-3 btn btn-outline-danger w-100 py-2" type="submit">
        Logout
    </button>
  </div>
</template>