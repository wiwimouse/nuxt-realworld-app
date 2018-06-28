<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand"
                 to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link active"
                     :to="{ name: 'index' }">Home</nuxt-link>
        </li>
        <template v-if="isAuth">
          <li class="nav-item">
            <a class="nav-link"
               href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="">
              <img v-if="$store.state.auth.user.image"
                   class="user-pic"
                   :src="$store.state.auth.user.image">&nbsp;{{ $store.state.auth.user.username }}
            </a>
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
    }
  }
}
</script>

