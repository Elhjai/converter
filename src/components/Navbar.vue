<template>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Currency Converter</router-link>
      <div class="space-x-4">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link v-if="!isLoggedIn" to="/signup" class="hover:underline">Signup</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="hover:underline">Login</router-link>
        <router-link v-if="isLoggedIn" to="/converter" class="hover:underline">Converter</router-link>
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userToken');
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
};
</script>