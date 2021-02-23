import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLoadingState } from 'common/hooks/useLoadingFor'
import { Loading } from 'components/Loading'
import { BeerList } from './components/BeerList'
import { BeerSearch } from './components/BeerSearch'

import { fetchBeers, selectBeerFilters, selectBeers, selectBeersPaging } from '../beersSlice'
import styles from './Beers.module.scss'


export const Beers = () => {
  const dispatch = useDispatch();

  const isLoading = useLoadingState(fetchBeers.name);
  const filters = useSelector(selectBeerFilters);
  const paging = useSelector(selectBeersPaging);
  const { beers } = useSelector(selectBeers);

  const { name, minAlcohol, maxAlcohol } = filters;
  const { pageNumber } = paging;

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => dispatch(fetchBeers(token)), 600);
    return () => {
      cancel("Cancel prev. request");
      clearTimeout(timeOutId);
    };
  }, [dispatch, name, minAlcohol, maxAlcohol, pageNumber]);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.beers}>
      <BeerSearch {...filters} {...paging} />
      <BeerList beers={beers} />
    </div>
  );
};
