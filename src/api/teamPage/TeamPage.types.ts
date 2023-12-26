import { StrapiFindOneResponse, StrapiImage, StrapiFindResponse } from '@/src/types/StrapiTypes';

interface TeamMemberResponse {
  name: string;
  position: string;
  description: string;
  management: boolean;
  photo: StrapiFindOneResponse<StrapiImage>;
}

interface TeamPageResponse {
  text: string;
}

export type TeamPageStrapiResponse = StrapiFindOneResponse<TeamPageResponse>;

export type TeamMemberStrapiResponse = StrapiFindResponse<TeamMemberResponse>;

export abstract class AbstractTeamMembersApi {
  abstract getTeamPageMembers(): Promise<TeamMemberStrapiResponse>;
}

export abstract class AbstractTeamPageApi {
  abstract getTeamPageDescription(): Promise<TeamPageStrapiResponse>;
}
