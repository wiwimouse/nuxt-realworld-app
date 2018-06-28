<template>
  <nav>
    <ul class="pagination">
      <li v-for="n in pages"
          class="page-item"
          :key="`page-${n}`"
          :class="{ 'active': n === page }">
        <a class="page-link"
           href=""
           @click.prevent="$emit('update:page', n)">{{ n }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.perPage)
    }
  }
}
</script>

