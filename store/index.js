export const actions = {
  nuxtServerInit(vuex, { req }) {
    vuex.dispatch('auth/checkAuthentication', req)
  }
}
