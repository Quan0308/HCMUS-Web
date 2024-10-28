import axios from 'axios';

interface AxiosInstance {
  method: string;
  url: string;
  params?: object;
  data?: object;
  timeout: number;
  headers: object;
}

const apiEndpoint = 'https://api.unsplash.com';

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error' && !error.response) {
      return Promise.reject(error);
    }
    if (!error.response) return Promise.reject(error);
    const { status } = error.response;
    if (status === 404) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

const doAxios = (method: string, action: string, data?: object, params?: object) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Client-ID YcTNypw20bNFUhRX-juv5ofkosZgTG7nx4s35CF3wuI`
  };

  const obj: AxiosInstance = {
    method: method,
    url: `${apiEndpoint}/${action}`,
    params: params || undefined,
    data: data || undefined,
    timeout: 30000,
    headers: headers
  };

  return axios(obj);
};

export const doGet = (action: string, params?: object) => {
  return doAxios('get', action, undefined, params);
};
