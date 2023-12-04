import clsx from 'clsx';

import SectionPreview, {
  SectionPreviewProps,
} from '@/src/components/SectionPreview/SectionPreview';

interface CareersPageProps {
  careersData: Array<Omit<SectionPreviewProps['sectionData'], 'type'>>;
}

const CareersPage = ({ careersData }: CareersPageProps) => {
  return (
    <div className={clsx('flex', 'flex-col', 'py-12', 'gap-12')}>
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
