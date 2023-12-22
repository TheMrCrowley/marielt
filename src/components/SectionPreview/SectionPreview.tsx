import clsx from 'clsx';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import LinkButton from '@/src/components/LinkButton';
import { LinkButtonProps } from '@/src/components/LinkButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

export interface SectionPreviewProps {
  sectionData: {
    title: string;
    description: string;
    image: {
      src: string;
      width: number;
      height: number;
      placeholder: string;
    };
    variant: 'primary' | 'secondary';
    type: LinkButtonProps['type'];
    to: LinkButtonProps['to'];
  };
}

const SectionPreview = ({ sectionData, children }: PropsWithChildren<SectionPreviewProps>) => {
  const { description, image, title, to, variant, type } = sectionData;

  const renderDescription = () => (
    <div
      className={clsx(
        'flex-auto',
        'flex',
        'flex-col',
        'lg:gap-12',
        'sm:gap-8',
        'gap-4',
        'md:w-6/12',
        'w-full',
        'sm:p-[4%]',
        'px-5',
        'py-8',
      )}
    >
      <Title fontSize={40} className={clsx('flex', 'items-end', 'lg:gap-6', 'gap-4', 'uppercase')}>
        {title}
      </Title>
      <Typography fontWeight="light">{description}</Typography>
      <LinkButton to={to} type={type} linkClassName={clsx('mt-auto')} />
    </div>
  );

  const renderPreview = () => {
    switch (variant) {
      case 'primary':
        return (
          <>
            {renderDescription()}
            <Image
              className="object-cover md:w-1/2 w-full"
              src={image.src}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.placeholder}
              alt=""
              loading="lazy"
              unoptimized
            />
          </>
        );
      case 'secondary':
        return (
          <>
            <Image
              className="object-cover md:w-1/2 w-full"
              src={image.src}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.placeholder}
              alt=""
              loading="lazy"
              unoptimized
            />
            {renderDescription()}
          </>
        );
    }
  };

  return (
    <section className={clsx('flex', 'flex-col', 'gap-8')}>
      <div className={clsx('container')}>
        <div
          className={clsx(
            'w-full',
            'flex',
            'md:flex-row',
            variant === 'primary' ? 'flex-col-reverse' : 'flex-col',
            'justify-between',
            // TODO add colors to TAILWIND
            'bg-primary-medium',
            'mb-4',
          )}
        >
          {renderPreview()}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionPreview;
