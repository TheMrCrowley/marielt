import Image from 'next/image';
import React from 'react';
import Markdown from 'react-markdown';

import AgentPlaceholder from '@/public/agentPlaceholder.png';
import LinkButton from '@/src/components/LinkButton';
import Typography from '@/src/components/common/Typography';

type TeacherSectionProps = {
  item: {
    id: string;
    name: string;
    position: string;
    description?: string;
    photo?: { width: number; height: number; url: string; placeholder: string };
  };
  withoutLink?: boolean;
};

const TeacherSection = ({ item, withoutLink = false }: TeacherSectionProps) => {
  const { id, name, position, description, photo } = item;
  return (
    <div className="w-full bg-[#343434] flex gap-8 md:flex-row flex-col p-4">
      <div className="max-w-[220px] w-full md:mx-0 mx-auto relative flex-auto">
        <Image
          src={photo?.url || AgentPlaceholder.src}
          alt="teacher-photo"
          width={photo?.width || AgentPlaceholder.width}
          height={photo?.height || AgentPlaceholder.height}
          placeholder="blur"
          blurDataURL={photo?.placeholder || AgentPlaceholder.blurDataURL}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Typography fontSize={32} fontWeight="medium">
          {name}
        </Typography>
        {position && (
          <Typography fontWeight="light" color="text-[#A3A3A3]">
            {position}
          </Typography>
        )}
        {description && (
          <Markdown
            components={{
              li: ({ children }) => (
                <li className="list-disc text-secondary ml-6">
                  <Typography fontSize={16} fontWeight="light">
                    {children}
                  </Typography>
                </li>
              ),
              p: ({ children }) => (
                <Typography fontSize={16} fontWeight="light">
                  {children}
                </Typography>
              ),
            }}
          >
            {description}
          </Markdown>
        )}
      </div>
      {!withoutLink && (
        <LinkButton
          to={`/academy/teacher/${id}`}
          type="vacancy"
          linkClassName="sm:mt-auto sm:ml-auto"
        />
      )}
    </div>
  );
};

export default TeacherSection;
