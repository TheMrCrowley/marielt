import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import Typography from '@/components/Typography';
import TimeIcon from '@/public/clock.svg';
import EmailIcon from '@/public/mail.svg';
import MapPinIcon from '@/public/map-pin.svg';
import PhoneIcon from '@/public/phone.svg';

import styles from './ContentItem.module.css';

interface ContactItemProps extends PropsWithChildren {
  type: 'phone' | 'email' | 'address' | 'clock';
}

const ContactItem = ({ type, children }: ContactItemProps) => {
  const renderByType = () => {
    switch (type) {
      case 'phone':
        return (
          <>
            <Image src={PhoneIcon} alt={type} />
            <a href={`tel:${children}`}>
              <Typography fontWeight="medium">{children}</Typography>
            </a>
          </>
        );
      case 'email':
        return (
          <>
            <Image src={EmailIcon} alt={type} />
            <a href={`mailto:${children}`}>
              <Typography fontWeight="medium">{children}</Typography>
            </a>
          </>
        );
      case 'address':
        return (
          <>
            <Image src={MapPinIcon} alt={type} />
            <Typography fontWeight="medium">{children}</Typography>
          </>
        );
      case 'clock':
        return (
          <>
            <Image src={TimeIcon} alt={type} />
            <Typography fontWeight="medium">{children}</Typography>
          </>
        );
    }
  };

  return <li className={styles.contactItemWrapper}>{renderByType()}</li>;
};

export default ContactItem;
