<template>
  <div class="container mx-auto p-6 max-w-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
    <transition name="fade">
      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
        {{ error }}
      </div>
    </transition>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
      >
        <span v-if="isLoading">Logging In...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <p class="mt-4 text-center">
      Don't have an account?
      <router-link to="/signup" class="text-blue-600 hover:underline">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Store token and username
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('username', response.data.username);
        this.$router.push('/converter');
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>