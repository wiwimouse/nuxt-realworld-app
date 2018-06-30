<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand"
                 to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link"
                     :to="{ name: 'index' }">Home</nuxt-link>
        </li>
        <template v-if="isAuth">
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       :to="{ name: 'editor-slug' }">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       :to="{ name: 'user', params: { user: `@${currentUser.username}` } }">
              <img v-if="currentUser.image"
                   class="user-pic"
                   :src="currentUser.image">&nbsp;{{ currentUser.username }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       :to="{ name: 'login' }">Sign In</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/register">Sign up</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    },
    currentUser () {
      return this.isAuth && this.$store.state.auth.user || {}
    }
  }
}
</script>

