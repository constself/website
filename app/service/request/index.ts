// src/utils/axios.ts

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

// 定义接口
interface HttpResponse<T = any> {
  code: number
  message: string
  data: T
}

class HttpRequest {
  private instance: AxiosInstance
  private baseConfig: AxiosRequestConfig = {
    // baseURL: '/proxy-api',
    baseURL: 'https://api.huizhuanzhuan.cn/go/website/business/v1',
    timeout: 5000,
  }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.initInterceptors()
  }

  private initInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在这里可以添加token等认证信息
        // const token = localStorage.getItem('token')
        // if (token)
        //   config.headers.Authorization = `Bearer ${token}`

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: any) => {
        const res = response.data
        if (res.code !== 200) {
          // 处理一些错误情况
          return Promise.reject(new Error(res.message || 'Error'))
        }
        else {
          return res
        }
      },
      (error) => {
        console.error('请求出错: ', error)
        return Promise.reject(error)
      },
    )
  }

  public request<T = any>(config: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.instance.delete(url, config)
  }
}

// 创建实例
const http = new HttpRequest({})

export default http
