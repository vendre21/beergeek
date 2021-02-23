import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import requestsReducer from 'common/apiRequests/apiRequestsSlice'

import authReducer from 'features/auth/authSlice'
import beerReducer from 'features/beers/beersSlice'


const createRootReducer = (history: History<unknown>) =>
  combineReducers({
    router: connectRouter(history),
    // common
    apiRequests: requestsReducer,
    // auth
    auth: authReducer,
    // features
    beers: beerReducer,
  });

export default createRootReducer;
