import { ProductCategoriesRepository } from '@/api/repositories/ProductCategoriesRepository';
import type { Category } from '@/api/types/categories';
import { ref } from 'vue';

export const useProductsCategories = () => {
    const productCategoriesRepository = new ProductCategoriesRepository();
    const categories = ref<Category[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchCategories = async () => {
        try {
            loading.value = true;
            const response = await productCategoriesRepository.getAll();
            categories.value = response;
            loading.value = false;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Произошла ошибка при загрузке категорий';
            loading.value = false;
        }
    }

    return { 
        categories,
        loading,
        error,
        fetchCategories
    }
}
