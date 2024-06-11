import axios from 'axios'

/**
 *
 */
const api = axios.create({
  baseURL: 'http://localhost:443',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  /**
   * Envoie une requête pour se connecter à un utilisateur
   * @param {*} user Correspond au user que l'utilisateur va entré
   * @returns retourne le token correspondant à l'utilisateur connecté
   */
  login(user) {
    return api.post('/login', user).then((response) => {
      sessionStorage.setItem('token', response.data.token)
    })
  },

  /**
   * Récupère l'utilisateur qui est connecté
   * @returns Renvoie l'utilisateur qui est connecté
   */
  getUser() {
    const token = sessionStorage.getItem('token')
    return api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   * Récupère toutes les publications
   * @returns Renvoies un tableau avec toutes les publication
   */
  getPosts() {
    const token = sessionStorage.getItem('token')
    return api.get('/post', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   *
   * @param {*} id
   * @returns
   */
  async getCommentsByPost(id) {
    const token = sessionStorage.getItem('token')
    return await api.get(`post/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   * Récupère une publication selon un paramètre
   * @param {*} id Correspont à l'id du post à récupérer
   * @returns Retourne la publication récupérer
   */
  getPost(id) {
    const token = sessionStorage.getItem('token')
    return api.get('/post/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   * Ajoute un commentaire à une publication (Attention le fk_Post est mis automatiquement)
   * @param {*} comment Correspond au commentaire que l'utilisateur à entré
   * @returns Renvoie si la requête s'est executé avec succès
   */
  addComment(comment) {
    const token = sessionStorage.getItem('token')

    return api.post('/comment', comment, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   *
   * @param {*} post
   * @returns
   */
  addPost(post) {
    const token = sessionStorage.getItem('token')

    return api.post('/post', post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  /**
   *
   * @returns
   */
  getAdmin() {
    const token = sessionStorage.getItem('token')

    return api.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
