<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">
        <h1>{{ title }}</h1>
        <article-meta :actions="isCurrentUser ? 'EDIT' : 'FOLLOW'"
                      :username="author.username"
                      :image="author.image"
                      :createdAt="createdAt"
                      :following.sync="author.following"
                      :favorited.sync="favorited"
                      :favoritesCount.sync="favoritesCount"
                      :slug="slug" />
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(body)"></div>
          <ul class="tag-list">
            <li v-for="(n, idx) in tagList"
                class="tag-default tag-pill tag-outline"
                :key="n + idx">{{ n }}</li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="article-actions">
        <article-meta :actions="isCurrentUser ? 'EDIT' : 'FOLLOW'"
                      :username="author.username"
                      :image="author.image"
                      :createdAt="createdAt"
                      :following.sync="author.following"
                      :favorited.sync="favorited"
                      :favoritesCount.sync="favoritesCount"
                      :slug="slug" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <comment-form v-if="isAuth"
                        v-model="commentForm"
                        :image="currentUser.image"
                        :submitting="commentFormSubmitting"
                        @submit="addComment" />
          <comment v-for="n in commentList"
                   :key="n.id"
                   :username="n.author.username"
                   :image="n.author.image"
                   :createdAt="n.createdAt"
                   :body="n.body"
                   :current-username="currentUser.username"
                   @delete-comment="deleteComment(n.id)" />
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import marked from 'marked'
import ArticleMeta from '@/components/ArticleMeta'
import CommentForm from '@/components/CommentForm'
import Comment from '@/components/Comment'

export default {
  name: 'Article',
  components: {
    ArticleMeta,
    CommentForm,
    Comment
  },
  asyncData ({ params, store }) {
    const requestData = () => {
      return store.dispatch('api/request', {
        promise: Promise.all([
          store.dispatch('api/getArticle', { slug: params.slug }),
          store.dispatch('api/getComment', { slug: params.slug })
        ]),
        success ([resArticle, resComment]) {
          return {
            ...resArticle.data.article,
            commentForm: '',
            commentFormSubmitting: false,
            commentList: resComment.data.comments
          }
        },
        fail (error) {
          if (error.response.status === 401) {
            store.dispatch('auth/signOut')
            return requestData()
          }
        }
      })
    }

    return requestData()
  },
  head () {
    return {
      title: `${this.title} - Conduit`
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    },
    currentUser () {
      return this.isAuth && this.$store.state.auth.user || {}
    },
    isCurrentUser () {
      return this.currentUser.username === this.author.username
    }
  },
  methods: {
    parseMarkdown (content) {
      return marked(content, { sanitize: true })
    },
    addComment () {
      this.commentFormSubmitting = true
      this.$store.dispatch('api/request', {
        promise: this.$store.dispatch('api/addComment', {
          slug: this.slug,
          data: {
            comment: {
              body: this.commentForm
            }
          }
        }),
        success: (res) => {
          this.commentFormSubmitting = false
          this.commentForm = ''
          this.commentList.unshift(res.data.comment)
        }
      })
    },
    deleteComment (id) {
      this.$store.dispatch('api/request', {
        promise: this.$store.dispatch('api/deleteComment', {
          slug: this.slug,
          id
        }),
        success: (res) => {
          let commentIndex = this.commentList.findIndex(elm => elm.id === id)
          this.commentList.splice(commentIndex, 1)
        }
      })
    }
  }
}
</script>

