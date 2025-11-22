import { defineStore } from 'pinia'
import { login } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
    loading: false
  }),
  actions: {
    async loginUser(email, password) {
      this.loading = true
      this.error = null
      try {
        const data = await login(email, password)
        // Asumiendo que la API devuelve { user, token } o similar. 
        // Ajustaré según la respuesta real si es necesario.
        // Basado en el curl, devuelve un token probablemente.
        this.user = data.user || { email } // Fallback si no devuelve user object
        this.token = data.accessToken || data.token
        
        // Guardar en localStorage para persistencia básica
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al iniciar sesión'
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    initialize() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    }
  }
})
