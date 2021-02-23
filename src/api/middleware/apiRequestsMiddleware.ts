import { Middleware } from '@reduxjs/toolkit'

import { toastError } from 'common/helpers/toastHelper'
import { addError, setLoading } from '../../common/apiRequests/apiRequestsSlice'


export const apiRequestInterceptorMiddleware: Middleware = ({
  dispatch,
  getState,
}) => (next) => (action) => {
  if (typeof action !== "function") return next(action);

  const handleRequest = async () => {
    try {
      dispatch(setLoading({ actionName: action.name, actionState: true }));
      await action(dispatch, getState);
      dispatch(setLoading({ actionName: action.name, actionState: false }));
    } catch (err) {
      dispatch(setLoading({ actionName: action.name, actionState: false }));
      dispatch(addError({ actionName: action.name, error: err.message }));

      // console.log("error: ", err);
      toastError(err.message);

      throw err;
    }
  };

  return handleRequest();
};
