<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul v-if="error"
              class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
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
            <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/authenticate', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>

