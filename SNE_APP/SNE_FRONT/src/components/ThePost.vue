<script setup>
import router from '@/router'
import axios from '@/Services/axios'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

async function deletePost(Post) {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  } else {
    const idPost = Post.idPost
    const username = Post.username
    const response = await axios.getUser()
    const user = response.data.data[0]

    if(user.username == username || user.isAdmin) {
      const isDeleted = confirm("Are you sure to deleted this post")
      if(isDeleted) {
        await axios.deletePost(idPost)
        location.reload()
      }
    } else {
      alert("Sorry but you can only delete your own post")
    }
  }
}

async function modifyPost(Post) {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  const idPost = Post.idPost
  const username = Post.username
  const response = await axios.getUser()
  const user = response.data.data[0]

  console.log(user.username)
  console.log(username)

  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  } else {
    if(user.username == username || user.isAdmin) {
      router.push({ name: 'post-update', params: { id: idPost } })
    } else {
      alert("Sorry but you can edit only your post")
    }
  }
}

async function commentClicked(idPost) {
  const isConnected = () => {
    return !!sessionStorage.getItem('token')
  }

  // Si l'utilisateur n'est pas connecté, il est renvoyé à la page de connexion
  if (!isConnected()) {
    await alert("You're not connected, please login")
    router.push({ name: 'login' })
  } else {
    router.push({ name: 'post-view', params: { id: idPost } })
  }
}
</script>

<template>
  <div class="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <p class="username">{{ post.username }}</p>

    <button @click="commentClicked(post.idPost)">commentaires</button>
    <button @click="modifyPost(post)">Modifier ce post</button>
    <button @click="deletePost(post)">Supprimmer ce post</button>
  </div>
</template>

<style scoped>
.post {
  background-color: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.post p {
  margin: 10px 0;
}

.username {
  color: #657786;
  font-size: 0.9em;
}

button {
  background-color: #1da1f2;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
}

button:hover {
  background-color: #0d95e8;
}
</style>
