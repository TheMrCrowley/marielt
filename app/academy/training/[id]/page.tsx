import { Metadata } from 'next';
import React from 'react';

import TrainingPage from '@/src/app-pages/Academy/TrainingPage';
import { getAllTrainings, getTrainingById } from '@/src/services/academyServices';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { title, description, image } = await getTrainingById(id);
  const canonical = canonicalUrlMap.trainingPage(id);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description, image?.url),
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
