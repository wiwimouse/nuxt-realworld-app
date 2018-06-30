<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ body }}</p>
    </div>
    <div class="card-footer">
      <a href=""
         class="comment-author">
        <img class="comment-author-img"
             :src="image">
      </a>
      &nbsp;
      <a href=""
         class="comment-author">{{ username }}</a>
      <span class="date-posted">{{ createdAt | date }}</span>
      <span class="mod-options">
        <i v-if="isCurrentUser"
           class="ion-trash-a"
           @click="$emit('delete-comment')"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    username: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    createdAt: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    currentUsername: {
      type: String,
      default: null
    }
  },
  computed: {
    isCurrentUser () {
      return this.username === this.currentUsername
    },
  },
  methods: {
    deleteComment () {

    }
  }
}
</script>

