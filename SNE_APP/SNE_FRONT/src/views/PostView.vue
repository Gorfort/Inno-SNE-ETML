<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const postArray = ref([])
const post = ref({})
const comments = ref([])

const commentContent = ref('')
const comment = ref({})

let noComments = ref(false)
const props = defineProps({
  id: {
    required: true
  }
})

onMounted(async () => {
  try {
    const response = await axios.getPost(props.id)
    postArray.value = response.data.data
    post.value = postArray.value[0]
  } catch (error) {
    console.log(error)
  }

  try {
    const response = await axios.getCommentsByPost(props.id)
    comments.value = response.data.result
  } catch (error) {
    noComments.value = true
    console.log(error)
  }
})

async function onSubmit() {
  comment.value.comment = commentContent.value
  comment.value.fk_Post = props.id

  try {
    const response = await axios.addComment(comment.value)
    console.log(response)
    // Refresh comments list after adding a new comment
    const responseComments = await axios.getCommentsByPost(props.id)
    comments.value = responseComments.data.result
    commentContent.value = '' // Clear the input field after submission
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <div id="post">
      <p>{{ post.username }}</p>
      <h1>{{ post.title }}</h1>
      <h3>{{ post.content }}</h3>
    </div>
    <div id="comments">
      <div v-show="noComments">Aucun commentaire</div>
      <div class="comment" v-for="comment in comments" :key="comment.idComment">
        <p>{{ comment.username }}</p>
        <p>{{ comment.comment }}</p>
      </div>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Ajouter un commentaire" v-model="commentContent" />
        <button type="submit" value="Submit">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #121212; /* Dark background for the body */
  color: #e0e0e0; /* Light text color */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#post {
  background-color: #1e1e1e; /* Dark background for the post */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 2rem auto;
  width: 100%;
  max-width: 600px;
}

#post h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff; /* Light text color */
}

#post h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #b0b0b0; /* Slightly lighter text color */
}

#post p {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #a0a0a0; /* Lighter text color */
}

#comments {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  background-color: #2b2b2b;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

form input[type="text"] {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  font-size: 1rem;
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

.comment {
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

.comment p {
  margin: 0.5rem 0;
  color: #e0e0e0;
}

.comment p:first-child {
  font-weight: bold;
  color: #ffffff;
}
#post p:first-child {
  margin-bottom: 0px; /* Adjust the margin as needed */
}

</style>
