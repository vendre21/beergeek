import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'

import store, { history } from 'app/store'
import { Layout } from 'components/Layout'


const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
