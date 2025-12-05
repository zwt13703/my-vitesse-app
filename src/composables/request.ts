// 定义请求配置类型
export interface RequestConfig extends RequestInit {
  // 请求URL
  url?: string
  // 自动拼接的URL前缀
  baseURL?: string
  // 可以添加自定义配置
  showLoading?: boolean
  showError?: boolean
  // 请求参数
  params?: Record<string, any>
}

// 定义响应类型
export interface RequestResponse<T = any> {
  code: number
  message: string
  data: T
}

// 创建请求方法
const request = async <T = any>(config: RequestConfig): Promise<T> => {
  const {
    url,
    baseURL = import.meta.env.VITE_API_BASE_URL || '',
    showLoading = true,
    showError = true,
    params,
    ...init
  } = config

  // 拼接完整URL
  let fullUrl = ''
  if (url?.startsWith('http')) {
    fullUrl = url
  } else {
    fullUrl = baseURL + (url || '')
  }

  // 处理GET请求参数
  if (params && init.method?.toUpperCase() === 'GET') {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, params[key].toString())
      }
    }
    const paramsString = searchParams.toString()
    if (paramsString) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + paramsString
    }
  }

  // 可以添加请求加载动画
  if (showLoading) {
    // 显示加载动画
  }

  try {
    // 发送请求
    const response = await fetch(fullUrl, init)
    
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 解析响应数据
    const responseData = await response.json() as RequestResponse<T>

    // 隐藏加载动画
    if (showLoading) {
      // 隐藏加载动画
    }

    // 统一处理响应数据
    const { code, message, data } = responseData

    if (code === 200) {
      return data
    } else {
      // 统一处理错误信息
      if (showError) {
        console.error('Request error:', message)
      }
      throw new Error(message || 'Request failed')
    }
  } catch (error) {
    // 隐藏加载动画
    if (showLoading) {
      // 隐藏加载动画
    }

    // 统一处理网络错误
    const errorMessage = error instanceof Error ? error.message : 'Network error'
    if (showError) {
      console.error('Network error:', errorMessage)
    }
    throw new Error(errorMessage)
  }
}

// 封装GET请求
const get = <T = any>(url: string, params?: Record<string, any>, config?: Omit<RequestConfig, 'url' | 'method' | 'params'>): Promise<T> => {
  return request<T>({
    method: 'GET',
    url,
    params,
    ...config,
  })
}

// 封装POST请求
const post = <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'body'>): Promise<T> => {
  return request<T>({
    method: 'POST',
    url,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    ...config,
  })
}

// 封装PUT请求
const put = <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'body'>): Promise<T> => {
  return request<T>({
    method: 'PUT',
    url,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    ...config,
  })
}

// 封装DELETE请求
const del = <T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<T> => {
  return request<T>({
    method: 'DELETE',
    url,
    ...config,
  })
}

// 请求取消机制 (使用AbortController)
class CancelToken {
  private controller: AbortController

  constructor() {
    this.controller = new AbortController()
  }

  get signal() {
    return this.controller.signal
  }

  cancel(reason?: string) {
    this.controller.abort(reason)
  }
}

const createCancelToken = () => {
  return new CancelToken()
}

// 导出所有方法
export {
  request,
  get,
  post,
  put,
  del,
  CancelToken,
  createCancelToken,
}

// 默认导出
export default request