import { TeamMemberStrapiResponse } from '@/src/api/teamPage';
import { TeamItem } from '@/src/types/TeamTypes';

export const convertToTeamPageItem = (data: TeamMemberStrapiResponse['data']): TeamItem[] =>
  data.map((member) => ({
    id: member.id,
    description: member.attributes.description,
    management: !!member.attributes.management,
    name: member.attributes.name,
    photo: member.attributes.photo.data
      ? {
          height: member.attributes.photo.data.attributes.height,
          placeholder: member.attributes.photo.data.attributes.placeholder,
          url: `https://marielt.by:6060${member.attributes.photo.data.attributes.url}`,
          width: member.attributes.photo.data.attributes.width,
        }
      : undefined,
    position: member.attributes.position,
  }));
