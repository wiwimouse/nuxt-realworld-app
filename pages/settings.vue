<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       placeholder="URL of profile picture"
                       v-model="image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Your Name"
                       v-model="username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          placeholder="Short bio about you"
                          v-model="bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Email"
                       v-model="email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       placeholder="Password"
                       v-model="password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger"
                  @click="signOut">Or click here to logout.</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  middleware: ['auth-required'],
  asyncData ({ store }) {
    return store.dispatch('api/getCurrentUser').then(res => {
      return {
        ...res.data.user,
        password: ''
      }
    })
  },
  methods: {
    updateUser () {
      this.$store.dispatch('api/updateUser', {
        data: {
          email: this.email,
          username: this.username,
          password: this.password || undefined,
          image: this.image,
          bio: this.bio
        }
      }).then(res => {
        this.$store.commit('auth/setUser', res.data.user)
        this.$router.push({ name: 'index' })
      })
    },
    signOut () {
      this.$store.dispatch('auth/signOut')
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

