import axios, { CancelToken } from 'axios'

import { toastError } from 'common/helpers/toastHelper'

import { axiosErrorHandlingMiddleware } from './middleware/errorHandlingMiddleware'


export interface Beer {
  id: number;
  name: string;
  abv: number;
  description: string;
  first_brewed: string;
  image_url: string;
  brewers_tips: string;
  food_pairing: string[];
}

const url = `https://api.punkapi.com/v2`;

const beersApi = axios.create({
  baseURL: url,
});

beersApi.interceptors.response.use((response) => {
  // handle >= 400 status codes
  if (response.status >= 400) {
    toastError(response.statusText);
  }
  return response;
}, axiosErrorHandlingMiddleware);

export const getBeers = async (
  query: string,
  cancelToken?: CancelToken
): Promise<Beer[]> => {
  const response = await beersApi.get<Beer[]>(`/beers?${query}`, {
    cancelToken,
  });
  return response?.data ?? [];
};

export const getBeer = async (id: number): Promise<Beer | undefined> => {
  const response = await beersApi.get<Beer[]>(`/beers/${id}`);
  return response?.data?.length === 1 ? response.data[0] : undefined;
};
