<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import { useRouter } from 'vue-router'

const users = ref([])
const notAllowed = ref(false)
const router = useRouter()

onMounted(async () => {
  document.title = 'ESN - Admin'
  try {
    const response = await axios.getAdmin()
    users.value = response.data.data
  } catch (error) {
    console.log(error)
    notAllowed.value = true
  }
})
</script>

<template>
  <div>
    <h1>Page Admin</h1>
    <div v-if="notAllowed" class="center-container">
      <p class="notAllowed">You need to be an Admin to access this page</p>
      <router-link to="/" class="home-button">Go to Home</router-link>
    </div>
    <div v-if="users.length > 0 && !notAllowed" class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h1>{{ user.username }}</h1>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <div v-else-if="!notAllowed">
      <p>No users found.</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  text-align: center;
}

.notAllowed {
  color: red;
  margin-bottom: 2rem;
}

.home-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
}

.home-button:hover {
  background-color: #0056b3;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.user-card {
  background-color: #cccccc;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.user-card h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
}

.user-card p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #630077;
}
</style>
