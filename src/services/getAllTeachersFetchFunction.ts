import { AbstractTeachersApi } from '@/src/api/TeachersApi';
import { convertToTeacher } from '@/src/helpers/teacherHelpers';
import { Teacher } from '@/src/types/TeacherType';

const getAllTeachersFetchFunction = (api: AbstractTeachersApi) => async (): Promise<Teacher[]> => {
  const { data } = await api.getAllTeachers();

  return data.map(convertToTeacher);
};

export default getAllTeachersFetchFunction;
