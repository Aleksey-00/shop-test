import axios, { type AxiosInstance } from 'axios';

export class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public get<T>(url: string): Promise<T> {
    return this.axiosInstance.get<T>(url).then(response => response.data);
  }

  public post<T>(url: string, data: any): Promise<T> {
    return this.axiosInstance.post<T>(url, data).then(response => response.data);
  }

  public put<T>(url: string, data: any): Promise<T> {
    return this.axiosInstance.put<T>(url, data).then(response => response.data);
  }

  public delete<T>(url: string): Promise<T> {
    return this.axiosInstance.delete<T>(url).then(response => response.data);
  }
} 