export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number | string): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(id: number | string, item: Partial<T>): Promise<T>;
  delete(id: number | string): Promise<void>;
} 