import axios, { AxiosError, AxiosResponse } from 'axios'

import { toastError } from 'common/helpers/toastHelper'


export const axiosErrorHandlingMiddleware = (error: AxiosError) => {
  if (axios.isCancel(error)) return;

  // console.log(error);
  toastError(error.message);

  return Promise.reject(error);
};

export const axiosSuccessHandlingMiddleware = (response: AxiosResponse) => {
  // handle >= 400 status codes
  if (response.status >= 400) {
    toastError(response.statusText);
  }
  return response;
};
