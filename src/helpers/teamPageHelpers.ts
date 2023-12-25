import { TeamStrapiResponse } from '@/src/api/TeamMembersApi';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';
import { TeamItem } from '@/src/types/TeamTypes';

export const convertToTeamPageItem = (
  data: StrapiFindResponse<TeamStrapiResponse>['data'],
): TeamItem[] =>
  data.map((member) => ({
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
  }));
