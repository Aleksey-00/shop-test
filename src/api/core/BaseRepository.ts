import type { IRepository } from '../types/repository';
import { HttpClient } from './HttpClient';

export abstract class BaseRepository<T> implements IRepository<T> {
  protected http: HttpClient;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.http = HttpClient.getInstance();
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  async getById(id: number | string): Promise<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  async create(item: Partial<T>): Promise<T> {
    return this.http.post<T>(this.endpoint, item);
  }

  async update(id: number | string, item: Partial<T>): Promise<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, item);
  }

  async delete(id: number | string): Promise<void> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
} 