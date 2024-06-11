<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'
import ThePost from '@/components/ThePost.vue'

const posts = ref([])

onMounted(async () => {
  try {
    await axios.getPosts().then((response) => {
      posts.value = response.data.data
      console.log(response)
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div id="main">
    <ThePost class="post" v-for="post in posts" :key="post.idPost" :post="post" />
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #121212; /* Dark background for the main container */
}

.post {
  width: 100%;
  max-width: 600px;
  margin: 1rem 0;  /* Margin to separate posts */
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #1e1e1e; /* Dark background for the post */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Darker shadow */
  transition: box-shadow 0.3s ease;
  color: #e0e0e0; /* Light text color */
}

.post + .post {
  margin-top: 1.5rem; /* Additional margin to ensure clear separation */
}

.post:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7); /* Darker shadow on hover */
}
</style>
