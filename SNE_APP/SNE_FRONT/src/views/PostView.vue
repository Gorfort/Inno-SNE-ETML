<template>
  <div>
    <h1 class="heading">Post by {{ post.username }}</h1>
    <div id="post">
      <h2>{{ post.title }}</h2>
      <h3>{{ post.content }}</h3>
      <p class="author">{{ post.username }}</p>
    </div>
    <div id="comments">
      <h2>Comments:</h2>
      <div v-show="noComments">No comments yet</div>
      <div class="comment" v-for="comment in comments" :key="comment.idComment">
        <p>{{ comment.username }}</p>
        <p>{{ comment.comment }}</p>
        <div class="reply-section">
          <button class="reply-button" @click="handleReply(comment.idComment)">Reply</button>
          <div v-if="replyingToComment === comment.idComment" class="reply-form">
            <form @submit.prevent="onReplySubmit(comment.idComment)">
              <input type="text" placeholder="Add a reply" v-model="replyContent" />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <div class="replies" v-if="comment.replies && comment.replies.length > 0">
          <div class="reply" v-for="reply in comment.replies" :key="reply.idComment">
            <div class="reply-content">
              <p>{{ reply.username }}</p>
              <p>{{ reply.comment }}</p>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Add a comment" v-model="commentContent" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/Services/axios'

const postArray = ref([])
const post = ref({})
const comments = ref([])

const commentContent = ref('')
const replyContent = ref('')
const comment = ref({})
const reply = ref({})

let noComments = ref(false)
const props = defineProps({
  id: {
    required: true
  }
})

const replyingToComment = ref(null)

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
    noComments.value = comments.value.length === 0
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
    noComments.value = comments.value.length === 0
    commentContent.value = '' // Clear the input field after submission
  } catch (error) {
    console.log(error)
  }
}

async function onReplySubmit(parentCommentId) {
  reply.value.comment = replyContent.value
  reply.value.fk_Post = props.id
  reply.value.parentCommentId = parentCommentId

  try {
    const response = await axios.addComment(reply.value)
    console.log(response)
    // Update the comments list only if necessary; usually handled by socket or similar in real apps
    const newReply = {
      username: 'You', // Assuming you have a logged-in user context
      comment: replyContent.value,
      idComment: response.data.id // Ensure you get the correct ID from the server
    }
    const commentToUpdate = comments.value.find(c => c.idComment === parentCommentId)
    if (commentToUpdate) {
      if (!commentToUpdate.replies) {
        commentToUpdate.replies = []
      }
      commentToUpdate.replies.push(newReply)
    }
    replyContent.value = '' // Clear the input field after submission
    replyingToComment.value = null // Reset the replying state
  } catch (error) {
    console.log(error)
  }
}

function handleReply(commentId) {
  replyingToComment.value = commentId
}
</script>

<style scoped>
body {
  background-color: #121212; /* Dark background for the body */
  color: #e0e0e0; /* Light text color */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.heading {
  text-align: center;
  margin-top: 2rem;
  color: #ffffff;
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

#post h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #ffffff; /* Light text color */
}

#post h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #b0b0b0; /* Slightly lighter text color */
}

#post .author {
  font-size: 1rem;
  margin-top: 1rem;
  color: #a0a0a0; /* Lighter text color */
  text-align: left; /* Align the author's name to the left */
}

#comments {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
}

#comments h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff; /* Light text color */
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
  position: relative;
}

.comment p {
  margin: 0.5rem 0;
  color: #e0e0e0;
}

.comment p:first-child {
  font-weight: bold;
  color: #ffffff;
}

.reply-section {
  position: relative;
}

.reply-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reply-button:hover {
  background-color: #0056b3;
}

.reply-form {
  background-color: #2b2b2b; /* Slightly lighter background for the reply form */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  margin-left: 2rem;
}

.reply-form input[type="text"] {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  font-size: 1rem;
}

.replies {
  margin-left: 2rem;
}

.replies .reply {
  background-color: #2b2b2b; /* Lighter gray background for replies */
  margin-top: 0.5rem;
}

.reply-content {
  background-color: #383838; /* Different color for replies */
  padding: 0.75rem;
  border-radius: 4px;
}
</style>
