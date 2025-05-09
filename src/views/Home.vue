<template>
  <div class="container mx-auto p-6 text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Currency Converter</h1>
    <p class="text-lg mb-6">Convert currencies quickly and easily with our user-friendly tool.</p>
    <div class="space-x-4">
      <router-link
        to="/signup"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Get Started
      </router-link>
      <router-link
        to="/converter"
        class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
      >
        Try Converter
      </router-link>
    </div>
  </div>
</template>