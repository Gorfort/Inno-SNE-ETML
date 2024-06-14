<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const users = ref([])
const notAllowed = ref(false)

onMounted(async () => {
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
    <p class="notAllowed" v-show="notAllowed">You're not allowed</p>
    <div v-if="users.length > 0" class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h1>{{ user.username }}</h1>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <div v-else>
      <p>No users found.</p>
    </div>
  </div>
</template>

<style scoped>
.notAllowed {
  color: red;
  margin-bottom: 1rem;
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
