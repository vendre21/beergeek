import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'

import { Beer, BeerFilters, Beers, getBeer, getBeers } from 'api/beersApi'

import { AppThunk, RootState } from 'app/store'
import { toastWarning } from 'common/helpers/toastHelper'
import { Paging } from 'common/models'


interface BeerDetails {
  beer?: Beer;
}

type BeersState = Beers &
  BeerDetails & { filters: BeerFilters } & { paging: Paging } & {
    isQueryParamsChanged: boolean;
  };

const initialState: BeersState = {
  beers: [],
  filters: {},
  paging: { pageSize: 12, pageNumber: 1, hasMore: true },
  isQueryParamsChanged: true,
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
      state.isQueryParamsChanged = false;
    },
    fetchBeerSuccess(state, { payload: { beer } }: PayloadAction<BeerDetails>) {
      state.beer = beer;
      state.isQueryParamsChanged = false;
    },
    resetBeer(state) {
      state.beer = undefined;
    },
    // filters
    setNameFilter(state, { payload }: PayloadAction<string>) {
      state.filters.name = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.isQueryParamsChanged = true;
    },
    setMinAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.minAlcohol = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.isQueryParamsChanged = true;
    },
    setMaxAlcFilter(state, { payload }: PayloadAction<number>) {
      state.filters.maxAlcohol = payload;
      state.paging.pageNumber = 1;
      state.beers = [];
      state.isQueryParamsChanged = true;
    },
    // paging
    setNextPage(state, { payload }: PayloadAction<number>) {
      state.paging.pageNumber = payload;
      state.beers = [];
      state.isQueryParamsChanged = true;
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
  state.beers.isQueryParamsChanged;
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
    const { filters, paging } = getState().beers;

    const { beers } = await getBeers(filters, paging, cancelToken);

    const hasMore = beers.length < paging.pageSize ? false : true;

    dispatch(fetchBeersSuccess({ beers, hasMore }));

    !hasMore &&
      beers.length === 0 &&
      toastWarning("Sorry bro, no beer for you!");
  };

export const fetchBeer = (id: number): AppThunk =>
  async function fetchBeer(dispatch) {
    const beer = await getBeer(id);
    dispatch(fetchBeerSuccess({ beer }));
  };
