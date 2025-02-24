<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductById } from '@/composition/useProductById';
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart'

const route = useRoute();
const { product, loading, error, fetchProduct } = useProductById(); 
const cartStore = useCartStore()

onMounted(async () => {
    await fetchProduct(route.params.id as string);
});

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
    <v-container>
        <h1 class="mb-4">Детали продукта</h1>
        <v-row v-if="!loading && !error">
            <v-col cols="12" md="6">
                <v-img
                    :src="product?.image"
                    :alt="product?.name"
                    cover
                    height="400"
                    class="rounded-lg"
                />
            </v-col>
            
            <v-col cols="12" md="6">
                <v-card class="pa-4" flat>
                    <v-card-title class="text-h4 mb-2">
                        {{ product?.name }}
                    </v-card-title>
                    
                    <v-card-text>
                        <p class="text-body-1 mb-4">{{ product?.description }}</p>
                        <p class="text-h5 font-weight-bold">{{ product?.price }} ₽</p>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="primary"
                            size="large"
                            block
                            @click="addToCart(product)"
                        >
                            Купить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-else-if="loading" justify="center">
            <v-col cols="12" class="text-center">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                />
            </v-col>
        </v-row>

        <v-row v-else-if="error" justify="center">
            <v-col cols="12" class="text-center">
                <v-alert
                    type="error"
                    title="Ошибка"
                    text="Произошла ошибка при загрузке товара"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
:deep(.v-btn) {
    background-color: #2647ec !important;
    color: #fff !important;
}
</style>