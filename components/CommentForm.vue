<template>
  <form class="card comment-form"
        @submit.prevent="$emit('submit')">
    <div class="card-block">
      <textarea class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="value$"></textarea>
    </div>
    <div class="card-footer">
      <img class="comment-author-img"
           :src="image">
      <button class="btn btn-sm btn-primary"
              :disabled="!submitable || submitting">Post Comment</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    value: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    value$: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    submitable () {
      return this.value.trim().length
    }
  }
}
</script>
