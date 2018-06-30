import Vue from 'vue'

const IntlDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const dateFilter = function(date) {
  return IntlDate.format(new Date(date))
}

Vue.filter('date', dateFilter)
