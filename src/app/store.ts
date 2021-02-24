import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'

import { apiRequestInterceptorMiddleware } from 'api/middleware/apiRequestsMiddleware'

import createRootReducer from 'app/rootReducer'


export const history = createBrowserHistory();

const isDevelopment = process.env.NODE_ENV === `development`;
const rootReducer = createRootReducer(history);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    // thunk included already
    const middlewares = getDefaultMiddleware()
      .prepend(apiRequestInterceptorMiddleware)
      .concat(routerMiddleware(history));

    return isDevelopment ? middlewares.concat(logger) : middlewares;
  },
  devTools: isDevelopment,
});

if (process.env.NODE_ENV === "development" && (module as any).hot) {
  (module as any).hot.accept("./rootReducer", () =>
    store.replaceReducer(rootReducer)
  );
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
