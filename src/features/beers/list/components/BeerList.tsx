import React, { FC, useCallback } from 'react'

import { Beer } from 'api/beersApi'

import { history } from 'app/store'

import styles from '../Beers.module.scss'
import { BeerInfo } from './BeerInfo'


interface ListProps {
  beers: Beer[];
}

export const BeerList: FC<ListProps> = ({ beers }) => {
  const handleClick = useCallback((id: number) => {
    history.push(`beers/${id}`);
  }, []);

  return (
    <div className={styles.beer_list}>
      {beers.map(
        (beer, index): JSX.Element => (
          <BeerInfo key={index} beer={beer} onClick={handleClick} />
        )
      )}
    </div>
  );
};
