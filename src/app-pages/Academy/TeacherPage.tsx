import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown';

import ArrowIcon from '@/public/arrow-right.svg';
import BackButton from '@/src/components/common/BackButton';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { Teacher } from '@/src/types/AcademyTypes';

type TeacherPageProps = {
  id: string;
  teacher: Teacher;
};

const TeacherPage = ({ teacher, id }: TeacherPageProps) => {
  const { name, position, description1, description2, photo, trainings } = teacher;

  return (
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
          'max-w-[1620px]',
          'w-full',
          'flex',
          'flex-col',
          'justify-start',
          'items-start',
        )}
      >
        <BackButton to={AppRoutes.Academy} />
      </div>
      <div className={clsx('max-w-[1620px]', 'w-full', 'flex', 'justify-start', 'items-start')}>
        <div className="sm:p-8 p-4 bg-primary-medium w-full flex md:flex-row flex-col gap-4 justify-between">
          {photo && (
            <Image
              src={photo.url}
              placeholder="blur"
              blurDataURL={photo.placeholder}
              width={photo.width}
              height={photo.height}
              className="max-w-xs w-full flex-auto object-cover mx-auto"
              alt="teacher-photo"
            />
          )}
          <div className="flex flex-col gap-4 flex-auto ">
            <div className="bg-secondary p-4">
              <Typography fontSize={36} fontWeight="medium" color="text-primary-medium">
                {name}
              </Typography>
              <Typography fontSize={20} fontWeight="light" color="text-primary-medium">
                {position}
              </Typography>
            </div>
            {description1 && (
              <Markdown
                components={{
                  li: ({ children }) => (
                    <li className="list-disc text-secondary ml-6">
                      <Typography fontSize={20} fontWeight="light">
                        {children}
                      </Typography>
                    </li>
                  ),
                }}
              >
                {description1}
              </Markdown>
            )}
            {description2 && (
              <Markdown
                components={{
                  p: ({ children }) => (
                    <Typography fontSize={20} fontWeight="light">
                      {children}
                    </Typography>
                  ),
                  li: ({ children }) => (
                    <li className="list-disc text-secondary ml-6">
                      <Typography fontSize={20} fontWeight="light">
                        {children}
                      </Typography>
                    </li>
                  ),
                }}
                className="my-auto"
              >
                {description2}
              </Markdown>
            )}
          </div>
        </div>
      </div>
      {!!trainings.length && (
        <div
          className={clsx(
            'max-w-[1620px]',
            'w-full',
            'flex',
            'justify-start',
            'items-start',
            'flex-col',
            'gap-4',
          )}
        >
          <Typography fontSize={48} color="text-secondary">
            Тренинги от преподавателя
          </Typography>
          <div className="flex flex-col divide-y-2 divide-[#B1B1B1] w-full">
            {trainings.map((training, i) => {
              if (!training.description) {
                return (
                  <div
                    key={`academy-teacher-${id}-training-${training.id}`}
                    className="w-full flex justify-start items-center gap-4"
                  >
                    <Typography fontSize={24} color="text-[#B1B1B1]" fontWeight="light">
                      {(i + 1).toString().padStart(2, '0')}
                    </Typography>
                    <Typography fontSize={24} color="text-[#B1B1B1]" className="p-4">
                      {training.title}
                    </Typography>
                  </div>
                );
              }

              return (
                <Link
                  href={`/academy/training/${training.id}`}
                  key={`academy-teacher-${id}-training-${training.id}`}
                  className="w-full flex justify-start items-center gap-4"
                  prefetch
                >
                  <Typography fontSize={24} color="text-[#B1B1B1]" fontWeight="light">
                    {(i + 1).toString().padStart(2, '0')}
                  </Typography>
                  <Typography fontSize={24} color="text-[#B1B1B1]" className="p-4">
                    {training.title}
                  </Typography>
                  <Image src={ArrowIcon} alt="active-course" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default TeacherPage;
