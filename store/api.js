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
  // Api Constructor
  request(vuex, { promise, success, fail }) {
    return promise
      .then(res => {
        if (typeof success === 'function') {
          return success(res)
        } else {
          return Promise.resolve(res)
        }
      })
      .catch(err => {
        if (typeof fail === 'function') {
          return fail(err)
        } else {
          return Promise.reject(err)
        }
      })
      .catch(err => {
        let code = err.response.status

        if (code === 401) {
          vuex.dispatch('auth/signOut', null, { root: true })
          this.$router.replace({ name: 'login' })
        } else if ([403, 404].indexOf(code) !== -1) {
          this.$router.replace({ name: 'index' })
        } else {
          this.$router.replace({ name: 'index' })
        }
      })
  },

  // Auth
  authentication(vuex, { data }) {
    return this.$axios({
      url: 'users/login',
      method: 'post',
      data
    }).then(res => res.data)
  },
  registration(vuex, { data }) {
    return this.$axios({
      url: 'users',
      method: 'post',
      data
    }).then(res => res.data)
  },

  // Article
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

  // Tag
  getTags() {
    return this.$axios({
      url: 'tags',
      method: 'get'
    })
  },

  // Comment
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

  // User
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
  getProfile(vuex, { username }) {
    return this.$axios({
      url: `profiles/${username}`,
      method: 'get',
      headers: {
        ...(vuex.getters.isAuth && { Authorization: vuex.getters.headerAuth })
      }
    })
  },

  // Favorite
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

  // Follow
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
