<script setup lang="ts">
import { useListProducts } from '@/composition/useListProducts';
import { useProductsCategories } from '@/composition/useProductsCategories';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const { products, loading, error, fetchProducts } = useListProducts();
const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    fetchCategories 
} = useProductsCategories();
const cartStore = useCartStore();

const navigateToCategory = (category: string) => {
    router.push(`/products/category/${category}`);
};

const navigateToProduct = (productId: number) => {
    router.push(`/products/${productId}`);
};

const buyProduct = (productId: number) => {
    const product = products.value.find(p => p.id === productId);
    if (product) {
        cartStore.addToCart(product);
    }
};

onMounted(async () => {
    await Promise.all([fetchProducts(), fetchCategories()]);
});
</script>

<template>
    <div class="list-container">
        <h1>Список категорий и продуктов</h1>
        
        <div class="categories-section">
            <div v-if="categoriesLoading" class="loader-container">
                <Loader />
            </div>
            <div v-else-if="categoriesError" class="error-message">
                Ошибка при загрузке категорий
            </div>
            <div v-else class="categories-list">
                <v-chip
                    v-for="category in categories"
                    :key="category"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                    @click="navigateToCategory(category)"
                    :style="{ cursor: 'pointer' }"
                >
                    {{ category }}
                </v-chip>
            </div>
        </div>

        <div v-if="loading" class="loader-container">
            <Loader />
        </div>
        <div v-else>
            <div v-if="error" class="error-message">
                Ошибка при загрузке товаров
            </div>
            <div v-else-if="!products.length" class="error-message">
                Список товаров пуст
            </div>
            <v-table v-else>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th>Описание</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="product in products" 
                        :key="product.id"
                        @click="navigateToProduct(product.id)"
                        class="product-row"
                    >
                        <td>{{ product.id }}</td>
                        <td>
                            <img 
                                :src="product.image" 
                                :alt="product.title"
                                class="product-image"
                            >
                        </td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.description }}</td>
                        <td>
                            <v-btn
                                color="primary"
                                size="small"
                                @click.stop="buyProduct(product.id)"
                                class="buy-button"
                            >
                                <v-scale-transition>
                                    Купить
                                </v-scale-transition>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<style scoped>
.list-container {
    padding: 20px;
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.error-message {
    text-align: center;
    color: #666;
    margin: 40px 0;
    font-size: 1.2em;
}

:deep(.v-table) {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    margin-top: 16px;
}

:deep(.v-table > .v-table__wrapper > table) {
    width: 100%;
}

:deep(.v-table > .v-table__wrapper > table > thead) {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
}

.product-image {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.categories-section {
    margin: 20px 0;
}

.categories-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.product-row {
    cursor: pointer;
}

.product-row:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.buy-button {
    position: relative;
    overflow: hidden;
}

:deep(.product-row .v-btn.v-btn--size-small.v-btn--variant-elevated) {
    transition: all 0.3s ease;
}

:deep(.product-row .v-btn.v-btn--size-small.v-btn--variant-elevated:hover) {
    background-color: #1565C0 !important;
    transform: scale(1.05);
}

:deep(.product-row .v-btn.v-btn--size-small.v-btn--variant-elevated:active) {
    transform: scale(0.95);
}
</style>