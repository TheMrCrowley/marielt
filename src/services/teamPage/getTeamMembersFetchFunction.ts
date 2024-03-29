import { AbstractTeamMembersApi } from '@/src/api/teamPage';
import { convertToTeamPageItem } from '@/src/helpers/teamPage/teamPageHelpers';
import { TeamItem } from '@/src/types/TeamTypes';

const getTeamMembersFetchFunction =
  (api: AbstractTeamMembersApi) => async (): Promise<TeamItem[]> => {
    const { data } = await api.getTeamPageMembers();

    return convertToTeamPageItem(data);
  };

export default getTeamMembersFetchFunction;
