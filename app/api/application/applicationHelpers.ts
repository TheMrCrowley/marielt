import { ApplicationFormType } from '@/src/enums/ApplicationForm';

export const getApplicationUrl = (type: ApplicationFormType) => {
  switch (type) {
    case ApplicationFormType.HR:
      return `${process.env.API_BASE_URL}/hr-apps`;
    case ApplicationFormType.Rest:
      return `${process.env.API_BASE_URL}/res-apps`;
    case ApplicationFormType.Comm:
      return `${process.env.API_BASE_URL}/comm-apps`;
    default:
      return null as never;
  }
};

export const getApplicationType = (type: ApplicationFormType) => {
  switch (type) {
    case ApplicationFormType.Comm:
      return 'продать/сдать';
    case ApplicationFormType.HR:
      return 'вакансии';
    case ApplicationFormType.Rest:
      return 'продать';
    default:
      return null as never;
  }
};
