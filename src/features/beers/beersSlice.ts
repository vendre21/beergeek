import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'

import { Beer, getBeer, getBeers } from 'api/beersApi'

import { AppThunk, RootState } from 'app/store'
import { toastWarning } from 'common/helpers/toastHelper'


export interface Beers {
  beers: Beer[];
}

interface BeerDetails {
  beer?: Beer;
}

export interface BeerFilters {
  name?: string;
  minAlcohol?: number;
  maxAlcohol?: number;
}

export interface Paging {
  pageSize: number;
  pageNumber: number;
  hasMore: boolean;
}

type BeersState = Beers &
  BeerDetails & { filters: BeerFilters } & { paging: Paging };

const beersInitialState: BeersState = {
  beers: [],
  filters: {},
  paging: { pageSize: 12, pageNumber: 1, hasMore: true },
};

const beersSlice = createSlice({
  name: "beersSlice",
  initialState: beersInitialState,
  reducers: {
    fetchBeersSuccess(
      state,
      {
        payload: { beers, hasMore },
      }: PayloadAction<{ beers: Beer[]; hasMore: boolean }>
    ) {
      state.paging.hasMore = hasMore;
      state.beers = beers;
    },
    fetchBeerSuccess(state, { payload: { beer } }: PayloadAction<BeerDetails>) {
      state.beer = beer;
      state.beers = [];
    },
    // filters
    setNameFilter(state, { payload }: PayloadAction<string>) {
      state.filters.name = payload;
      state.paging.pageNumber = 1;
    },
    setMinAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.minAlcohol = payload;
      state.paging.pageNumber = 1;
    },
    setMaxAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.maxAlcohol = payload;
      state.paging.pageNumber = 1;
    },
    clearFilters(state) {
      state.filters.name = undefined;
      state.filters.minAlcohol = undefined;
      state.filters.maxAlcohol = undefined;
      state.paging.pageNumber = 1;
    },
    // paging
    setNextPage(state, { payload }: PayloadAction<number>) {
      state.paging.pageNumber = payload;
    },
  },
});

const { fetchBeersSuccess, fetchBeerSuccess } = beersSlice.actions;

// exported actions
export const {
  setNameFilter,
  setMinAlcFilter,
  setMaxAlcFilter,
  setNextPage,
  clearFilters,
} = beersSlice.actions;

// selectors
export const selectBeers = (state: RootState): Beers => state.beers;
export const selectBeer = (state: RootState): BeerDetails => state.beers;
export const selectBeersPaging = (state: RootState): Paging =>
  state.beers.paging;
export const selectBeerFilters = (state: RootState): BeerFilters =>
  state.beers.filters;

// reducer
export default beersSlice.reducer;

// async actions
export const fetchBeers = (cancelToken?: CancelToken): AppThunk =>
  async function fetchBeers(dispatch, getState) {
    const {
      filters: { name, minAlcohol, maxAlcohol },
      paging: { pageSize, pageNumber },
    } = getState().beers;

    const query = buildQuery(
      pageSize,
      pageNumber,
      name,
      minAlcohol,
      maxAlcohol
    );

    const newBeers = await getBeers(query, cancelToken);
    const hasMore = newBeers.length >= pageSize ? true : false;

    dispatch(
      fetchBeersSuccess({
        beers: newBeers,
        hasMore,
      })
    );

    newBeers.length === 0 && toastWarning("Sorry bro, nothing to show!");
  };

export const fetchBeer = (id: number): AppThunk =>
  async function fetchBeer(dispatch) {
    const beer = await getBeer(id);
    dispatch(fetchBeerSuccess({ beer }));
  };

// url query helper
const buildQuery = (
  pageSize: number,
  pageNumber: number,
  name: string | undefined,
  minAlcohol: number | undefined,
  maxAlcohol: number | undefined
): string => {
  const pagingQuery =
    (pageSize ? `&per_page=${pageSize}` : "") +
    (pageNumber ? `&page=${pageNumber}` : "");
  const filterQuery =
    (name ? `&beer_name=${name}` : "") +
    (minAlcohol ? `&abv_gt=${minAlcohol}` : "") +
    (maxAlcohol ? `&abv_lt=${maxAlcohol}` : "");
  return pagingQuery + filterQuery;
};
