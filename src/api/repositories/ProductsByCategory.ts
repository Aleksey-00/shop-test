import { BaseRepository } from '../core/BaseRepository';
import type { Product } from '../types/product';

export class ProductsByCategoryRepository extends BaseRepository<Product> {
    constructor() {
        super('/products/category/');
    }

    async getByCategory(category: string): Promise<Product[]> {
        const response = await this.http.get<Product[]>(`/products/category/${category}`);
        return response;
    }
} 