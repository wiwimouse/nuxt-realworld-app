export const getters = {
  isAuth(state, getters, rootState, rootGetters) {
    return rootGetters['auth/isAuth']
  },
  headerAuth(state, getters, rootState) {
    if (getters.isAuth) {
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
      headers: {
        ...(vuex.getters.isAuth && { Authorization: vuex.getters.headerAuth })
      },
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
  getArticle(vuex, { slug }) {
    return this.$axios({
      url: `articles/${slug}`,
      method: 'get',
      headers: {
        ...(vuex.getters.isAuth && { Authorization: vuex.getters.headerAuth })
      }
    })
  },
  createArticle(vuex, { data }) {
    return this.$axios({
      url: 'articles',
      method: 'post',
      headers: {
        Authorization: vuex.getters.headerAuth
      },
      data
    })
  },
  updateArticle(vuex, { data, slug }) {
    return this.$axios({
      url: `articles/${slug}`,
      method: 'put',
      headers: {
        Authorization: vuex.getters.headerAuth
      },
      data
    })
  },
  deleteArticle(vuex, { slug }) {
    return this.$axios({
      url: `articles/${slug}`,
      method: 'delete',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  },
  getTags() {
    return this.$axios({
      url: 'tags',
      method: 'get'
    })
  },
  getComment(veux, { slug }) {
    return this.$axios({
      url: `articles/${slug}/comments`,
      method: 'get'
    })
  },
  deleteComment(vuex, { slug, id }) {
    return this.$axios({
      url: `articles/${slug}/comments/${id}`,
      method: 'delete',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  },
  addComment(vuex, { data, slug }) {
    return this.$axios({
      url: `articles/${slug}/comments`,
      method: 'post',
      headers: {
        Authorization: vuex.getters.headerAuth
      },
      data
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
  },
  followUser(vuex, { username }) {
    return this.$axios({
      url: `profiles/${username}/follow`,
      method: 'post',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  },
  unfollowUser(vuex, { username }) {
    return this.$axios({
      url: `profiles/${username}/follow`,
      method: 'delete',
      headers: {
        Authorization: vuex.getters.headerAuth
      }
    })
  }
}
