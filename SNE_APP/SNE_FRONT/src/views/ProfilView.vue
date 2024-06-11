<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import router from '@/router'

const users = ref([])
const user = ref({})

onMounted(async () => {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  }

  if (isConnected) {
    try {
      const response = await axios.getUser()
      users.value = response.data.data
      user.value = users.value[0]
    } catch (error) {
      console.log(error)
    }
  }
})

async function logOut() {
  await sessionStorage.clear()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="about">
    <div class="user-profile">
      <h1>{{ user.username }}</h1>
      <p>{{ user.email }}</p>
    </div>
    <button class="logout-btn" @click="logOut">Log Out</button>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.user-profile {
  background-color: #1e1e1e; /* Dark background for the user profile */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  text-align: center;
}

.user-profile h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #ffffff; /* Light text color */
}

.user-profile p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #b0b0b0; /* Slightly lighter text color */
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #0056b3;
}
</style>
