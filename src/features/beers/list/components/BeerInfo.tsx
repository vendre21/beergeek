import React, { FC } from 'react'
import LazyLoad from 'react-lazyload'

import { Beer } from 'api/beersApi'

import styles from '../Beers.module.scss'


interface BeerCardProps {
  onClick: (id: number) => void;
  beer: Beer;
}

export const BeerInfo: FC<BeerCardProps> = ({ beer, onClick }) => {
  return (
    <div onClick={() => onClick(beer.id)} className={styles.card}>
      <LazyLoad height={80}>
        <img src={beer.image_url} alt={beer.name} />
      </LazyLoad>
      <div className={styles.beer_info}>
        <p className={styles.beer_title}>{beer.name}</p>
        <p
          className={
            styles.beer_abv + (beer.abv > 5 ? ` ${styles.high_abv}` : "")
          }
        >
          {beer.abv}%
        </p>
      </div>
    </div>
  );
};
