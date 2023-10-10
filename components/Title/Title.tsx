import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './Title.module.css';

interface TitleProps extends PropsWithChildren {
  variant?: 'h1' | 'h2';
  className?: string;
}

const Title = ({ variant = 'h1', children, className }: TitleProps) => {
  const renderTitle = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={clsx(styles.title, styles.h1, className)}>{children}</h1>;
      case 'h2':
        return <h2 className={clsx(styles.title, className)}>{children}</h2>;
    }
  };

  return renderTitle();
};

export default Title;
