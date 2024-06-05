import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:443',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  login(user) {
    return api.post('/login', user).then((response) => {
      sessionStorage.setItem('token', response.data.token)
    })
  },

  getUser() {
    const token = sessionStorage.getItem('token')
    return api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getAdmin() {
    const token = sessionStorage.getItem('token')
    return api.get('/user/admin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
