<script setup>
import router from '@/router'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

async function commentClicked(idPost) {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  // Si l'utilisateur n'est pas connecter il est renvoyer à la page de connexion
  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  } else {
    router.push({ name: 'post-view', params: { id: idPost } })
  }
}
</script>

<template>
  <h1>{{ post.title }}</h1>
  <p>{{ post.content }}</p>
  <p>{{ post.username }}</p>

  <button @click="commentClicked(post.idPost)">commentaires</button>
</template>

<style scoped></style>
