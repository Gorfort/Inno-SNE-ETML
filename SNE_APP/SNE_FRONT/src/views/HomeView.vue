<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import ThePost from '@/components/ThePost.vue'

const posts = ref([])

onMounted(async () => {
  try {
    const response = await axios.getPosts()
    posts.value = response.data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div id="main">
    <h1 style="text-align: center;">Fil d'actualité</h1> <!-- Centered h1 heading -->
    <ThePost v-for="post in posts" :key="post.idPost" :post="post" />
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
}

.post {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #cccccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  color: #000000;
  font-weight: bold;
}

.post:last-child {
  margin-bottom: 0;
}

.post:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}
</style>
