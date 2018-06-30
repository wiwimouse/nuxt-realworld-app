<template>
  <div class="article-meta">
    <a href=""><img :src="image" /></a>
    <div class="info">
      <a href=""
         class="author">{{ username }}</a>
      <span class="date">{{ createdAt | date }}</span>
    </div>
    <!-- PREVIEW -->
    <template v-if="actions === 'PREVIEW'">
      <button class="btn btn-sm pull-xs-right"
              :class="favorited ? 'btn-primary' : 'btn-outline-primary'"
              :disabled="isSubmitting"
              @click="toggleFavoriteArticle">
        <i class="ion-heart"></i> {{ favoritesCount }}
      </button>
    </template>

    <!-- EDIT -->
    <template v-else-if="actions === 'EDIT'">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
      :to="{ name: 'editor-slug', params: { slug } }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm"
              :disabled="isDeleteSubmitting"
              @click="deleteArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>

    <!-- FOLLOW -->
    <template v-else-if="actions === 'FOLLOW'">
      <button class="btn btn-sm"
              :class="following ? 'btn-secondary' : 'btn-outline-secondary'"
              :disabled="isFollowSubmitting"
              @click="toggleFollowUser">
        <i class="ion-plus-round"></i>
        &nbsp;&nbsp;{{ following ? 'Unfollow' : 'Follow'}} &nbsp;{{ username }}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm"
              :class="favorited ? 'btn-primary' : 'btn-outline-primary'"
              :disabled="isSubmitting"
              @click="toggleFavoriteArticle">
        <i class="ion-heart"></i>
        &nbsp;&nbsp;{{ favorited ? 'Unfavorite Article' : 'Favorite Article' }}
        <span class="counter">{{ `(${favoritesCount})` }}</span>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    actions: {
      type: String,
      default: 'PREVIEW'
    },
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
    slug: {
      type: String,
      default: ''
    },
    following: {
      type: Boolean,
      default: false
    },
    favorited: {
      type: Boolean,
      default: false
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      isSubmitting: false,
      isDeleteSubmitting: false,
      isFollowSubmitting: false
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    }
  },
  methods: {
    toggleFollowUser () {
      if (this.isAuth) {
        let actionName = this.following ? 'api/unfollowUser' : 'api/followUser'

        this.isFollowSubmitting = true
        this.$store.dispatch(actionName, { username: this.username })
          .then(res => {
            let { following } = res.data.profile
            this.isFollowSubmitting = false
            this.$emit('update:following', following)
          })
          .catch(err => {
            this.isFollowSubmitting = false
          })
      } else {
        this.$router.push({ name: 'register' })
      }
    },
    toggleFavoriteArticle () {
      if (this.isAuth) {
        let actionName = this.favorited ? 'api/unfavoriteArticle' : 'api/favoriteArticle'

        this.isSubmitting = true
        this.$store.dispatch(actionName, { slug: this.slug })
          .then(res => {
            let { favorited, favoritesCount } = res.data.article
            this.isSubmitting = false
            this.$emit('update:favorited', favorited)
            this.$emit('update:favoritesCount', favoritesCount)
          })
          .catch(err => {
            this.isSubmitting = false
          })
      } else {
        this.$router.push({ name: 'register' })
      }
    },
    deleteArticle () {
      this.isDeleteSubmitting = true
      this.$store
        .dispatch('api/deleteArticle', { slug: this.slug })
        .then(res => {
          this.isDeleteSubmitting = false
          this.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.isDeleteSubmitting = false
        })
    }
  }
}
</script>

