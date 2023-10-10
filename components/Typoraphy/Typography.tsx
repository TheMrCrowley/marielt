import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './Typography.module.css';

interface TypographyProps extends PropsWithChildren {
  className?: string;
}

const Typography = ({ children, className }: TypographyProps) => {
  return <div className={clsx(styles.typography, className)}>{children}</div>;
};

export default Typography;
