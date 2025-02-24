import type { Product } from '@/api/types/product';
import { ref } from 'vue';
import { ProductsByCategoryRepository } from '@/api/repositories/ProductsByCategory';

export const useProductsByCategory = () => {
    const productsByCategoryRepository = new ProductsByCategoryRepository();
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchProductsByCategory = async (category: string) => {
        try {
            loading.value = true;
            const response = await productsByCategoryRepository.getByCategory(category);
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
        fetchProductsByCategory
    }
}   