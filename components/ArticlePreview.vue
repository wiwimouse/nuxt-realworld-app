<template>
  <div class="article-preview">
    <article-meta actions="PREVIEW"
                  :username="username"
                  :image="image"
                  :createdAt="createdAt"
                  :favorited.sync="favorited$"
                  :favoritesCount.sync="favoritesCount$"
                  :slug="slug" />
    <nuxt-link class="preview-link"
               :to="{ name: 'article-slug', params: { slug: slug } }">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline"
            v-for="(n, idx) of tagList"
            :key="n + idx">{{ n }}</li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
import ArticleMeta from '@/components/ArticleMeta'
export default {
  name: 'ArticlePreview',
  components: {
    ArticleMeta
  },
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
  computed: {
    favorited$: {
      get () {
        return this.favorited
      },
      set (val) {
        this.$emit('update:favorited', val)
      }
    },
    favoritesCount$: {
      get () {
        return this.favoritesCount
      },
      set (val) {
        this.$emit('update:favoritesCount', val)
      }
    },
  }
}
</script>

