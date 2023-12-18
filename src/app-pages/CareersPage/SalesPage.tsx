import Link from 'next/link';
import React from 'react';

import SalesImage from '@/public/sales-bg.jpg';
import Typography from '@/src/components/common/Typography';
import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';

import StaticPage from './StaticPage';

type SalesPageProps = {
  title: string;
  description: string;
};

const SalesPage = ({ description, title }: SalesPageProps) => {
  return (
    <StaticPage description={description} title={title} imageUrl={SalesImage}>
      <Typography fontWeight="light">
        В недвижимости из-за специфики продаж невозможно набирать опытных руководителей, не имеющих
        опыта в этой сфере. Поэтому, на должность руководителя мы выбираем тех, кто успешно проводил
        собственные сделки и имеет большое желание делиться своей экспертизой и помогать развиваться
        другим стажерам.
      </Typography>
      <Typography fontWeight="light">
        В задачи руководителя входит брать “под свое крыло” стажеров после базового курса обучения и
        помогать на практике осваивать все премудрости агентских будней.
      </Typography>
      <Typography fontWeight="light">
        Чтобы стать руководителем отдела продаж, помимо личного опыта агента и желания развиваться,
        вам необходимо будет пройти нашу корпоративную программу наставничества. Мы обучим вас
        менеджменту и когда вы будете готовы, вы сможете перейти к тому, чтобы управлять командой. А
        так как наша компания постоянно растет - то мощные руководители нам всегда очень и очень
        нужны.
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

export default SalesPage;
