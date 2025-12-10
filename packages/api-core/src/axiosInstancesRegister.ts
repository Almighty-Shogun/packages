import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig } from 'axios'

type RegisterInstance<Name extends string = string> = {
    name: Name;
    url: string;
    responseInterceptors?: [
        (response: any) => any,
        (error: any) => any
    ];
    requestInterceptors?: [
        (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
        (error: any) => any
    ];
    config?: AxiosRequestConfig;
}

export default function<const T extends readonly RegisterInstance[]>(instances: T): { [K in T[number]['name']]: AxiosInstance } {
    const instancesMap = {} as { [K in T[number]['name']]: AxiosInstance };

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

        instancesMap[instance.name as T[number]['name']] = axiosInstance;
    });

    return instancesMap;
}
