import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Login } from 'features/auth/login/Login'
import { useAuthentication } from 'features/auth/useAuthentication'
import { BeerDetails } from 'features/beers/detail/BeerDetails'
import { Beers } from 'features/beers/list/Beers'

import styles from './Layout.module.scss'
import { NotFound } from './NotFound'


export const Router: FC = () => {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return (
      <div className={styles.page_container}>
        <Login />
      </div>
    );
  }

  return (
    <div className={styles.page_container}>
      <Switch>
        <Route exact path={["/", "/beers", "/beergeek"]}>
          <Beers />
        </Route>
        <Route exact path={["/beers/:id", "/beergeek/beers/:id"]}>
          <BeerDetails />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
