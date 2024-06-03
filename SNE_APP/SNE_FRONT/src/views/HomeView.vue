<script setup>
import { ref } from 'vue'
import axios from '@/Services/axios'

const user = ref({})
let Successful = ref(false)
let failed = ref(false)
async function OnSubmit() {
  try {
    await axios.login(user.value)
    Successful.value = true
    user.value.username = ''
    user.value.password = ''
  } catch (error) {
    failed.value = true
    console.log(error)
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="OnSubmit">
      <input type="text" placeholder="Username" v-model="user.username" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <p class="success" v-show="Successful">Connection Successful</p>
      <p class="failed" v-show="failed">Connected failed</p>
      <button>Submit</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.success {
  color: green;
}

.failed {
  color: red;
}
</style>
