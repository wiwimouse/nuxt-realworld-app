<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link :to="{ name: 'register' }">Need an account?</nuxt-link>
          </p>

          <error-messages v-show="Object.keys(error).length"
                          :error="error" />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Email"
                     v-model="email"
                     :disabled="submitting">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     v-model="password"
                     :disabled="submitting">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right"
                    :disabled="submitting">Sign in</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessages from '@/components/ErrorMessages'

export default {
  name: 'Login',
  components: {
    ErrorMessages
  },
  middleware: ['auth-forbidden'],
  data () {
    return {
      email: '',
      password: '',
      error: {},
      submitting: false
    }
  },
  head () {
    return {
      title: 'Sign in - Conduit'
    }
  },
  methods: {
    onSubmit () {
      this.submitting = true
      this.$store.dispatch('auth/authenticate', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      }).catch(err => {
        this.submitting = false
        this.error = err.response.data.errors
      })
    }
  }
}
</script>

