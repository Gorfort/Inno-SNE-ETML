<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import router from '@/router'

const post = ref({})

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
})

async function onSubmit() {
  console.log(post.value)
  await axios
    .addPost(post.value)
    .then((response) => {
      console.log(response)
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Titre" v-model="post.title" />
      <textarea placeholder="Content" v-model="post.content"></textarea>
      <button type="submit" value="Submit">Poster</button>
    </form>
  </div>
</template>

<style scoped></style>
