import Link from 'next/link';
import React from 'react';

import RealtorImage from '@/public/realtor-bg.jpg';
import Typography from '@/src/components/common/Typography';
import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';

import StaticPage from './StaticPage';

type RealtorPageProps = {
  title: string;
  description: string;
};

const RealtorPage = ({ description, title }: RealtorPageProps) => {
  return (
    <StaticPage description={description} title={title} imageUrl={RealtorImage}>
      <Typography fontWeight="light">
        Риэлтер - это человек который отвечает за проверку документов и юридическое сопровождение
        сделки. Если вы поработаете агентом, вникните в суть работы в недвижимости, то можете стать
        риэлтером в нашей компании. Для этого вам надо будет пройти специализированные курсы и сдать
        экзамен в МинЮсте, при условии наличия высшего юридического, экономического или
        строительного образования.
      </Typography>
      <Typography fontWeight="light">
        Благодаря этому вы сможете единолично контролировать свои сделки, от общения с клиентами, до
        общением с государственными регистраторами недвижимости. И конечно, ответственная работа
        хорошо вознаграждается!
      </Typography>
      <Typography fontWeight="light">
        Этот карьерный путь для тех, кто любит общение не только с людьми, но и с документами.
      </Typography>
      <Typography fontWeight="light">
        Приходи и становись частью нашей команды, ведь у нас очень крутая корпоративная культура,
        возможности для личного и профессионального роста. Подробнее о этих возможностях смотри на
        страницах{' '}
        <Link href={AppRoutes.Academy} className="text-secondary underline">
          Академия Мариэлт
        </Link>{' '}
        и{' '}
        <Link href={AppChildRoutes.Agent} className="text-secondary underline">
          Агент по недвижимости
        </Link>
      </Typography>
    </StaticPage>
  );
};

export default RealtorPage;
