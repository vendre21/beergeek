import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { ApiRequestError, ApiRequestLoading, ApiRequestsState } from './apiRequestsSlice'


const selectApiRequests = (state: RootState): ApiRequestsState =>
  state.apiRequests;

export const selectErrors = createSelector<
  RootState,
  ApiRequestsState,
  ApiRequestError[]
>(selectApiRequests, ({ errors }) => errors);

export const selectLoadings = createSelector<
  RootState,
  ApiRequestsState,
  ApiRequestLoading[]
>(selectApiRequests, ({ loadingStates }) => loadingStates);

const getByActionName = (_: any, name: string) => name;

export const selectErrorByActionName = createSelector(
  selectErrors,
  getByActionName,
  (errors, name) => {
    return errors.find((x) => x.action === name);
  }
);

export const selectLoadingByActionName = createSelector(
  selectLoadings,
  getByActionName,
  (loadingStates, name) => {
    return loadingStates.find((x) => x.action === name);
  }
);
