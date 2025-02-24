<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductsByCategory } from '@/composition/useProductsByCategory';
import { onMounted } from 'vue';
const route = useRoute();
const { products, loading, error, fetchProductsByCategory } = useProductsByCategory();

onMounted(async () => {
    await fetchProductsByCategory(route.params.category as string);
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB' 
  }).format(price);
}
</script>

<template>
    <v-container>
        <h1>Детали категории</h1>
        <v-card class="mt-4">
            <v-table fixed-header :max-height="'calc(100dvh - 155px)'">
                <thead>
                    <tr>
                        <th class="text-left">Название</th>
                        <th class="text-center">Изображение</th>
                        <th class="text-right">Цена</th>
                        <th class="text-left">Описание</th>
                        <th class="text-left">Категория</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="5">
                            <v-skeleton-loader
                                type="table-row"
                                class="my-2"
                            ></v-skeleton-loader>
                        </td>
                    </tr>
                    <tr v-else-if="error">
                        <td colspan="5" class="text-center">{{ error }}</td>
                    </tr>
                    <tr v-else-if="!products.length">
                        <td colspan="5" class="text-center">Нет доступных данных</td>
                    </tr>
                    <tr v-for="item in products" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td class="text-center">
                            <v-img
                                :src="item.image"
                                :width="50"
                                :aspect-ratio="1"
                                cover
                                class="mx-auto"
                            />
                        </td>
                        <td class="text-right">{{ formatPrice(item.price) }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.category }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>
</template>

<style scoped>
.v-table {
    table-layout: fixed;
    height: 100%;
    overflow: auto;
}

.v-table th:nth-child(1),
.v-table td:nth-child(1) {
    width: 20%;
}

.v-table th:nth-child(2),
.v-table td:nth-child(2) {
    width: 15%;
}

.v-table th:nth-child(3),
.v-table td:nth-child(3) {
    width: 10%;
}

.v-table th:nth-child(4),
.v-table td:nth-child(4) {
    width: 35%;
    max-width: 0;
}

.v-table th:nth-child(5),
.v-table td:nth-child(5) {
    width: 20%;
}

.v-table td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
    padding: 12px 16px !important;
}

:deep(.v-table__wrapper) {
    overflow-y: auto;
}

:deep(.v-table > .v-table__wrapper > table) {
    height: 100%;
}
</style>