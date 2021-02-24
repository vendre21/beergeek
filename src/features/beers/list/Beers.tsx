import React from 'react'

import { BeerList } from './components/BeerList'
import { BeerSearch } from './components/BeerSearch'

import styles from './Beers.module.scss'


export const Beers = () => {
  return (
    <div className={styles.beers}>
      <BeerSearch />
      <BeerList />
    </div>
  );
};
