export default function({ $axios }) {
  $axios.defaults.baseURL = 'https://conduit.productionready.io/api'
  $axios.setHeader('accept-encoding', null)
}
