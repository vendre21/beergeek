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
  BeerDetails & { filters: BeerFilters } & { paging: Paging } & {
    hasQueryParamsChanged: boolean;
  };

const initialState: BeersState = {
  beers: [],
  filters: {},
  paging: { pageSize: 12, pageNumber: 1, hasMore: true },
  hasQueryParamsChanged: true,
};

const beersSlice = createSlice({
  name: "beersSlice",
  initialState: initialState,
  reducers: {
    fetchBeersSuccess(
      state,
      {
        payload: { beers, hasMore },
      }: PayloadAction<{ beers: Beer[]; hasMore: boolean }>
    ) {
      state.paging.hasMore = hasMore;
      state.beers = beers;
      state.hasQueryParamsChanged = false;
    },
    fetchBeerSuccess(state, { payload: { beer } }: PayloadAction<BeerDetails>) {
      state.beer = beer;
      state.hasQueryParamsChanged = false;
    },
    resetBeer(state) {
      state.beer = undefined;
    },
    // filters
    setNameFilter(state, { payload }: PayloadAction<string>) {
      state.filters.name = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.hasQueryParamsChanged = true;
    },
    setMinAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.minAlcohol = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.hasQueryParamsChanged = true;
    },
    setMaxAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.maxAlcohol = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.hasQueryParamsChanged = true;
    },
    // paging
    setNextPage(state, { payload }: PayloadAction<number>) {
      state.paging.pageNumber = payload;
      state.beers = [];
      state.hasQueryParamsChanged = true;
    },
    // reset
    resetBeers: () => initialState,
  },
});

const { fetchBeersSuccess, fetchBeerSuccess } = beersSlice.actions;

// exported actions
export const {
  setNameFilter,
  setMinAlcFilter,
  setMaxAlcFilter,
  setNextPage,
  resetBeers: clearFilters,
  resetBeer,
  resetBeers,
} = beersSlice.actions;

// selectors
export const selectBeers = (state: RootState): Beers => state.beers;
export const selectBeer = (state: RootState): BeerDetails => state.beers;
export const selectHasAnyChange = (state: RootState): boolean =>
  state.beers.hasQueryParamsChanged;
export const selectBeerFilteringUtils = (
  state: RootState
): BeerFilters & Paging => {
  return { ...state.beers.filters, ...state.beers.paging };
};

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
    const hasMore = newBeers.length < pageSize ? false : true;

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
