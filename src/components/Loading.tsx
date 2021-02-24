import React from 'react'
import { ThreeDots } from 'react-loading-icons'

import styles from './Layout.module.scss'


export const Loading = () => {
  return (
    <div className={styles.loading_indicator}>
      <ThreeDots width="140" height="64" fill="#f0a500" />
    </div>
  );
};
