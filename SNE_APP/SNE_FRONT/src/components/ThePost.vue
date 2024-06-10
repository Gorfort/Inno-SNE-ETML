<script setup>
import router from '@/router'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

function commentClicked(idPost) {
  router.push({ name: 'post-view', params: { id: idPost } })
}
</script>

<template>
  <h1>{{ post.title }}</h1>
  <p>{{ post.content }}</p>
  <p>{{ post.username }}</p>

  <button @click="commentClicked(post.idPost)">commentaires</button>
</template>

<style scoped></style>
