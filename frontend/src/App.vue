<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const auth = useAuthStore()
</script>

<template>
  <main class="form-signin w-100 m-auto" v-if="!auth.isLoading">
    <RouterView />
    <p class="mt-5 mb-3 text-body-secondary text-center">&copy; VueJS x Autz.org</p>
  </main>
</template>
