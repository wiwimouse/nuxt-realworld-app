<template>
  <div class="article-preview">
    <div class="article-meta">
      <a :href="`profile/${username}`"><img :src="image" /></a>
      <div class="info">
        <a href=""
           class="author">{{ username }}</a>
        <span class="date">{{ dateToLocaleString(createdAt) }}</span>
      </div>
      <button class="btn btn-sm pull-xs-right"
              :class="favorited ? 'btn-primary' : 'btn-outline-primary'"
              :disabled="favoriting"
              @click="toggleFavoriteArticle">
        <i class="ion-heart"></i> {{ favoritesCount }}
      </button>
    </div>
    <a :href="`article/${slug}`"
       class="preview-link">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline"
            v-for="(n, idx) of tagList"
            :key="n + idx">{{ n }}</li>
      </ul>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    username: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    favorited: {
      type: Boolean,
      default: false
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    tagList: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {
      intl: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      favoriting: false
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    }
  },
  methods: {
    dateToLocaleString (date) {
      return this.intl.format(new Date(date))
    },
    toggleFavoriteArticle () {
      if (this.isAuth) {
        let actionName = this.favorited ? 'api/unfavoriteArticle' : 'api/favoriteArticle'

        this.favoriting = true
        this.$store.dispatch(actionName, { slug: this.slug }).then(res => {
          let { favorited, favoritesCount } = res.data.article
          this.favoriting = false
          this.$emit('update:favorited', favorited)
          this.$emit('update:favoritesCount', favoritesCount)
        }).catch(err => {
          this.favoriting = false
        })
      } else {
        this.$router.push({ name: 'register' })
      }
    }
  }
}
</script>

