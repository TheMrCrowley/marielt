import clsx from 'clsx';
import React from 'react';
import Markdown from 'react-markdown';

import TeacherSection from '@/src/components/TeacherSection';
import BackButton from '@/src/components/common/BackButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { TeamItem } from '@/src/types/TeamTypes';

type TeamPageProps = {
  description: string;
  members: TeamItem[];
};

const TeamPage = ({ description, members }: TeamPageProps) => {
  const management = members.filter((member) => member.management);
  const rest = members.filter((member) => !member.management);

  return (
    <section className="flex flex-col gap-8 w-full justify-center items-center">
      <section
        className={clsx(
          'relative',
          'w-full',
          'bg-center',
          'bg-cover',
          'bg-no-repeat',
          'flex',
          'sm:flex-row',
          'flex-col',
          'justify-center',
          'items-center',
          'min-h-[500px]',
          'gap-8',
          'bg-[url(/team-bg.png)]',
        )}
      >
        <BackButton
          to={AppRoutes.About}
          className="absolute z-10 sm:left-4 sm:top-4 top-0 left-3"
        />
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
          <Title fontSize={48} className="max-w-4xl">
            Наши лидеры совместно с командой воплощают ваши мечты о недвижимости в реальность
          </Title>
        </div>
      </section>
      <div
        className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-8', 'items-center', 'px-5')}
      >
        <Markdown
          components={{
            p: ({ children }) => <Typography fontWeight="light">{children}</Typography>,
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
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-8', 'px-5', 'mb-8')}>
        <Title fontSize={48}>Руководство</Title>
        {management.map((member) => (
          <TeacherSection
            key={`team-page-management-section-item-${member.id}`}
            item={{
              id: member.id,
              name: member.name,
              position: member.position,
              description: member.description,
              photo: member.photo,
            }}
            withoutLink
          />
        ))}
      </div>
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-8', 'px-5', 'mb-8')}>
        <Title fontSize={48}>Звенья успеха</Title>
        {rest.map((member) => (
          <TeacherSection
            key={`team-page-rest-section-item-${member.id}`}
            item={{
              id: member.id,
              name: member.name,
              position: member.position,
              description: member.description,
              photo: member.photo,
            }}
            withoutLink
          />
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
