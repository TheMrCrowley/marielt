import { AbstractTeachersApi } from '@/src/api/academyPage';
import { convertToTeacher } from '@/src/helpers/academyPage/teacherHelpers';
import { Teacher } from '@/src/types/TeacherType';

const getTeacherByIdFetchFunction =
  (api: AbstractTeachersApi) =>
  async (id: string): Promise<Teacher> => {
    const { data } = await api.getTeacherById(id);

    return convertToTeacher(data);
  };

export default getTeacherByIdFetchFunction;
