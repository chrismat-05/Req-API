import axios from 'axios';

/**
 * Makes an HTTP request and returns formatted response data
 * @param {Object} config - Request configuration
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} config.url - Request URL
 * @param {Array} config.headers - Array of header objects { key, value }
 * @param {Object|string} config.body - Request body (for non-GET requests)
 * @returns {Promise<Object>} Formatted response { status, time, headers, body }
 */
export const makeRequest = async ({ method, url, headers = [], body }) => {
  const startTime = performance.now();
  let responseTime;
  
  try {
    const axiosHeaders = headers.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {});

    const config = {
      method: method.toLowerCase(),
      url,
      headers: axiosHeaders,
      ...(method !== 'GET' && { data: body })
    };

    const response = await axios(config);
    responseTime = Math.round(performance.now() - startTime);

    return {
      status: response.status,
      time: responseTime,
      headers: response.headers,
      body: response.data
    };
  } catch (error) {
    responseTime = Math.round(performance.now() - startTime);
    
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        time: responseTime,
        headers: error.response?.headers || {},
        body: error.response?.data || {
          error: error.message,
          details: 'Network or server error occurred'
        }
      };
    }

    return {
      status: 500,
      time: responseTime,
      headers: {},
      body: {
        error: 'Request failed',
        details: error.message
      }
    };
  }
};