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
<style scoped>
body {
  background-color: #121212; /* Dark background for the body */
  color: #e0e0e0; /* Light text color */
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #1e1e1e; /* Dark background for the form */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

form input[type="text"],
form textarea {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #e0e0e0;
  font-size: 1rem;
}

form textarea {
  resize: vertical; /* Allow vertical resizing */
  height: 150px; /* Default height for the textarea */
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

