<script setup>
import { ref } from 'vue'
import axios from '@/Services/axios'
import { useRouter } from 'vue-router'

const user = ref({})
const router = useRouter()

async function OnSubmit() {
  try {
    await axios.signup(user.value)
    user.value.username = ''
    user.value.password = ''
    user.value.email = ''
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}

// Set the page title dynamically
document.title = 'ESN - Sign Up';
</script>

<template>
  <div>
    <h1 style="text-align: center;">Sign Up</h1>
    <form @submit.prevent="OnSubmit">
      <input type="text" placeholder="Username" v-model="user.username" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <input type="email" placeholder="Email" v-model="user.email">
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
  background-color: #ffffff;
  margin-top: 15px;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus {
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
