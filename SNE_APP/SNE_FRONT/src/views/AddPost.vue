<template>
  <div>
    <h1 style="text-align: center;">Ajoutez un post</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Titre" v-model="post.title" />
      <textarea placeholder="Content" v-model="post.content"></textarea>
      <button type="submit">Poster</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/Services/axios'
import router from '@/router'

const post = ref({})

// Set document title when component is mounted
onMounted(() => {
  document.title = 'ESN - Add Post'
})

// Check if the user is connected
onMounted(async () => {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  // If the user is not connected, redirect to the login page
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

<style scoped>
body {
  background-color: #121212;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  min-width: 600px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 15px;
}

form input[type="text"],
form textarea {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #eeeeee;
  color: #3d3d3d;
  font-size: 1rem;
}

form textarea {
  resize: vertical;
  height: 150px;
}

form input[type="text"]:focus,
form textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

form button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}
</style>
