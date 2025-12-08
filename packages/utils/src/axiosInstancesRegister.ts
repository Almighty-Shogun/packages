import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig } from 'axios'

export interface RegisterInstance {
    name: string;
    url: string;
    responseInterceptors?: [
        (response: any) => any,
        (error: any) => any
    ],
    requestInterceptors?: [
        (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
        (error: any) => any
    ]
    config?: AxiosRequestConfig;
}

export default function (instances: RegisterInstance[]): Record<string, AxiosInstance> {
    const instancesMap: Record<string, AxiosInstance> = {};

    instances.forEach(instance => {
        const axiosInstance = axios.create({
            baseURL: instance.url,
            ...instance.config
        });

        if (instance.responseInterceptors) {
            const [onSuccess, onError] = instance.responseInterceptors;
            axiosInstance.interceptors.response.use(onSuccess, onError);
        }

        if (instance.requestInterceptors) {
            const [onSuccess, onError] = instance.requestInterceptors;
            axiosInstance.interceptors.request.use(onSuccess, onError);
        }

        instancesMap[instance.name] = axiosInstance;
    });

    return instancesMap;
}
