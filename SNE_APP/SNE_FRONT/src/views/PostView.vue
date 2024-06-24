<template>
  <div>
    <h1 class="heading">Post by {{ post.username }}</h1>
    <div id="post">
      <h2>{{ post.title }}</h2>
      <h3>{{ post.content }}</h3>
      <p class="author">{{ post.username }}</p>
      <p class="date">{{ formatDate(post.created_At) }}</p>
    </div>
    <div id="comments">
      <h2>Comments:</h2>
      <div v-show="noComments">No comments yet</div>
      <div class="comment" v-for="comment in comments" :key="comment.idComment">
        <p>{{ comment.username }}</p>
        <p>{{ comment.comment }}</p>
        <div class="reply-section">
          <button v-if="replyingToComment !== comment.idComment" class="reply-button" @click="handleReply(comment.idComment)">Reply</button>
          <div v-if="replyingToComment === comment.idComment" class="reply-form">
            <form @submit.prevent="onReplySubmit(comment.idComment)">
              <input type="text" placeholder="Add a reply" v-model="replyContent" />
              <button type="submit">Submit</button>
              <button type="button" @click="cancelReply" class="cancel-button">Cancel</button>
            </form>
          </div>
        </div>
        <div class="replies" v-if="comment.replies && comment.replies.length > 0">
          <div class="reply" v-for="reply in comment.replies" :key="reply.idComment">
            <div class="reply-content">
              <div class="reply-header">
                <p class="reply-author">{{ reply.username }}</p>
                <p class="reply-date">{{ formatDate(reply.created_At) }}</p>
              </div>
              <p>{{ reply.comment }}</p>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Add a comment" v-model="commentContent" />
        <button type="submit" class="submit-button">Commenter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/Services/axios';

const postArray = ref([]);
const post = ref({});
const comments = ref([]);

const commentContent = ref('');
const replyContent = ref('');
const comment = ref({});
const reply = ref({});

let noComments = ref(false);

const props = defineProps({
  id: {
    required: true
  }
});

const replyingToComment = ref(null);

onMounted(async () => {
  try {
    const response = await axios.getPost(props.id);
    postArray.value = response.data.data;
    post.value = postArray.value[0];
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.getCommentsByPost(props.id);
    comments.value = response.data.result;
    noComments.value = comments.value.length === 0;
  } catch (error) {
    noComments.value = true;
    console.log(error);
  }
});

async function onSubmit() {
  comment.value.comment = commentContent.value;
  comment.value.fk_Post = props.id;

  try {
    const response = await axios.addComment(comment.value);
    console.log(response);
    // Refresh comments list after adding a new comment
    const responseComments = await axios.getCommentsByPost(props.id);
    comments.value = responseComments.data.result;
    noComments.value = comments.value.length === 0;
    commentContent.value = ''; // Clear the input field after submission
  } catch (error) {
    console.log(error);
  }
}

async function onReplySubmit(parentCommentId) {
  reply.value.comment = replyContent.value;
  reply.value.fk_Post = props.id;
  reply.value.parentCommentId = parentCommentId;

  try {
    const response = await axios.addComment(reply.value);
    console.log(response);

    // Update the comments list to include the new reply
    const newReply = {
      username: 'You', // Replace with actual logged-in user context
      comment: replyContent.value,
      idComment: response.data.id // Ensure you get the correct ID from the server
    };

    const commentToUpdate = comments.value.find(c => c.idComment === parentCommentId);
    if (commentToUpdate) {
      if (!commentToUpdate.replies) {
        commentToUpdate.replies = [];
      }
      commentToUpdate.replies.push(newReply);
    }

    // Clear the reply input field and reset reply state
    replyContent.value = '';
    replyingToComment.value = null;
  } catch (error) {
    console.log(error);
  }
}

function handleReply(commentId) {
  replyingToComment.value = commentId;
}

function cancelReply() {
  replyingToComment.value = null;
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<style scoped>
/* Global styles */
body {
  background-color: #f0f0f0;
  color: #333;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Heading style */
.heading {
  text-align: center;
  margin-top: 2rem;
  color: #333;
}

/* Post container */
#post {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 600px;
}

#post h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #333;
}

#post h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #666;
}

#post .author {
  font-size: 1rem;
  margin-top: 1rem;
  color: #3f00a5;
}

#post .date {
  font-size: 0.875rem;
  color: #777777;
  margin-top: 1rem;
}

/* Comments section */
#comments {
  max-width: 600px;
  margin: 2rem auto;
}

#comments h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

/* Form styling */
form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
}

form input[type="text"] {
  padding: 0.5rem; /* Adjusted padding to make the inputs smaller */
  flex: 1; /* Ensure all input fields take up equal space */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1rem;
  width: 100%; /* Make the input fields wider */
}

form button {
  padding: 0.5rem 1rem; /* Adjusted padding to match cancel button */
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}

/* Cancel button */
.cancel-button {
  margin-left: 0.5rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c82333;
}

/* Comment and reply styling */
.comment {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.comment p {
  margin: 0.5rem 0;
  color: #333;
}

.comment p:first-child {
  font-weight: bold;
}

.reply-section {
  position: relative;
}

.reply-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reply-button:hover {
  background-color: #0056b3;
}

.reply-form {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.reply-form input[type="text"] {
  padding: 0.5rem; /* Adjusted padding to make the inputs smaller */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333;
  font-size: 1rem;
  width: 100%; /* Make the input fields wider */
}

.replies {
  margin-left: 2rem;
}

.reply {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reply-content {
  margin-top: 0.5rem;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reply-author {
  font-weight: bold;
  color: #3f00a5;
}

.reply-date {
  color: #777777;
  font-size: 0.875rem;
}
</style>
