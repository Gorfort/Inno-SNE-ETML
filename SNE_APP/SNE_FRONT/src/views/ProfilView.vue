<script setup>
import { ref } from 'vue'
import axios from '@/Services/axios'

const users = ref()
const user = ref({})
try {
  axios.getUser().then((response) => {
    users.value = response.data.data
    user.value = users.value[0]
    console.log(user.value)
  })
} catch (error) {
  console.log(error)
}
</script>

<template>
  <div class="about">
    <h1>{{ user.username }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<style></style>
