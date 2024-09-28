// src/client/ClientBuilder.ts

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// نوع Plugin اصلاح شده
interface Plugin {
    (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig;
}

export class ClientBuilder {
    private httpClient: AxiosInstance;
    private plugins: Plugin[] = [];

    constructor(baseURL: string) {
        // ایجاد یک instance جدید از axios به عنوان httpClient
        this.httpClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }

    // افزودن پلاگین به لیست پلاگین‌ها
    public addPlugin(plugin: Plugin): void {
        this.plugins.push(plugin);
    }

    // گرفتن یک کلاینت HTTP با استفاده از پلاگین‌ها
    public getHttpClient(): AxiosInstance {
        // هر پلاگین را به کلاینت axios اعمال می‌کنیم
        this.plugins.forEach((plugin) => {
            // اعمال پلاگین‌ها با استفاده از interceptors axios
            this.httpClient.interceptors.request.use(plugin);
        });

        return this.httpClient;
    }
}
