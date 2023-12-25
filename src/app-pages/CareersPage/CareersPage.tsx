import clsx from 'clsx';

import SectionPreview from '@/src/components/SectionPreview/SectionPreview';
import { CareersPageItem } from '@/src/types/CareersTypes';

interface CareersPageProps {
  careersData: CareersPageItem[];
}

const CareersPage = ({ careersData }: CareersPageProps) => {
  return (
    <div className={clsx('flex', 'flex-col', 'py-12', 'sm:gap-12', 'gap-8')}>
      {careersData.map((item) => (
        <SectionPreview
          key={`section-preview-career-item-${item.to}`}
          sectionData={{ ...item, type: 'vacancy' }}
        />
      ))}
    </div>
  );
};

export default CareersPage;
