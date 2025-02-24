import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/api/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  function addToCart(product: Product) {
    items.value.push(product)
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function clearCart() {
    items.value = []
  }

  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() => items.value.reduce((total, item) => total + item.price, 0))

  return { 
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  }
}, {
  persist: true
}) 