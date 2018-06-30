<template>
  <ul class="error-messages">
    <li v-for="(message, idx) in errFormatted"
        :key="idx">{{ message }}</li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorMessages',
  props: {
    error: {
      type: Object,
      default: function () { return {} }
    }
  },
  computed: {
    errFormatted () {
      return Object.keys(this.error)
        .reduce((result, errorKey) => {
          let messages = this.error[errorKey].map(msgElm => `${errorKey} ${msgElm}`)
          return result.concat(messages)
        }, [])
    }
  }
}
</script>
