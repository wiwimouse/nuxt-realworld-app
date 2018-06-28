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
      metohd: 'get'
    })
  }
}
