import { toastError } from 'common/helpers/toastHelper'

import axios, { AxiosError } from 'axios'


export const axiosErrorHandlingMiddleware = (error: AxiosError) => {
  // console.log(error);
  toastError(error.message);

  if (axios.isCancel(error)) return;

  return Promise.reject(error);
};
