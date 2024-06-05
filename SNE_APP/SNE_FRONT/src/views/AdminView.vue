<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const users = ref([])
const notAllowed = ref(false)
onMounted(async () => {
  try {
    const response = await axios.getAdmin()
    users.value = response.data.result
    console.log(users.value)
  } catch (error) {
    console.log(error)
    notAllowed.value = true
  }
})
</script>

<template>
  <p class="notAllowed" v-show="notAllowed">You're note allowed</p>
  <div v-for="element in users" :key="element.id" class="users">
    <h1>{{ element.username }}</h1>
    <p>{{ element.email }}</p>
  </div>
</template>

<style scoped>
.users {
  color: white;
}

.notAllowed {
  color: red;
}
</style>
