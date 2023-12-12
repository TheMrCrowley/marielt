'use client';

import { redirect } from 'next/navigation';

import { AppRoutes } from '@/src/enums/AppRoutes';

const page = () => {
  redirect(AppRoutes.Academy);
};

export default page;
