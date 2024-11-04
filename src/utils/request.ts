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

const baseRequest = <R, D = any>(
  method: Method,
  url: string,
  {
    data,
    params,
    auth = false,
  }: {
    data?: D;
    params?: any;
    auth?: boolean;
  },
) => {
  let headers = { ...defaultHeaders };
  if (auth) {
    headers = { ...headers, ...getAuthHeader() };
  }

  return axiosInstance.request<R>({ method, url, data, headers, params });
};

export const getWithoutToken = <R>(url: string, { params }: { params?: any }) =>
  baseRequest<R, undefined>('get', url, { params });
export const getWithToken = <R>(url: string, { params }: { params?: any }) =>
  baseRequest<R, undefined>('get', url, { params, auth: true });

export const postWithoutToken = <R, D>(
  url: string,
  { params, data }: { params?: any; data?: any },
) => baseRequest<R, D>('post', url, { params, data });
export const postWithToken = <R, D>(
  url: string,
  { params, data }: { params?: any; data?: any },
) => baseRequest<R, D>('post', url, { params, data, auth: true });

export const putWithoutToken = <R, D>(
  url: string,
  { params, data }: { params?: any; data?: any },
) => baseRequest<R, D>('put', url, { params, data });
export const putWithToken = <R, D>(
  url: string,
  { params, data }: { params?: any; data?: any },
) => baseRequest<R, D>('put', url, { params, data, auth: true });

export const deleteWithoutToken = <R>(
  url: string,
  { params }: { params?: any },
) => baseRequest<R, undefined>('delete', url, { params });
export const deleteWithToken = <R>(url: string, { params }: { params?: any }) =>
  baseRequest<R, undefined>('delete', url, { params, auth: true });
