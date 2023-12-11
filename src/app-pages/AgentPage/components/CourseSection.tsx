import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import BrainIcon from '@/public/brain-icon.svg';
import LawBasicsIcon from '@/public/law-basics.svg';
import SaleBasicsIcon from '@/public/sale-basic.svg';
import LinkButton from '@/src/components/LinkButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { getVideoId } from '@/src/helpers/videoHelpers';
import { StrapiVideo } from '@/src/types/VideoLink';

interface CourseSectionProps {
  courseVideo?: StrapiVideo;
}

const CourseSection = ({ courseVideo }: CourseSectionProps) => {
  return (
    <>
      <section className="w-full flex justify-center items-center p-6 bg-no-repeat bg-[url(/question-bh.png)] bg-center bg-cover bg-secondary">
        <div className="max-w-7xl w-full flex flex-col gap-4 py-8">
          <Title fontSize={48} className="!text-[#343434]">
            Точно ли у меня получится?
          </Title>
          <Typography fontSize={24} fontWeight="light" color="text-[#343434]">
            Самое сложное в работе агента - это первые несколько месяцев. Да,  нужно выучить много
            новой информации, научиться планировать свое время, набрать свою базу объектов,
            научиться продавать себя и свои личные качества.
          </Typography>
          <Typography fontSize={24} fontWeight="light" color="text-[#343434]">
            А чтобы нашим стажерам было проще стать профессионалами мы создали уникальные условия
            для входа в профессию на базе{' '}
            <Link href={AppRoutes.Academy}>
              <b>Академии Мариэлт</b>
            </Link>
          </Typography>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-8 p-6">
        <div className="max-w-7xl w-full flex flex-col gap-4 py-8">
          <Title fontSize={48}>Базовый курс обучения</Title>
          <Typography fontSize={24} fontWeight="light">
            3 недели обучения, теории и практики
          </Typography>
          <div className="flex flex-wrap gap-8">
            <div className="flex gap-4 items-center">
              <Image src={SaleBasicsIcon} alt="law-basic" />
              <Typography fontSize={24} fontWeight="medium">
                Техники продаж
              </Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Image src={LawBasicsIcon} alt="law-basic" />
              <Typography fontSize={24} fontWeight="medium">
                Юридические основы
              </Typography>
            </div>
            <div className="flex gap-4 items-center">
              <Image src={BrainIcon} alt="law-basic" />
              <Typography fontSize={24} fontWeight="medium">
                Психология
              </Typography>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full flex bg-[#343434] sm:flex-row flex-col">
          <div className="flex-auto flex flex-col lg:gap-12 sm:gap-8 gap-4 md:w-6/12 w-full sm:p-[4%] px-5 py-8">
            <Typography fontSize={24} fontWeight="light">
              Со стажерами работают профессиональные бизнес-тренеры с большим опытом в продажах,
              психологии и недвижимости.{' '}
            </Typography>
            <LinkButton to={AppRoutes.Academy} type="vacancy" />
          </div>
          {courseVideo && (
            <div
              className="w-full flex justify-end items-center"
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.youtube.com/embed/${getVideoId(
                  courseVideo.url,
                )}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${
                  courseVideo.title
                }" class="md:max-w-3xl sm:max-w-lg w-full aspect-video"/>`,
              }}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default CourseSection;
