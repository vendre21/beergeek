import axios, { AxiosError } from 'axios'

import { toastError } from 'common/helpers/toastHelper'


export const axiosErrorHandlingMiddleware = (error: AxiosError) => {
  if (axios.isCancel(error)) return;

  // console.log(error);
  toastError(error.message);

  return Promise.reject(error);
};
