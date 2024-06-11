<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const postArray = ref([])
const post = ref({})
const comments = ref([])

const commentContent = ref()
const comment = ref({})

let noComments = false
const props = defineProps({
  id: {
    required: true
  }
})

onMounted(async () => {
  await axios
    .getPost(props.id)
    .then((response) => {
      postArray.value = response.data.data
      post.value = postArray.value[0]
    })
    .catch((error) => {
      console.log(error)
    })

  axios
    .getCommentsByPost(props.id)
    .then((response) => {
      comments.value = response.data.result
    })
    .catch((error) => {
      noComments = true
      console.log(error)
    })
})

async function onSubmit() {
  comment.value.comment = commentContent

  comment.value.fk_Post = props.id
  console.log(comment.value)
  await axios
    .addComment(comment.value)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div>
    <div id="post">
      <h1>{{ post.title }}</h1>
      <h3>{{ post.content }}</h3>
      <p>{{ post.username }}</p>

      <p>_____________________________________</p>
    </div>
    <div id="comments">
      <form @submit="onSubmit">
        <input type="text" placeholder="Ajouter un commentaire" v-model="commentContent" />
        <button type="submit" value="Submit">Envoyer</button>
      </form>
      <div v-show="noComments">Aucun commentaire</div>

      <div class="comment" v-for="comment in comments" :key="comment.idComment">
        <p>{{ comment.username }}</p>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
