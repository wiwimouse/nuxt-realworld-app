<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ body }}</p>
    </div>
    <div class="card-footer">
      <nuxt-link class="comment-author"
                 :to="{ name: 'user', params: { user: `@${username}` } }">
        <img class="comment-author-img"
             :src="image">
      </nuxt-link>
      &nbsp;
      <nuxt-link class="comment-author"
                 :to="{ name: 'user', params: { user: `@${username}` } }">
        {{ username }}
      </nuxt-link>
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

