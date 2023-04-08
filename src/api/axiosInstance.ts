import axios from 'axios'

export default axios.create({
  baseURL: 'http://dev3.dansmultipro.co.id/api/',
  headers: {
    'Content-type': 'application/json',
  },
})
