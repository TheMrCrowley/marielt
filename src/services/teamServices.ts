import qs from 'qs';

import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';
import { TeamStrapiResponse, TeamItem } from '@/src/types/TeamTypes';

export const getTeamPageMembers = async (): Promise<{ members: TeamItem[] }> => {
  const populateQuery = qs.stringify(
    {
      populate: {
        photo: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/teams?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<TeamStrapiResponse>;

  return {
    members: data.map((member) => ({
      id: member.id,
      description: member.attributes.description,
      management: !!member.attributes.management,
      name: member.attributes.name,
      photo: member.attributes.photo.data
        ? {
            height: member.attributes.photo.data.attributes.height,
            placeholder: member.attributes.photo.data.attributes.placeholder,
            url: member.attributes.photo.data.attributes.url,
            width: member.attributes.photo.data.attributes.width,
          }
        : undefined,
      position: member.attributes.position,
    })),
  };
};

const getTeamPageDescription = async () => {
  const url = `${process.env.API_BASE_URL}/team-page`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<{ text: string }>;

  return data.attributes.text;
};

export const getTeamPageData = async (): Promise<{ members: TeamItem[]; description: string }> => {
  const [description, { members }] = await Promise.all([
    getTeamPageDescription(),
    getTeamPageMembers(),
  ]);

  return {
    description,
    members,
  };
};
