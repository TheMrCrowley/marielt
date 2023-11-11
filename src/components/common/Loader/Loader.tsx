import clsx from 'clsx';
import React from 'react';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={clsx('w-full', 'flex', 'justify-center', 'items-center', 'py-24')}>
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
