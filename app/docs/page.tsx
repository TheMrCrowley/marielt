import { Metadata } from 'next';
import React from 'react';

import DocsPage from '@/src/app-pages/DocsPage';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

const title = 'Документы';
const description = 'Все прозрачно - нам нечего скрывать';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrlMap.docsPage() },
  openGraph: getOpenGraphField(title, description),
};

const Docs = () => {
  return <DocsPage />;
};

export default Docs;
