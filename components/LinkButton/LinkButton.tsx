import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';
import { HomePageItem } from '@/types/HomePage';

import styles from './LinkButton.module.css';

interface LinkButtonProps {
  type: HomePageItem['type'];
  to: HomePageItem['to'];
  buttonClassName?: string;
  linkClassName?: string;
}

const LinkButton = ({ type, to, buttonClassName, linkClassName }: LinkButtonProps) => {
  return (
    <Link href={`${to}`} className={linkClassName}>
      <button className={clsx(styles.descriptionButton, buttonClassName)}>
        {type === 'product' ? 'Перейти в каталог' : 'Перейти в раздел'}{' '}
        <Image src={ArrowRight} alt="arrow-right" />
      </button>
    </Link>
  );
};

export default LinkButton;
