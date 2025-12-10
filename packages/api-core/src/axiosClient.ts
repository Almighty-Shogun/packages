import type { ApiResult } from './types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export default class {
    protected axios: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.axios = instance;
    }

    async get<T, E = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T, E>> {
        return await this.axios.get(url, config);
    }

    async post<T, E = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T, E>> {
        return await this.axios.post(url, data, config);
    }

    async put<T, E = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T, E>> {
        return await this.axios.put(url, data, config);
    }

    async patch<T, E = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T, E>> {
        return await this.axios.patch(url, data, config);
    }

    async delete<T, E = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T, E>> {
        return await this.axios.delete(url, config);
    }
}
