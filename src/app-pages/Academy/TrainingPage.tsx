'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';

import TrainingForm from '@/src/components/TriningForm/TriningForm';
import BackButton from '@/src/components/common/BackButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { Training } from '@/src/types/AcademyTypes';

type TrainingPageProps = {
  id: string;
  training: Training;
};

const TrainingPage = ({ training, id }: TrainingPageProps) => {
  const { image, description, content, title } = training;

  if (!description && !content) {
    return redirect('/academy');
  }

  return (
    <>
      <section
        className={clsx(
          'w-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-6',
          'gap-8',
        )}
      >
        <div
          className={clsx(
            'max-w-7xl',
            'w-full',
            'flex',
            'flex-col',
            'justify-start',
            'items-start',
          )}
        >
          <BackButton to={AppRoutes.Academy} />
        </div>
        {image && (
          <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
            <Image
              src={image.url}
              placeholder="blur"
              blurDataURL={image.placeholder}
              width={image.width}
              height={image.height}
              className="w-full object-cover"
              alt="training-image"
            />
          </div>
        )}
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
          <Title fontSize={32} fontWeight="medium" className="!text-secondary">
            {title}
          </Title>
        </div>
        {description && (
          <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
            <Markdown
              components={{
                p: ({ children }) => {
                  return (
                    <Typography fontWeight="light" fontSize={20}>
                      {children}
                    </Typography>
                  );
                },
              }}
            >
              {description}
            </Markdown>
          </div>
        )}
        {content && (
          <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
            <Markdown
              components={{
                p: ({ children }) => (
                  <div className="w-full p-4 bg-[#343434]">
                    <Typography fontSize={24} fontWeight="medium">
                      {children}
                    </Typography>
                  </div>
                ),
                li: ({ children }) => {
                  return (
                    <li className="list-decimal text-secondary font-medium p-4 ml-6">
                      <Typography fontWeight="light">{children}</Typography>
                    </li>
                  );
                },
              }}
            >
              {content}
            </Markdown>
          </div>
        )}
      </section>
      <TrainingForm id={id} />
    </>
  );
};

export default TrainingPage;
