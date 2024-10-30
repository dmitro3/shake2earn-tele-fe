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
  data?: D,
  auth = false,
) => {
  let headers = { ...defaultHeaders };
  if (auth) {
    headers = { ...headers, ...getAuthHeader() };
  }

  return axiosInstance.request<R>({ method, url, data, headers });
};

export const getWithoutToken = <R>(url: string) =>
  baseRequest<R, undefined>('get', url, undefined, false);
export const getWithToken = <R>(url: string) =>
  baseRequest<R, undefined>('get', url, undefined, true);

export const postWithoutToken = <R, D>(url: string, data: any) =>
  baseRequest<R, D>('post', url, data, false);
export const postWithToken = <R, D>(url: string, data: any) =>
  baseRequest<R, D>('post', url, data, true);

export const putWithoutToken = <R, D>(url: string, data: any) =>
  baseRequest<R, D>('put', url, data, false);
export const putWithToken = <R, D>(url: string, data: any) =>
  baseRequest<R, D>('put', url, data, true);

export const deleteWithoutToken = <R>(url: string) =>
  baseRequest<R, undefined>('delete', url, undefined, false);
export const deleteWithToken = <R>(url: string) =>
  baseRequest<R, undefined>('delete', url, undefined, true);
