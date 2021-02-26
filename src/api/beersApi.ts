import axios, { AxiosResponse, CancelToken } from 'axios'

import { toastError } from 'common/helpers/toastHelper'
import { Paging } from 'common/models';

import { axiosErrorHandlingMiddleware, axiosSuccessHandlingMiddleware } from './middleware/axiosMiddlewares'


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

export interface Beers {
  beers: Beer[];
}
export interface BeerFilters {
  name?: string;
  minAlcohol?: number;
  maxAlcohol?: number;
}


const url = `https://api.punkapi.com/v2`;

const beersApi = axios.create({
  baseURL: url,
});

beersApi.interceptors.response
  .use(axiosSuccessHandlingMiddleware, axiosErrorHandlingMiddleware);

export const getBeers = async (
  filters: BeerFilters,
  paging: Paging,
  cancelToken?: CancelToken
): Promise<Beers> => {
  const { name, minAlcohol, maxAlcohol } = filters
  const { pageSize, pageNumber } = paging;

  const params = buildQueryParams(
    pageSize,
    pageNumber,
    name,
    minAlcohol,
    maxAlcohol
  );

  const response = await beersApi.get<Beer[]>(`/beers`, {
    params,
    cancelToken,
  });
  return { beers: response?.data ?? [] };
};

export const getBeer = async (id: number): Promise<Beer | undefined> => {
  const response = await beersApi.get<Beer[]>(`/beers/${id}`);
  return response?.data?.length === 1 ? response.data[0] : undefined;
};


// url query helper
const buildQueryParams = (
  pageSize: number,
  pageNumber: number,
  name: string | undefined,
  minAlcohol: number | undefined,
  maxAlcohol: number | undefined
): URLSearchParams => {
  var params = new URLSearchParams({
    "per_page": String(pageSize),
    "page": String(pageNumber)
  });

  name && params.append("beer_name", name);
  minAlcohol && params.append("abv_gt", String(minAlcohol));
  maxAlcohol && params.append("abv_lt", String(maxAlcohol));

  return params;
};
