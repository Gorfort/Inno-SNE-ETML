<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const users = ref([])
const notAllowed = ref(false)
onMounted(async () => {
  await axios
    .getAdmin()
    .then((response) => {
      users.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
      notAllowed.value = true
    })
})
</script>

<template>
  <p class="notAllowed" v-show="notAllowed">You're not allowed</p>
  <div v-for="element in users" :key="element.id" class="users">
    <h1>{{ element.username }}</h1>
    <p>{{ element.email }}</p>
  </div>
</template>

<style scoped>
.notAllowed {
  color: red;
}
</style>
