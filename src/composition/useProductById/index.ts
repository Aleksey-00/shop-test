import { ProductRepository } from '@/api/repositories/ProductRepository';
import type { Product } from '@/api/types/product';
import { ref } from 'vue';

export const useProductById = () => {
    const productRepository = new ProductRepository();
    const product = ref<Product | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchProduct = async (id: string) => {
        try {
            loading.value = true;
            const response = await productRepository.getById(id);
            product.value = response;
            loading.value = false;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Произошла ошибка при загрузке продукта';
            loading.value = false;
        }
    }

    return {
        product,
        loading,
        error,
        fetchProduct
    }
}