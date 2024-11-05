import axios, { Method } from 'axios';
import config from 'configs/env';

import auth from 'utils/auth';

const axiosInstance = axios.create({ baseURL: config.apiUrl });

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeader = () => {
  const authHeader = auth.getAuthHeader();
  return authHeader
    ? {
        'x-shake-auth': authHeader,
      }
    : {};
};

const baseRequest = <R, D>(
  method: Method,
  url: string,
  configs: { params?: any; data?: D } = {},
  auth = false,
) => {
  let headers = { ...defaultHeaders };
  if (auth) {
    headers = { ...headers, ...getAuthHeader() };
  }

  return axiosInstance.request<R>({ method, url, headers, ...configs });
};

export const getWithoutToken = <R>(
  url: string,
  config: { params?: any } = {},
) => baseRequest<R, undefined>('get', url, config);
export const getWithToken = <R>(url: string, config: { params?: any } = {}) =>
  baseRequest<R, undefined>('get', url, config, true);

export const postWithoutToken = <R, D>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R, D>('post', url, config);
export const postWithToken = <R, D>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R, D>('post', url, config, true);

export const putWithoutToken = <R, D>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R, D>('put', url, config);
export const putWithToken = <R, D>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R, D>('put', url, config, true);

export const deleteWithoutToken = <R>(
  url: string,
  config: { params?: any } = {},
) => baseRequest<R, undefined>('delete', url, config);
export const deleteWithToken = <R>(
  url: string,
  config: { params?: any } = {},
) => baseRequest<R, undefined>('delete', url, config, true);
