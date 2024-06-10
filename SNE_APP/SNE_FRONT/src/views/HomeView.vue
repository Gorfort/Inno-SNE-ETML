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
}
.post {
  width: 500px;
}
</style>
