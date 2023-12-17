import React from 'react';

import Typography from '@/src/components/common/Typography';

import DocLink, { DocLinkProps } from './DocLink';

export type DocLinkListProps = {
  title: string;
  items: DocLinkProps[];
};

const DocLinkList = ({ items, title }: DocLinkListProps) => {
  return (
    <div className="flex w-full max-w-[1620px] flex-col gap-8">
      <Typography fontSize={48} color="text-secondary">
        {title}
      </Typography>
      <div className="divide-y-2 divide-gray-500 border-y-2 border-gray-500">
        {items.map((item) => (
          <DocLink
            href={item.href}
            icon={item.icon}
            title={item.title}
            key={`docs-page-doc-list-item-doc-link-${item.title}-${item.href}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DocLinkList;
