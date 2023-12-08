import React from 'react';

import RealtorImage from '@/public/realtor-bg.jpg';
import StaticPage from '@/src/app-pages/CareersPage/StaticPage';

const page = () => {
  return (
    <StaticPage
      description="Риэлтор - надежный гид в мире недвижимости. Он приносит множество преимуществ как при продаже, так и при покупке квартиры."
      title="Кто такой - Риэлтор?"
      imageUrl={RealtorImage}
    />
  );
};

export default page;
