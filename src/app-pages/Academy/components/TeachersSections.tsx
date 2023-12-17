import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Markdown from 'react-markdown';

import AgentPlaceholder from '@/public/agentPlaceholder.png';
import LinkButton from '@/src/components/LinkButton';
import Typography from '@/src/components/common/Typography';
import { getAllTeachers } from '@/src/services/academyServices';

const TeachersSections = async () => {
  const teachers = await getAllTeachers();

  if (!teachers.length) {
    return null;
  }

  return (
    <section className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-8')} id="teachers">
      <Typography fontSize={48}>Преподаватели</Typography>
      <Typography fontSize={24} fontWeight="light" className="max-w-4xl">
        У каждого из наших преподавателей есть свои уникальные тренинги. Благодаря этому у вас есть
        возможность освоить профессию за 3-4 месяца, а не за годы учебы.{' '}
      </Typography>
      <Typography fontSize={24} fontWeight="light">
        Опыт не нужен - его приобретают с нами!
      </Typography>
      {teachers.length && (
        <div className="w-full flex flex-col gap-10 mt-8 min-h-[300px]">
          {teachers.map(({ photo, id, name, position, description1 }) => (
            <div
              className="w-full bg-[#343434] flex gap-8 md:flex-row flex-col p-4"
              key={`academy-page-teacher-list-teacher-item-${id}`}
            >
              <div className="max-w-[220px] w-full sm:-translate-x-8 sm:-translate-y-8 sm:m-0 mx-auto relative flex-auto">
                <Image
                  src={photo?.url || AgentPlaceholder.src}
                  alt="teacher-photo"
                  width={photo?.width || AgentPlaceholder.width}
                  height={photo?.height || AgentPlaceholder.height}
                  placeholder="blur"
                  blurDataURL={photo?.placeholder || AgentPlaceholder.blurDataURL}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Typography fontSize={32} fontWeight="medium">
                  {name}
                </Typography>
                {position && (
                  <Typography fontWeight="light" color="text-[#A3A3A3]">
                    {position}
                  </Typography>
                )}
                {description1 && (
                  <Markdown
                    components={{
                      li: ({ children }) => (
                        <li className="list-disc text-secondary ml-6">
                          <Typography fontSize={16} fontWeight="light">
                            {children}
                          </Typography>
                        </li>
                      ),
                    }}
                  >
                    {description1}
                  </Markdown>
                )}
              </div>
              <LinkButton
                to={`/academy/teacher/${id}`}
                type="vacancy"
                linkClassName="sm:mt-auto sm:ml-auto"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeachersSections;
