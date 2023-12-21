import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Intern from '@/public/intern.png';
import LeaderForm from '@/src/components/LeaderForm';
import Typography from '@/src/components/common/Typography';

import TeachersSections from './components/TeachersSections';

const AcademyPage = () => {
  return (
    <>
      <section className="flex w-full gap-4 justify-center items-center p-4 flex-wrap">
        <a href="#basic">
          <Typography fontSize={16}>Базовый курс Агента</Typography>
        </a>
        <a href="#additional">
          <Typography fontSize={16}>Дополнительные тренинги</Typography>
        </a>
        <a href="#prof">
          <Typography fontSize={16}>Обучение опытных агентов</Typography>
        </a>
        <a href="#teachers">
          <Typography fontSize={16}>Преподаватели</Typography>
        </a>
      </section>
      <section className="flex flex-col gap-8 justify-center items-center bg-[url(/academy-bg.png)] w-full md:py-24  py-12 px-6">
        <Typography
          fontSize={48}
          fontWeight="medium"
          color="text-primary-medium"
          className="p-4 bg-secondary text-center md:mb-12 mb-0"
        >
          Постоянное развитие - залог лидерства
        </Typography>
        <Typography fontSize={32} fontWeight="medium" className="text-center">
          Наша компания заботится о профессионализме сотрудников.
        </Typography>
        <div className="flex gap-8 flex-wrap justify-center items-center">
          <div className="flex justify-center items-center gap-4">
            <div className="w-3 h-3 bg-secondary" />
            <Typography fontWeight="medium">Клиентский сервис</Typography>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="w-3 h-3 bg-secondary" />
            <Typography fontWeight="medium">Юридическая грамотность</Typography>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="w-3 h-3 bg-secondary" />
            <Typography fontWeight="medium">Стресс менеджмент</Typography>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="w-3 h-3 bg-secondary" />
            <Typography fontWeight="medium">Умение решать конфликты</Typography>
          </div>
        </div>
        <Typography fontWeight="medium" className="text-center max-w-2xl">
          Это и многое другое мы развиваем в каждом сотруднике, благодаря чему вышли на лидирующие
          позиции на рынке РБ.
        </Typography>
      </section>
      <section
        className={clsx(
          'w-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-6',
          'gap-8',
        )}
      >
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-12')}>
          <div className="w-full flex flex-col gap-4" id="basic">
            <div className="bg-[url(/prof-grow-bg.png)] p-8 w-full flex flex-col gap-8">
              <Typography fontSize={32} fontWeight="medium">
                С чего начинается рост профессионализма
              </Typography>
              <Typography fontSize={24} fontWeight="light">
                Базовый курс обучения агента - это 3 недели теории и практики
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  01
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Юридические аспекты покупки и продажи недвижимости
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  02
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Технические нюансы по квартирам, ремонтам, жилым комплексам
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  03
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Аналитика рынка недвижимости
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  04
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Техники продаж
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  05
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Психология продавцов и покупателей
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  06
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Переговорные стратегии, разрешение конфликтов
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  07
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Навыки управления эмоциями и стрессменеджмент
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  08
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Типология клиентов
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  09
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Навыки проведения встреч и показов
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  10
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Невербальная коммуникация
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center md:flex-row flex-col">
            <div className="flex flex-col gap-8 max-w-2xl w-full">
              <Typography fontSize={24} fontWeight="medium" className="max-w-2xl">
                После базового курса стажер попадает в коллектив, в котором с ним работают опытный
                куратор, коуч и риэлтор.
              </Typography>
              <div className="flex flex-col gap-4">
                <Typography
                  fontSize={24}
                  fontWeight="medium"
                  color="text-secondary p-4 bg-primary-medium w-max"
                >
                  Куратор
                </Typography>
                <Typography className="pl-8 " fontWeight="light">
                  Отвечает на все юридические вопросы, помогает с документами для сделки,
                  сопровождает предварительные и сделки, решает любые технические вопросы.
                </Typography>
              </div>
              <div className="flex flex-col gap-4">
                <Typography
                  fontSize={24}
                  fontWeight="medium"
                  color="text-secondary p-4 bg-primary-medium w-max"
                >
                  Коуч
                </Typography>
                <Typography className="pl-8 " fontWeight="light">
                  Бывший опытный агент с навыками менеджмента. Разбирает вместе с новичком звонки и
                  встречи, помогает вести торги с клиентами, ориентирует по всем сложностям, которые
                  возникают в процессе продаж.
                </Typography>
              </div>
              <div className="flex flex-col gap-4">
                <Typography
                  fontSize={24}
                  fontWeight="medium"
                  color="text-secondary p-4 bg-primary-medium w-max"
                >
                  Риэлтор
                </Typography>
                <Typography className="pl-8 " fontWeight="light">
                  Помогает с планированием, мотивацией, управлением эмоциональным состоянием,
                  психологическими сложностями.
                </Typography>
              </div>
            </div>
            <Image src={Intern} alt="intern-diagram" className="md:max-w-lg" />
          </div>
          <div className="w-full flex gap-4 md:flex-row flex-col" id="additional">
            <div className="max-w-xl w-full flex flex-col gap-4">
              <Typography fontSize={32} className="p-8 bg-primary-medium">
                Регулярные утренние тренинги за пределами базового курса по самым разным темам:
              </Typography>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  01
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Эмоциональный интеллект
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  02
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Целеполагание
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  03
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Трудные разговоры
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  04
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Медиация
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  05
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Лидерство
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  06
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Психология отношений
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  07
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Коучинг в менеджменте
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  08
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Нейролингвистическое программирование
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  ...
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  И многое другое
                </Typography>
              </div>
            </div>
            <div className="max-w-xl w-full flex flex-col gap-4">
              <Typography fontSize={32} className="p-8 bg-primary-medium">
                Продвинутые тренинги по желанию:
              </Typography>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  01
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Тренировка использования техник продаж
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  02
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Выступления опытных агентов
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  03
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Разбор успешных сложных сделок
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  04
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Эффективные показы
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  05
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Холодные звонки
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  06
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Личностное развитие 
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  07
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Психология покупателя и продавца
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  08
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Юридические часы
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  09
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Бизнес-игры по разным тематикам
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  10
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Финансовая грамотность
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4" id="prof">
            <div className="bg-[url(/mega-agent-bg.png)] p-8 w-full flex flex-col gap-8">
              <Typography fontSize={32} fontWeight="medium">
                Мы обучаем агентов из других агентств
              </Typography>
              <Typography fontSize={24} fontWeight="light">
                Продвинутый курс суперагента
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  01
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Стратегии продажи объектов
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  02
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Переговорные модели - Гарвардская и Кремлевская
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  03
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Управление инициативой в диалоге
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  04
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Фокусы языка и продвинутая работа с возражениями
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  05
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Стратегии проведения встреч
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  06
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Техники побуждения к действию
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  07
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Корректировка стоимости объекта
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  fontWeight="medium"
                  color="text-secondary"
                  className="flex justify-end items-center bg-primary-medium py-2 pl-8 pr-4 md:min-w-[88px] min-w-[65px]"
                >
                  08
                </Typography>
                <Typography fontSize={24} fontWeight="light">
                  Прогнозирование рынка недвижимости
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <TeachersSections />
      </section>
      <LeaderForm />
    </>
  );
};

export default AcademyPage;
