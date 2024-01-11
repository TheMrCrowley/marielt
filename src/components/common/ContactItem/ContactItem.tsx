import clsx from 'clsx';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import TimeIcon from '@/public/clock.svg';
import EmailIcon from '@/public/mail.svg';
import MapPinIcon from '@/public/map-pin.svg';
import PhoneIcon from '@/public/phone.svg';
import Typography from '@/src/components/common/Typography';

interface ContactItemProps extends PropsWithChildren {
  type: 'phone' | 'email' | 'address' | 'clock';
  iconClassName?: string;
}

// TODO extend this with components for cards
const ContactItem = ({ type, children, iconClassName }: ContactItemProps) => {
  const renderByType = () => {
    switch (type) {
      case 'phone':
        return (
          <>
            <Image src={PhoneIcon} alt={type} className={clsx('self-end', iconClassName)} />
            <a href={`tel:${children}`} className="no-underline">
              <Typography fontWeight="medium">{children}</Typography>
            </a>
          </>
        );
      case 'email':
        return (
          <>
            <Image src={EmailIcon} alt={type} className={clsx('self-end', iconClassName)} />
            <a href={`mailto:${children}`} className="no-underline">
              <Typography fontWeight="medium">{children}</Typography>
            </a>
          </>
        );
      case 'address':
        return (
          <>
            <Image src={MapPinIcon} alt={type} className={clsx('self-end', iconClassName)} />
            <Typography fontWeight="medium">{children}</Typography>
          </>
        );
      case 'clock':
        return (
          <>
            <Image src={TimeIcon} alt={type} className={clsx('self-end', iconClassName)} />
            <Typography fontWeight="medium">{children}</Typography>
          </>
        );
    }
  };

  return <li className={clsx('flex', 'w-full', 'gap-3')}>{renderByType()}</li>;
};

export default ContactItem;
