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
    <h1 style="text-align: center;">Login</h1> <!-- Center-align the h1 heading -->
    <form @submit.prevent="OnSubmit">
      <input type="text" placeholder="Username" v-model="user.username" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <p class="success" v-show="Successful">Connection Successful</p>
      <p class="failed" v-show="failed">Connection failed</p>
      <button>Submit</button>
    </form>
  </div>
</template>



<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #cccccc;
}

input[type="text"],
input[type="password"] {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.success,
.failed {
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
}

.success {
  color: green;
}

.failed {
  color: red;
}
</style>
