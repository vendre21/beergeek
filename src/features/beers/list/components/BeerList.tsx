import axios from 'axios'
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { history } from 'app/store'
import { useHasError } from 'common/hooks/useHasError'
import { useLoadingState } from 'common/hooks/useLoadingFor'
import { Loading } from 'components/Loading'

import {
    fetchBeers, selectBeerFilters, selectBeers, selectBeersPaging, selectHasAnyChange
} from 'features/beers/beersSlice'

import styles from '../Beers.module.scss'
import { BeerInfo } from './BeerInfo'


export const BeerList: FC = () => {
  const dispatch = useDispatch();

  const { hasError } = useHasError(fetchBeers.name);
  const isLoading = useLoadingState(fetchBeers.name);

  const hasAnyChanged = useSelector(selectHasAnyChange);
  const filters = useSelector(selectBeerFilters);
  const paging = useSelector(selectBeersPaging);
  const { beers } = useSelector(selectBeers);

  const { name, minAlcohol, maxAlcohol } = filters;
  const { pageNumber } = paging;

  useEffect(() => {
    if (!hasAnyChanged || hasError) return;

    const { cancel, token } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => dispatch(fetchBeers(token)), 600);
    return () => {
      cancel("Cancel prev. request");
      clearTimeout(timeOutId);
    };
  }, [
    dispatch,
    hasAnyChanged,
    hasError,
    name,
    minAlcohol,
    maxAlcohol,
    pageNumber,
  ]);

  const handleClick = useCallback((id: number) => {
    history.push(`beers/${id}`);
  }, []);

  if (isLoading) return <Loading />;

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
