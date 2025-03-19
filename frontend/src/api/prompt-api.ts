import { Configuration, PromptApi } from '../generated-sources'
import { addAcquireTokenInterceptor } from '../auth/acquire-token-interceptor'


const config = new Configuration({
  baseOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

// Singleton instance of PromptApi to be used across the application
export const promptApi = new PromptApi(config, import.meta.env.VITE_API_BASE_URL, axiosInstance)