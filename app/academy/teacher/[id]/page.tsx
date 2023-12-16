import { Metadata } from 'next';
import React from 'react';

import TeacherPage from '@/src/app-pages/Academy/TeacherPage';
import { getAllTeachers, getTeacherById } from '@/src/services/academyServices';
import { canonicalUrlMap } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { name, description1 } = await getTeacherById(id);
  const canonical = canonicalUrlMap.teacherPage(id);

  return {
    title: name,
    description: description1,
    alternates: {
      canonical,
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getAllTeachers();

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

const Teacher = async ({ params: { id } }: Props) => {
  const teacher = await getTeacherById(id);

  return <TeacherPage teacher={teacher} id={id} />;
};

export default Teacher;
