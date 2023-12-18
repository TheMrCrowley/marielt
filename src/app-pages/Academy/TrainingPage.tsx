'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';

import ArrowDown from '@/public/arrow-down.svg';
import ArrowIcon from '@/public/arrow-left.svg';
import TrainingForm from '@/src/components/TrainingForm/TrainingForm';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { Training } from '@/src/types/AcademyTypes';

type TrainingPageProps = {
  id: string;
  training: Training;
};

const TrainingPage = ({ training, id }: TrainingPageProps) => {
  const router = useRouter();
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
          <button
            className={clsx(
              'flex',
              'gap-4',
              'justify-center',
              'items-center',
              'p-2',
              'hover:cursor-pointer',
            )}
            onClick={() => router.back()}
          >
            <Image src={ArrowIcon} alt="arrow-back" />
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Назад
            </Typography>
          </button>
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
                strong: ({ children }) => {
                  return <strong className="font-medium">{children}</strong>;
                },
                p: ({ children }) => {
                  return (
                    <Typography fontWeight="light" fontSize={20}>
                      {children}
                    </Typography>
                  );
                },
                li: ({ children }) => (
                  <li className="list-disc text-secondary ml-6">
                    <Typography fontSize={20} fontWeight="light">
                      {children}
                    </Typography>
                  </li>
                ),
              }}
            >
              {description}
            </Markdown>
          </div>
        )}
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
          <Link
            href="#application"
            className="hover:cursor-pointer flex justify-center items-center py-2 px-8 bg-secondary gap-4 self-start"
          >
            <Typography fontWeight="medium" color="text-black">
              Оставить заявку
            </Typography>
            <Image src={ArrowDown} alt="leave-application-button" />
          </Link>
        </div>

        {content && (
          <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
            <Markdown
              components={{
                strong: ({ children }) => {
                  return <strong className="font-medium">{children}</strong>;
                },
                p: ({ children }) => (
                  <div className="w-full p-4 bg-[#343434]">
                    <Typography fontSize={20} fontWeight="light">
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
