import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authenticate } from 'api/authApi'

import { AppThunk, RootState } from 'app/store'
import { addError, resetApiRequests } from 'common/apiRequests/apiRequestsSlice'
import { getToken, setToken } from 'common/helpers/sessionHelpers'
import { toastHideAll } from 'common/helpers/toastHelper'

import { resetBeers } from 'features/beers/beersSlice'


export interface AuthState {
  userName?: string;
  token?: string;
}

const sessionToken = getToken();

const beersInitialState: AuthState = {
  token: sessionToken?.token,
  userName: sessionToken?.userName,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: beersInitialState,
  reducers: {
    authSuccess(
      state,
      {
        payload: { userName, token },
      }: PayloadAction<{ userName: string; token: string }>
    ) {
      state.userName = userName;
      state.token = token;
      setToken({ token, userName });
    },
    logoutSuccess(state) {
      state.userName = undefined;
      state.token = undefined;
      setToken({ token: undefined, userName: undefined });
    },
  },
});

const { authSuccess, logoutSuccess } = authSlice.actions;

// selectors
export const selectUserName = (state: RootState): string | undefined =>
  state.auth.userName;
export const selectToken = (state: RootState): string | undefined =>
  state.auth.token;

// reducer
export default authSlice.reducer;

// async actions
export const login = (email: string, password: string): AppThunk =>
  async function login(dispatch) {
    const isAuthenticated = await authenticate();
    isAuthenticated
      ? dispatch(authSuccess({ userName: email, token: "fake_valid_token" }))
      : dispatch(
          addError({
            actionName: login.name,
            error: "Invalid email or password.",
          })
        );
  };

export const logout = (): AppThunk =>
  async function logout(dispatch) {
    dispatch(logoutSuccess());
    // cleanup
    toastHideAll();
    dispatch(resetBeers());
    dispatch(resetApiRequests());
  };
