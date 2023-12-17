import clsx from 'clsx';
import React from 'react';

import SectionPreview, {
  SectionPreviewProps,
} from '@/src/components/SectionPreview/SectionPreview';

interface AboutPageProps {
  aboutData: Array<Omit<SectionPreviewProps['sectionData'], 'type'>>;
}

const AboutPage = ({ aboutData }: AboutPageProps) => {
  return (
    <div className={clsx('flex', 'flex-col', 'py-12', 'sm:gap-12', 'gap-8')}>
      {aboutData.map((item) => (
        <SectionPreview
          key={`section-preview-about-item-${item.to}`}
          sectionData={{ ...item, type: 'vacancy' }}
        />
      ))}
    </div>
  );
};

export default AboutPage;
