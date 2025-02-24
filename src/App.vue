<script setup lang="ts">
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <v-app class="app">
    <pre>{{ cartStore.totalItems }}</pre>
    <section class="header">
      <v-app-bar color="primary">
        <v-container class="d-flex align-center">
          <v-btn to="/" variant="text" class="title-btn">
            <v-app-bar-title>Shop - test</v-app-bar-title>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn to="/" variant="text">
            Продукты и категории
          </v-btn>
          <v-btn to="/cart" variant="text" class="cart-btn">
            <v-icon>mdi-cart</v-icon>
            <v-badge
              v-if="cartStore.totalItems"
              color="error"
              :content="cartStore.totalItems"
              floating
            ></v-badge>
          </v-btn>
        </v-container>
      </v-app-bar>
    </section>
    <section class="content">
      <router-view />
    </section>
  </v-app>
</template>

<style>
.content {
  height: 100%;
  padding-top: 64px;
}
#app {
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
  margin: 0 auto;
  max-width: 1920px;
  padding: 0;
}

.v-btn {
  text-decoration: none !important;
  color: #fff !important;
}
.v-btn:hover {
  opacity: 1 !important;
  background: none !important;
  color: #fff !important;
}

.cart-btn {
  position: relative;
}

.title-btn {
  padding: 0 !important;
  height: auto !important;
}

.v-app-bar-title {
  padding: 0 8px;
}
</style>
