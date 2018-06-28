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
              :class="favorited ? 'btn-primary' : 'btn-outline-primary'">
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
      })
    }
  },
  methods: {
    dateToLocaleString (date) {
      return this.intl.format(new Date(date))
    }
  }
}
</script>

