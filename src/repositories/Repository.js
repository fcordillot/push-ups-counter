import axios from 'axios'

const baseDomain = process.env.VUE_APP_API_URL
const baseURL = `${baseDomain}/v2`

export default axios.create({
  baseURL,

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
