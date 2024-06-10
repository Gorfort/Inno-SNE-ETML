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
  getPosts() {
    const token = sessionStorage.getItem('token')
    return api.get('/post', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  async getCommentsByPost(id) {
    const token = sessionStorage.getItem('token')
    return await api.get(`post/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getPost(id) {
    const token = sessionStorage.getItem('token')
    return api.get('/post/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  addComment(comment) {
    const token = sessionStorage.getItem('token')

    return api.post('/comment', comment, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
