import { BaseRepository } from '../core/BaseRepository';
import type { Category } from '../types/categories';

export class ProductCategoriesRepository extends BaseRepository<Category> {
    constructor() {
        super('/products/categories');
    }
}