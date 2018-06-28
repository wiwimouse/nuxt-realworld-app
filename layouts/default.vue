<template>
  <div>
    <app-header/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  mounted () {
    if (process.client) {
      if (!this.$store.getters['auth/isAuth']) {
        this.$store.dispatch('auth/signOut')
      } else {
        try {
          this.$store.commit('auth/setUser', JSON.parse(atob(localStorage.user)))
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>
