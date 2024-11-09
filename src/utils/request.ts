import axios, { AxiosError, AxiosPromise, AxiosResponse, Method } from 'axios';
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

const baseRequest = <R>(
  method: Method,
  url: string,
  configs: { params?: any; data?: any } = {},
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
) => baseRequest<R>('get', url, config);
export const getWithToken = <R>(url: string, config: { params?: any } = {}) =>
  baseRequest<R>('get', url, config, true);

export const postWithoutToken = <R>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R>('post', url, config);
export const postWithToken = <R>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R>('post', url, config, true);

export const putWithoutToken = <R>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R>('put', url, config);
export const putWithToken = <R>(
  url: string,
  config: { params?: any; data?: any } = {},
) => baseRequest<R>('put', url, config, true);

export const deleteWithoutToken = <R>(
  url: string,
  config: { params?: any } = {},
) => baseRequest<R>('delete', url, config);
export const deleteWithToken = <R>(
  url: string,
  config: { params?: any } = {},
) => baseRequest<R>('delete', url, config, true);

export type RequestType<R, E = any> =
  | {
      success: true;
      response: AxiosResponse<R>;
    }
  | {
      success: false;
      error: AxiosError<E>;
    };

export const withAxiosRequestWrapper = async <R, E = any>(
  request: AxiosPromise<R>,
): Promise<RequestType<R, E>> => {
  try {
    const response = await request;
    return { success: true, response };
  } catch (error) {
    return { success: false, error: error as AxiosError<E> };
  }
};
