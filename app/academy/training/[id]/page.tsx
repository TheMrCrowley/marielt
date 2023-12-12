import { Metadata } from 'next';
import React from 'react';

import TrainingPage from '@/src/app-pages/Academy/TrainingPage';
import { getAllTrainings, getTrainingById } from '@/src/services/academyServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { title, description } = await getTrainingById(id);

  return {
    title,
    description,
  };
}

export async function generateStaticParams() {
  const data = await getAllTrainings();

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export const dynamicParams = true;

const Training = async ({ params: { id } }: Props) => {
  const training = await getTrainingById(id);

  return <TrainingPage training={training} id={id} />;
};

export default Training;
