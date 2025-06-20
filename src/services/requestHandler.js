import axios from 'axios'

export async function makeRequest({ method, url, headers, body }) {
  const startTime = performance.now()

  try {
    const config = {
      method,
      url,
      headers: headers || {},
      data: body || {},
      validateStatus: () => true,
    }

    const response = await axios(config)
    const endTime = performance.now()

    return {
      status: response.status,
      statusText: response.statusText,
      timeTaken: Math.round(endTime - startTime),
      headers: response.headers,
      data: response.data,
      error: null,
    }
  } catch (error) {
    const endTime = performance.now()

    return {
      status: error.response?.status || 500,
      statusText: error.response?.statusText || 'Error',
      timeTaken: Math.round(endTime - startTime),
      headers: error.response?.headers || {},
      data: error.response?.data || { message: error.message },
      error: error.message,
    }
  }
}
