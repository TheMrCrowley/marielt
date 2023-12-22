import clsx from 'clsx';
import React from 'react';

import TeacherSection from '@/src/components/TeacherSection';
import Typography from '@/src/components/common/Typography';
import { getAllTeachers } from '@/src/services';

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
          {teachers.map((teacher) => (
            <TeacherSection
              item={{
                description: teacher.description1,
                id: teacher.id,
                name: teacher.name,
                position: teacher.position,
                photo: teacher.photo,
              }}
              key={`academy-page-teachers-section-teacher-item-${teacher.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TeachersSections;
