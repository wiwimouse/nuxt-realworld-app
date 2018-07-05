<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-xs-12 col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuth"
                  class="nav-item">
                <a class="nav-link"
                   href=""
                   :class="{'active': tabCurrent === 'YOUR'}"
                   @click.prevent="tabOnClick('YOUR')">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                   href=""
                   :class="{'active': tabCurrent === 'GLOBAL'}"
                   @click.prevent="tabOnClick('GLOBAL')">Global Feed</a>
              </li>
              <li v-if="tabCurrent === 'TAG'"
                  class="nav-item">
                <a class="nav-link active">{{ `# ${articleListOptions.tag}` }}</a>
              </li>
            </ul>
          </div>
          <article-preview v-for="n in feeds"
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
          <pagination :total="feedsTotal"
                      :page.sync="offsetToPage"
                      :per-page="articleListOptions.limit" />
        </div>

        <div class="col-xs-12 col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a v-for="(n, idx) in tagList"
                 :key="n + idx"
                 class="tag-pill tag-default"
                 href=""
                 @click.prevent="tagOnClick(n)">{{ n }}</a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import Pagination from '@/components/Pagination'

export default {
  name: 'Home',
  components: {
    ArticlePreview,
    Pagination
  },
  asyncData ({ store, redirect }) {
    const requestHomeData = function (type) {
      let actionName
      let data = {
        articleListOptions: {
          limit: 10,
          offset: 0,
          tag: null,
        },
      }

      if (type === 'GLOBAL') {
        actionName = 'api/getArticlesList'
      } else if (type === 'YOUR') {
        actionName = 'api/getArticleFeedsList'
      }

      return store.dispatch('api/request', {
        promise: Promise.all([
          store.dispatch(actionName, { params: data.articleListOptions }),
          store.dispatch('api/getTags')
        ]),
        success ([resArticle, resTags]) {
          return {
            ...data,
            tabCurrent: type,
            feeds: resArticle.data.articles,
            feedsTotal: resArticle.data.articlesCount,
            tagList: resTags.data.tags,
          }
        },
        fail (error) {
          if (error.response.status === 401) {
            store.dispatch('auth/signOut')
            return requestHomeData('GLOBAL')
          }
        }
      })
    }

    return store.getters['auth/isAuth']
      ? requestHomeData('YOUR')
      : requestHomeData('GLOBAL')
  },
  head () {
    return {
      title: 'Home - Conduit'
    }
  },
  computed: {
    offsetToPage: {
      get () {
        return this.articleListOptions.offset / this.articleListOptions.limit + 1
      },
      set (page) {
        this.paginationOnClick(page)
      }
    },
    isAuth () {
      return this.$store.getters['auth/isAuth']
    }
  },
  methods: {
    paginationOnClick (page) {
      let { limit } = this.articleListOptions
      this.articleListOptions.offset = limit * (page - 1)
      this.getArticlesList()
    },
    tagOnClick (tag) {
      if (this.articleListOptions.tag !== tag) {
        this.articleListOptions.tag = tag
        this.tabOnClick('TAG')
      }
    },
    tabOnClick (tab) {
      this.tabCurrent = tab
      this.articleListOptions.offset = 0

      if (this.tabCurrent !== 'TAG') this.articleListOptions.tag = null
      this.getArticlesList()
    },
    getArticlesList () {
      let actionName = ''

      if (this.tabCurrent === 'TAG' || this.tabCurrent === 'GLOBAL') {
        actionName = 'api/getArticlesList'
      } else if (this.tabCurrent === 'YOUR') {
        actionName = 'api/getArticleFeedsList'
      }

      this.$store.dispatch('api/request', {
        promise: this.$store.dispatch(actionName, {
          params: this.articleListOptions
        }),
        success: (res) => {
          this.feeds = res.data.articles
          this.feedsTotal = res.data.articlesCount
        }
      })
    },
  }
}
</script>
