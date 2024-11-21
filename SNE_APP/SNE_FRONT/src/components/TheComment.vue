<script setup>
defineProps({
    comment : {
        type: Object,
        Required: true
    }
})

</script>

<template>
    <div class="comments">
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
    </div>
</template>
