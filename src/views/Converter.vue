<template>
  <div class="container mx-auto p-6 max-w-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">Currency Converter</h2>
    <transition name="fade">
      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
        {{ error }}
      </div>
    </transition>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <form @submit.prevent="convertCurrency" class="space-y-4">
        <div>
          <label for="amount" class="block text-sm font-medium">Amount</label>
          <input
            type="number"
            id="amount"
            v-model.number="amount"
            required
            min="0"
            step="0.01"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="fromCurrency" class="block text-sm font-medium">From Currency</label>
          <select
            id="fromCurrency"
            v-model="fromCurrency"
            required
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
        <div>
          <label for="toCurrency" class="block text-sm font-medium">To Currency</label>
          <select
            id="toCurrency"
            v-model="toCurrency"
            required
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Converting...
          </span>
          <span v-else>Convert</span>
        </button>
      </form>
      <transition name="fade">
        <div v-if="result" class="mt-4 text-center">
          <p class="text-lg font-semibold">
            {{ amount }} {{ fromCurrency }} = {{ result }} {{ toCurrency }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      currencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
      result: null,
      isLoading: false,
      error: null,
      exchangeRates: {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, AUD: 1.35, CAD: 1.25 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129.0, AUD: 1.59, CAD: 1.47 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 150.0, AUD: 1.85, CAD: 1.71 },
        JPY: { USD: 0.0091, EUR: 0.0078, GBP: 0.0067, AUD: 0.012, CAD: 0.011 },
        AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.0, CAD: 0.93 },
        CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.0, AUD: 1.08 },
      },
    }
  },
  methods: {
    async convertCurrency() {
      this.isLoading = true
      this.error = null
      this.result = null

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (this.amount <= 0) {
          throw new Error('Amount must be greater than zero.')
        }

        if (this.fromCurrency === this.toCurrency) {
          this.result = this.amount
        } else {
          const rate = this.exchangeRates[this.fromCurrency]?.[this.toCurrency]
          if (!rate) {
            throw new Error('Conversion rate not available.')
          }
          this.result = (this.amount * rate).toFixed(2)
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
}
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