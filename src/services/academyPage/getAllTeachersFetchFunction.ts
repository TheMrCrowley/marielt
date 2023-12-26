import { AbstractTeachersApi } from '@/src/api/academyPage';
import { convertToTeacher } from '@/src/helpers/academyPage/teacherHelpers';
import { Teacher } from '@/src/types/TeacherType';

const getAllTeachersFetchFunction = (api: AbstractTeachersApi) => async (): Promise<Teacher[]> => {
  const { data } = await api.getAllTeachers();

  return data.map(convertToTeacher);
};

export default getAllTeachersFetchFunction;
