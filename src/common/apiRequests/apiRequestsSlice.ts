import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface ApiRequestError {
  action: string;
  hasError: boolean;
  error: string;
}

export interface ApiRequestLoading {
  action: string;
  loading: boolean;
}

export interface ApiRequestsState {
  errors: ApiRequestError[];
  loadingStates: ApiRequestLoading[];
}

const initialState: ApiRequestsState = {
  errors: [],
  loadingStates: [],
};

const apiRequestsSlice = createSlice({
  name: "apiRequestsSlice",
  initialState: initialState,
  reducers: {
    setLoading(
      state,
      { payload }: PayloadAction<{ actionName: string; actionState: boolean }>
    ) {
      const { actionName, actionState } = payload;
      const exists = state.loadingStates.find((x) => x.action === actionName);
      exists
        ? (exists.loading = actionState)
        : state.loadingStates.push({
            action: actionName,
            loading: actionState,
          });
    },
    addError(
      state,
      { payload }: PayloadAction<{ actionName: string; error: string }>
    ) {
      const { actionName, error } = payload;
      const exists = state.errors.find((x) => x.action === actionName);
      if (exists) {
        exists.error = error;
        exists.hasError = true;
      } else {
        state.errors.push({
          action: actionName,
          error: error,
          hasError: true,
        });
      }
    },
    removeError(state, { payload }: PayloadAction<{ actionName: string }>) {
      state.errors = state.errors.filter(
        (x) => x.action !== payload.actionName
      );
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
});

export const { setLoading, addError, removeError } = apiRequestsSlice.actions;
export default apiRequestsSlice.reducer;
