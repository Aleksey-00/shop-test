<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'

const cart = useCartStore()

const headers = [
  { title: 'Название', key: 'title' },
  { title: 'Цена', key: 'price' },
  { title: 'Действия', key: 'actions', sortable: false }
]

const items = computed(() => cart.items)

const showDialog = ref(false)

const checkout = () => {
  showDialog.value = true
  cart.clearCart()
}
</script>

<template>
  <h1>Корзина</h1>
  
  <v-table v-if="items.length">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">
            {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="text-left">{{ item.title }}</td>
        <td class="text-left">{{ item.price }} ₽</td>
        <td class="text-left">
          <v-btn 
            color="error" 
            variant="tonal" 
            density="compact"
            @click="cart.removeFromCart(item.id)"
          >
            Удалить
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div v-else class="text-center my-4">
    Корзина пуста
  </div>

  <div class="d-flex justify-center mt-4" v-if="items.length">
    <v-btn color="primary" size="large" @click="checkout">
      Оформить заказ
    </v-btn>
  </div>

  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-text class="text-center pa-4">
        <h2 class="text-h5 mb-4">Поздравляем!</h2>
        <p>Ваш заказ успешно оформлен.</p>
      </v-card-text>
      <v-card-actions class="justify-center pb-4">
        <v-btn color="primary" @click="showDialog = false">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-table {
  margin-top: 20px;
}
.v-btn:hover {
  background-color: #2647ec !important;
}
</style>