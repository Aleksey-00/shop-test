import { BaseRepository } from '../core/BaseRepository';
import type { Product } from '../types/product';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super('/products');
  }
} 