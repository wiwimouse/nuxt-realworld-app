<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img"
                 :src="profile.image">
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <nuxt-link v-if="isCurrentUser"
                       class="btn btn-sm btn-outline-secondary action-btn"
                       :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </nuxt-link>
            <button v-else
                    class="btn btn-sm btn-outline-secondary action-btn"
                    @click="toggleFollowUser">
              <i class="ion-plus-round"></i>
              &nbsp; {{ (!isAuth || !profile.following) ? 'Follow' : 'Unfollow' }} {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link"
                   :class="{ 'active': tab === 'MY' }"
                   href=""
                   @click.prevent="tabOnClick('MY')">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                   :class="{ 'active': tab === 'FAV' }"
                   href=""
                   @click.prevent="tabOnClick('FAV')">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <article-preview v-for="n in articles"
                           :key="n.slug"
                           :username="n.author.username"
                           :image="n.author.image"
                           :favorited.sync="n.favorited"
                           :favorites-count.sync="n.favoritesCount"
                           :created-at="n.createdAt"
                           :title="n.title"
                           :description="n.description"
                           :slug="n.slug"
                           :tag-list="n.tagList" />
          <div v-if="!articles.length"
               class="article-preview">No articles are here... yet.</div>

          <pagination :total="articlesCount"
                      :page.sync="offsetToPage"
                      :per-page="options.limit" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import Pagination from '@/components/Pagination'

export default {
  name: 'user',
  components: {
    ArticlePreview,
    Pagination
  },
  asyncData ({ params, store }) {
    let username = params.user.slice(1)
    let data = {
      options: {
        author: username,
        favorited: username,
        limit: 5,
        offset: 0,
      },
      tab: 'MY',
      isFollowSubmitting: false
    }

    return Promise.all([
      store.dispatch('api/getProfile', { username }),
      store.dispatch('api/getArticlesList', {
        params: {
          ...data.options,
          favorited: undefined
        }
      })
    ]).then(([resProfile, resArticle]) => {
      return {
        ...data,
        articles: resArticle.data.articles,
        articlesCount: resArticle.data.articlesCount,
        profile: resProfile.data.profile
      }
    })
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    },
    isCurrentUser () {
      return this.isAuth && this.$store.state.auth.user.username === this.profile.username || false
    },
    offsetToPage: {
      get () {
        return this.options.offset / this.options.limit + 1
      },
      set (page) {
        this.paginationOnClick(page)
      }
    },
  },
  methods: {
    paginationOnClick (page) {
      let { limit } = this.options
      this.options.offset = limit * (page - 1)
      this.getArticlesList()
    },
    tabOnClick (tab) {
      this.tab = tab
      this.options.offset = 0
      this.getArticlesList()
    },
    getArticlesList () {
      let paramByTab

      if (this.tab === 'MY') {
        paramByTab = 'author'
      } else {
        paramByTab = 'favorited'
      }

      return this.$store.dispatch('api/getArticlesList', {
        params: {
          limit: this.options.limit,
          offset: this.options.offset,
          [paramByTab]: this.options[paramByTab]
        }
      }).then(res => {
        this.articles = res.data.articles
        this.articlesCount = res.data.articlesCount
      })
    },
    toggleFollowUser () {
      if (this.isAuth) {
        let actionName = this.profile.following ? 'api/unfollowUser' : 'api/followUser'

        this.isFollowSubmitting = true
        this.$store.dispatch(actionName, { username: this.profile.username })
          .then(res => {
            this.profile = res.data.profile
            this.isFollowSubmitting = false
          })
          .catch(err => {
            this.isFollowSubmitting = false
          })
      } else {
        this.$router.push({ name: 'register' })
      }
    }
  }
}
</script>

