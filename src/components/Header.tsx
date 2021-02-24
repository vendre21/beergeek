import React, { FC } from 'react'

import { Navigation } from 'components/Navigation'

import { ReactComponent as Logo } from 'assets/beer.svg'

import styles from './Layout.module.scss'


export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <a href="/beers" title="Beers">
          <Logo className={styles.logo} />
        </a>
        <Navigation />
      </div>
    </header>
  );
};
