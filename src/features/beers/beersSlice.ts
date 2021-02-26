import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'

import { Beer, BeerFilters, Beers, getBeer, getBeers } from 'api/beersApi'

import { AppThunk, RootState } from 'app/store'
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
      state.isQueryParamsChanged = false;
      state.paging.hasMore = hasMore;
      state.beers = beers;
    },
    fetchBeerSuccess(state, { payload: { beer } }: PayloadAction<BeerDetails>) {
      state.isQueryParamsChanged = false;
      state.beer = beer;
    },
    // filters
    setNameFilter(state, { payload }: PayloadAction<string>) {
      state.isQueryParamsChanged = true;
      state.paging.pageNumber = 1;
      state.filters.name = payload;
    },
    setMinAlcFilter(state, { payload }: PayloadAction<number>) {
      state.isQueryParamsChanged = true;
      state.paging.pageNumber = 1;
      state.filters.minAlcohol = payload;
    },
    setMaxAlcFilter(state, { payload }: PayloadAction<number>) {
      state.isQueryParamsChanged = true;
      state.paging.pageNumber = 1;
      state.filters.maxAlcohol = payload;
    },
    // paging
    setNextPage(state, { payload }: PayloadAction<number>) {
      state.isQueryParamsChanged = true;
      state.paging.pageNumber = payload;
    },
    // reset
    resetBeer(state) {
      state.beer = undefined;
    },
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
  };

export const fetchBeer = (id: number): AppThunk =>
  async function fetchBeer(dispatch) {
    const beer = await getBeer(id);
    dispatch(fetchBeerSuccess({ beer }));
  };
