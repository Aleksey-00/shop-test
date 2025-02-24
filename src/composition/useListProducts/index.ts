import { ProductRepository } from '@/api/repositories/ProductRepository';
import type { Product } from '@/api/types/product';
import { ref } from 'vue';

export const useListProducts = () => {
    const productRepository = new ProductRepository();
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        try {
            loading.value = true;
            const response = await productRepository.getAll();
            products.value = response;
            loading.value = false;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Произошла ошибка при загрузке продуктов';
            loading.value = false;
        }
    }

    return {
        products,
        loading,
        error,
        fetchProducts
    }
}