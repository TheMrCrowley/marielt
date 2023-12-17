import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowAngleIcon from '@/public/arrow-angle.svg';
import PrivateDocIcon from '@/public/file-private.svg';
import PdfIcon from '@/public/pdf-icon.svg';
import Typography from '@/src/components/common/Typography';

export type DocLinkProps = {
  title: string;
  href: string;
  icon: 'private' | 'pdf';
};

const DocLink = ({ href, icon, title }: DocLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-start items-center p-4 gap-4"
    >
      <Image
        src={icon === 'private' ? PrivateDocIcon : PdfIcon}
        alt="private-icon"
        width={32}
        height={32}
      />
      <Typography fontSize={24} fontWeight="light">
        {title}
      </Typography>
      <Image className="ml-auto" src={ArrowAngleIcon} alt="private-icon" width={32} height={32} />
    </Link>
  );
};

export default DocLink;
