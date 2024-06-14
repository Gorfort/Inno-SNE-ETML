<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/Services/axios'
import ThePost from '@/components/ThePost.vue'

const posts = ref([])

onMounted(async () => {
  try {
    const response = await axios.getPosts()
    posts.value = response.data.data

    // Set document title
    document.title = 'ESN - Home';
  } catch (error) {
    console.log(error)
  }
})

// Optional: Reset document title on component unmount
onBeforeUnmount(() => {
  document.title = 'Original Title'; // Replace with your original title
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
  background-color: #e4e4e4;
}

.post {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #ffffff;
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
