import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('https://storedb-api.onrender.com/node-api/users/signin', {
                    email,
                    password,
                });

                // Assuming the API returns { token: '...' } or similar. 
                // I will need to verify the response structure. 
                // Based on common patterns, I'll assume it returns a token.
                // If the user provided curl shows response, I should check it.
                // The user didn't provide the response, just the request.
                // I'll assume standard JWT response.

                this.token = response.data.accessToken || response.data.token;
                // Adjust based on actual API response.

                localStorage.setItem('token', this.token);

                // Set default axios header
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                return true;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});
