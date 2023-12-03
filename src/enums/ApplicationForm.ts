import { OptionType } from '@/src/types/Filters';

export enum ApplicationFormType {
  Rest = 'rest',
  Comm = 'comm',
  HR = 'hr',
}

export const applicationFormOptions: OptionType<ApplicationFormType> = [
  { value: ApplicationFormType.Rest, label: 'Продать жилой объект' },
  { value: ApplicationFormType.Comm, label: 'Продать/сдать в аренду коммерческий объект' },
  { value: ApplicationFormType.HR, label: 'Интересует работа' },
];
