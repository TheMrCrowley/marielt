import { AbstractTeamPageApi } from '@/src/api/TeamPageApi';
import { convertToTeamPageItem } from '@/src/helpers/teamPageHelpers';
import { TeamItem } from '@/src/types/TeamTypes';

export const getTeamPageDataFetchFunction =
  (api: AbstractTeamPageApi) => async (): Promise<{ members: TeamItem[]; description: string }> => {
    const [description, members] = await Promise.all([
      api.getTeamPageDescription(),
      api.getTeamPageMembers(),
    ]);

    return {
      description,
      members: convertToTeamPageItem(members.data),
    };
  };
