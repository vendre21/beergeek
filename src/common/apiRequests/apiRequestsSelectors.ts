import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'app/store'

import { ApiRequestError, ApiRequestsStates, ApiRequestState } from './apiRequestsSlice'


const selectApiRequests = (state: RootState): ApiRequestsStates =>
  state.apiRequests;

export const selectErrors = createSelector<
  RootState,
  ApiRequestsStates,
  ApiRequestError[]
>(selectApiRequests, ({ errors }) => errors);

export const selectApiRequestsState = createSelector<
  RootState,
  ApiRequestsStates,
  ApiRequestState[]
>(selectApiRequests, ({ requestsStates: loadingStates }) => loadingStates);

const getByActionName = (_: any, name: string | string[]) => name;

export const selectErrorByActionName = createSelector(
  selectErrors,
  getByActionName,
  (errors, name) => {
    return errors.find((x) => x.action === name);
  }
);

export const selectApiRequestStateByActionName = createSelector(
  selectApiRequestsState,
  getByActionName,
  (loadingStates, name) => {
    const actions = Array.isArray(name) ? name : [name];
    return loadingStates?.filter((x) => actions.includes(x.action)) ?? [];
  }
);
