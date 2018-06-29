export const getters = {
  headerAuth(state, getters, rootState, rootGetters) {
    if (rootGetters['auth/isAuth']) {
      return `Token ${rootState.auth.jwt}`
    } else {
      return null
    }
  }
}

export const actions = {
  request(vuex, options) {
    this.$axios(options).then(res => res.data)
  },
  authentication(vuex, { data }) {
    return this.$axios({
      url: 'users/login',
      method: 'post',
      data
    }).then(res => res.data)
  },
  getArticlesList(vuex, { params }) {
    return this.$axios({
      url: 'articles',
      method: 'get',
      params
    })
  },
  getArticleFeedsList(vuex, { params }) {
    return this.$axios({
      url: 'articles/feed',
      method: 'get',
      headers: {
        Authorization: vuex.getters.headerAuth
      },
      params
    })
  },
  getTags() {
    return this.$axios({
      url: 'tags',
      method: 'get'
    })
  },
  getCurrentUser(vuex) {
    return this.$axios({
      url: 'user',
      method: 'get',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  },
  updateUser(vuex, { data }) {
    return this.$axios({
      url: 'user',
      method: 'put',
      headers: {
        Authorization: vuex.getters.headerAuth
      },
      data
    })
  },
  favoriteArticle(vuex, { slug }) {
    return this.$axios({
      url: `articles/${slug}/favorite`,
      method: 'post',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  },
  unfavoriteArticle(vuex, { slug }) {
    return this.$axios({
      url: `articles/${slug}/favorite`,
      method: 'delete',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  }
}
