<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import router from '@/router'

const users = ref()
const user = ref({})

// Permet de vérifié si l'utilisateur est bien connecté
onMounted(async () => {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  // Si l'utilisateur n'est pas connecter il est renvoyer à la page de connexion
  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  }

  if (isConnected) {
    try {
      axios.getUser().then((response) => {
        users.value = response.data.data
        user.value = users.value[0]
      })
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
    <h1>{{ user.username }}</h1>
    <p>{{ user.email }}</p>
    <button @click="logOut">Log Out</button>
  </div>
</template>

<style></style>
