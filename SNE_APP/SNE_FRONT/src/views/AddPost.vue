<script setup>
import { ref } from 'vue'
import axios from '@/Services/axios'
import router from '@/router'

const post = ref({})

async function onSubmit() {
  await axios
    .addPost(post)
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
