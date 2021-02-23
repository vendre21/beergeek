import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import {
    clearFilters, setMaxAlcFilter, setMinAlcFilter, setNameFilter, setNextPage
} from 'features/beers/beersSlice'

import styles from '../Beers.module.scss'


interface SearchProps {
  name?: string;
  minAlcohol?: number;
  maxAlcohol?: number;
  hasMore: boolean;
  pageNumber: number;
}

export const BeerSearch: FC<SearchProps> = ({
  name,
  minAlcohol,
  maxAlcohol,
  hasMore,
  pageNumber,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.search_form}>
      {/* <div className={styles.search_paging}>Page: {pageNumber}</div> */}

      <button
        disabled={pageNumber === 1}
        className={styles.nav_btn}
        onClick={() => dispatch(setNextPage(pageNumber - 1))}
      >
        Prev
      </button>

      <input
        name="name"
        placeholder="Find me ..."
        value={name ?? ""}
        onChange={(e) => dispatch(setNameFilter(e.target.value))}
      />

      <input
        name="minAlcohol"
        type="number"
        placeholder="min"
        min="0"
        max="100"
        value={minAlcohol ?? ""}
        onChange={(e) => dispatch(setMinAlcFilter(+e.target.value))}
      />

      <input
        name="maxAlcohol"
        type="number"
        placeholder="max"
        min="0"
        max="100"
        value={maxAlcohol ?? ""}
        onChange={(e) => dispatch(setMaxAlcFilter(+e.target.value))}
      />

      <button
        className={styles.clear_btn}
        title="Clear filters"
        onClick={() => dispatch(clearFilters())}
      >
        〤
      </button>

      <button
        disabled={!hasMore}
        className={styles.nav_btn}
        onClick={() => dispatch(setNextPage(pageNumber + 1))}
      >
        Next
      </button>
    </div>
  );
};
