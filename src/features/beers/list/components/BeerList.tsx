import axios from 'axios'
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { history } from 'app/store'
import { useHasError } from 'common/hooks/useHasError'
import { useRequestState } from 'common/hooks/useRequestState'
import { Loading } from 'components/Loading'

import {
    fetchBeers, selectBeerFilters, selectBeers, selectBeersPaging, selectHasAnyChange
} from 'features/beers/beersSlice'

import { BeerInfo } from './BeerInfo'

import styles from '../Beers.module.scss'


export const BeerList: FC = () => {
  const dispatch = useDispatch();

  const { hasError } = useHasError(fetchBeers.name);
  const isLoading = useRequestState(fetchBeers.name);

  const hasAnyChange = useSelector(selectHasAnyChange);
  const filters = useSelector(selectBeerFilters);
  const paging = useSelector(selectBeersPaging);
  const { beers } = useSelector(selectBeers);

  const { name, minAlcohol, maxAlcohol } = filters;
  const { pageNumber } = paging;

  useEffect(() => {
    if (!hasAnyChange || hasError) return;

    const { cancel, token } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => dispatch(fetchBeers(token)), 600);
    return () => {
      cancel();
      clearTimeout(timeOutId);
    };
  }, [
    dispatch,
    hasAnyChange,
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
