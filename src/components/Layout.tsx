import React from 'react'
import { ToastContainer } from 'react-toast'

import { Header } from 'components/Header'
import { Router } from 'components/Router'

import styles from './Layout.module.scss'


export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <Router />

      <ToastContainer delay={3000} />
    </div>
  );
};
