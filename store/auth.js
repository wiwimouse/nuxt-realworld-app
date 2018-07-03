import cookie from 'cookie'
import jscookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const state = () => ({
  jwt: null,
  expiration: null,
  user: null
})

export const getters = {
  isAuth(state) {
    return !!state.jwt
  }
}

export const mutations = {
  setAuth(state, { token, expiration }) {
    state.jwt = token
    state.expiration = expiration
  },
  clearAuth(state) {
    state.jwt = null
    state.expiration = null
  },
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = null
  }
}

export const actions = {
  register(vuex, { username, email, password }) {
    return vuex
      .dispatch(
        'api/registration',
        {
          data: {
            user: {
              username,
              email,
              password
            }
          }
        },
        { root: true }
      )
      .then(data => {
        vuex.dispatch('setAuthentication', data.user)
        vuex.dispatch('setUserInfos', data.user)
      })
  },
  authenticate(vuex, { email, password }) {
    return vuex
      .dispatch(
        'api/authentication',
        {
          data: {
            user: {
              email,
              password
            }
          }
        },
        { root: true }
      )
      .then(data => {
        vuex.dispatch('setAuthentication', data.user)
        vuex.dispatch('setUserInfos', data.user)
      })
  },
  setAuthentication(vuex, user) {
    let jwtPayload = jwt.decode(user.token)

    jscookie.set('jwt', user.token)
    jscookie.set('exp', jwtPayload.exp)
    localStorage.setItem('jwt', user.token)
    localStorage.setItem('exp', jwtPayload.exp)
    vuex.commit('setAuth', { token: user.token, expiration: jwtPayload.exp })
  },
  checkAuthentication(vuex, req) {
    let token
    let expiration
    let jwtPayload
    let date = new Date()

    if (req) {
      if (req.headers.cookie) {
        let reqCookie = cookie.parse(req.headers.cookie)

        if (reqCookie.jwt) {
          jwtPayload = jwt.decode(reqCookie.jwt)
          if (jwtPayload.exp) {
            token = reqCookie.jwt
            expiration = jwtPayload.exp
          }
        }
      }
    } else {
      token = localStorage.getItem('jwt')
      expiration = localStorage.getItem('exp')
    }

    if (!token || date.getTime > expiration * 1000) {
      vuex.dispatch('signOut')
    } else {
      vuex.commit('setAuth', {
        token,
        exp: expiration
      })
      vuex.commit('setUser', {
        id: jwtPayload.id,
        username: jwtPayload.username
      })
    }
  },
  setUserInfos(vuex, user) {
    localStorage.setItem('user', btoa(JSON.stringify(user)))
    vuex.commit('setUser', user)
  },
  signOut(vuex) {
    vuex.commit('clearAuth')
    vuex.commit('clearUser')

    if (process.client) {
      jscookie.remove('jwt')
      jscookie.remove('exp')
      localStorage.clear()
    }
  }
}
