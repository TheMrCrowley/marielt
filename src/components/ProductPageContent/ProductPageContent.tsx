'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import LocationIcon from '@/public/card-map-pin.svg';
import PhoneIcon from '@/public/phoneIcon.svg';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { DefaultFlatItem } from '@/src/types/Flats';

import Characteristics from './Characteristics';
import CreditCalculator from './CreditCalculator';
import DescriptionField from './DescriptionField';

const ProductPageContent = ({ flat }: { flat: DefaultFlatItem }) => {
  const breakpoint = useWindowSize();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className={clsx('w-full', 'lg:px-12', 'px-5')}>
      <div
        className={clsx(
          'flex',
          'lg:justify-between',
          'justify-center',
          'gap-[30px]',
          'min-[1440px]:flex-row',
          'flex-col',
        )}
      >
        {/*TODO //move gap value to taiwind? */}
        <div className={clsx('flex', 'flex-col', 'gap-y-[30px]', 'w-[calc(100% - 340px)]')}>
          <div className={clsx('bg-[#262626]', 'flex', 'lg:flex-row', 'flex-col')}>
            {/*TODO //move padding, gap, border-color value to taiwind? */}
            <div
              className={clsx(
                'flex',
                'flex-col',
                'lg:gap-y-5',
                'gap-y-4',
                'lg:px-8',
                'px-5',
                'py-5',
                'border-r',
                'border-[#ffffff1a]',
              )}
            >
              <Title variant="h2" fontSize={24} fontWeight={'medium'}>
                Название двухкомнатной квартиры
              </Title>
              <div className={clsx('flex', 'gap-1.5')}>
                <Image alt="map-pin" src={LocationIcon} />
                <Typography fontSize={16}>Минск, Мира пр-т</Typography>
              </div>
              <div
                className={clsx(
                  'flex',
                  'justify-between',
                  'mt-4',
                  'lg:flex-row',
                  'flex-col',
                  'flex-wrap',
                  'gap-2',
                )}
              >
                <Typography fontSize={16}>Комнат:2</Typography>
                <Typography fontSize={16}>Этаж:7/16</Typography>
                <Typography fontSize={16}>Год постройки:2020</Typography>
              </div>
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'lg:gap-y-[38px]',
                'gap-y-5',
                'lg:px-8',
                'px-4',
                'py-5',
                'lg:border-r',
                'border-[#ffffff1a]',
                'lg:border-t-0',
                'border-t',
                'border-[#ffffff1a]',
              )}
            >
              <Title variant="h2" fontSize={24} fontWeight={'medium'}>
                Площадь
              </Title>
              <div
                className={clsx(
                  'flex',
                  'lg:justify-center',
                  'xs:justify-start',
                  'justify-center',
                  'items-center',
                )}
              >
                <div
                  className={clsx(
                    'flex',
                    'flex-col',
                    'lg:px-8',
                    'border-r',
                    'border-[#ffffff1a]',
                    'px-4',
                  )}
                >
                  <Typography>
                    38,5
                    <span className={clsx('text-[#B1B1B1]')}>
                      м<sup>2</sup>
                    </span>
                  </Typography>
                  <Typography fontSize={16} fontWeight={'light'}>
                    общая
                  </Typography>
                </div>
                <div
                  className={clsx(
                    'flex',
                    'flex-col',
                    'lg:px-8',
                    'px-4',
                    'border-r',
                    'border-[#ffffff1a]',
                  )}
                >
                  <Typography>
                    23,5
                    <span className={clsx('text-[#B1B1B1]')}>
                      м<sup>2</sup>
                    </span>
                  </Typography>
                  <Typography fontSize={16} fontWeight={'light'}>
                    жилая
                  </Typography>
                </div>
                <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-5')}>
                  <Typography>14,7$</Typography>
                  <Typography fontSize={16} fontWeight={'light'}>
                    за{' '}
                    <span>
                      м<sup>2</sup>
                    </span>
                  </Typography>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'gap-y-8',
                'lg:px-8',
                'py-5',
                'px-5',
                'lg:border-0',
                'border-t',
                'border-[#ffffff1a]',
              )}
            >
              <Title variant="h2" fontSize={24} fontWeight={'medium'}>
                Стоимость
              </Title>
              <div
                className={clsx(
                  'flex',
                  'lg:justify-center',
                  'justify-start',
                  'items-center',
                  'flex-wrap',
                  'lg:gap-3',
                  'gap-2',
                )}
              >
                <Typography
                  fontSize={24}
                  fontWeight="medium"
                  color="text-[#343434]"
                  className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
                >
                  67 0246 USD
                </Typography>
                <Typography fontSize={24}>198 623 BYN</Typography>
              </div>
            </div>
          </div>
          {/*TODO //move gap value to taiwind? */}
          {breakpoint < WindowWidth.LG && breakpoint > WindowWidth.XS && (
            <div className={clsx('flex', 'flex-col', 'bg-[#262626]', 'p-5')}>
              <Title variant="h2" className={clsx('px-[10px]', 'pb-[17px]')} fontSize={32}>
                Местоположение
              </Title>
              <div className={clsx('w-full', 'h-[460px]', 'p-[10px]', 'relative')}>
                <div
                  className={clsx(
                    'w-[91px]',
                    'h-[91px]',
                    'absolute',
                    'block',
                    'top-0',
                    'border-secondary',
                    'border-t-2',
                    'border-l-2',
                    'left-0',
                  )}
                />
                <div
                  className={clsx(
                    'w-[91px]',
                    'h-[91px]',
                    'absolute',
                    'block',
                    'top-0',
                    'border-secondary',
                    'border-t-2',
                    'border-r-2',
                    'right-0',
                  )}
                />
                <div
                  className={clsx(
                    'w-[91px]',
                    'h-[91px]',
                    'absolute',
                    'block',
                    'bottom-0',
                    'border-secondary',
                    'border-b-2',
                    'border-l-2',
                    'left-0',
                  )}
                />
                <div
                  className={clsx(
                    'w-[91px]',
                    'h-[91px]',
                    'absolute',
                    'block',
                    'bottom-0',
                    'border-secondary',
                    'border-b-2',
                    'border-r-2',
                    'right-0',
                  )}
                />
              </div>
            </div>
          )}
          <div className={clsx('flex', 'gap-[30px]', 'md:flex-row', 'flex-col')}>
            <Characteristics
              characteristics={[
                { key: 'Количество комнат', value: '3' },
                { key: 'Раздельных комнат', value: '2' },
                { key: 'Площадь общая', value: '42,8' },
                { key: 'Площадь жилая', value: '37,6' },
                { key: 'Площадь кухни', value: '12,2' },
                { key: 'Год постройки', value: '2020' },
                { key: 'Этаж / этажность', value: '7/16' },
                { key: 'Тип дома', value: 'Панельный' },
                { key: 'Планировка', value: 'Есть' },
                { key: 'Ремонт', value: 'Есть' },
                { key: 'Высота потолков', value: '16' },
                { key: 'Полы', value: 'Есть' },
                { key: 'Санузел', value: 'Раздельный' },
                { key: 'Телефон', value: '666666666' },
                { key: 'Собственность', value: 'Частная' },
                { key: 'Условия продажи', value: 'Чистая' },
              ]}
            />
            <div className={clsx('flex', 'flex-col', 'gap-y-[30px]', 'lg:w-[65%]', 'w-full')}>
              {(breakpoint >= WindowWidth.LG || breakpoint <= WindowWidth.XS) && (
                <div className={clsx('flex', 'flex-col', 'bg-[#262626]', 'p-5')}>
                  <Title variant="h2" className={clsx('px-[10px]', 'pb-[17px]')} fontSize={32}>
                    Местоположение
                  </Title>
                  <div className={clsx('w-full', 'h-[460px]', 'p-[10px]', 'relative')}>
                    <div
                      className={clsx(
                        'w-[91px]',
                        'h-[91px]',
                        'absolute',
                        'block',
                        'top-0',
                        'border-secondary',
                        'border-t-2',
                        'border-l-2',
                        'left-0',
                      )}
                    />
                    <div
                      className={clsx(
                        'w-[91px]',
                        'h-[91px]',
                        'absolute',
                        'block',
                        'top-0',
                        'border-secondary',
                        'border-t-2',
                        'border-r-2',
                        'right-0',
                      )}
                    />
                    <div
                      className={clsx(
                        'w-[91px]',
                        'h-[91px]',
                        'absolute',
                        'block',
                        'bottom-0',
                        'border-secondary',
                        'border-b-2',
                        'border-l-2',
                        'left-0',
                      )}
                    />
                    <div
                      className={clsx(
                        'w-[91px]',
                        'h-[91px]',
                        'absolute',
                        'block',
                        'bottom-0',
                        'border-secondary',
                        'border-b-2',
                        'border-r-2',
                        'right-0',
                      )}
                    />
                  </div>
                </div>
              )}
              <DescriptionField
                description="Однокомнатная квартира в квартале Мировые танцы ЖК Minsk World 430053. Площадь 33,8 м2 по
        СНБ свободной планировки на 7 этаже 10-ти этажного дома по улице Н.Теслы д.17 дом
        Полька.Уютная, светлая квартира-студия. Кухня выполнена из качественного материала. Квартира
        оборудована бытовой техникой и импортной сантехникой. Совмещённый санузел, отдельная
        гардеробная, просторная лоджия. Первое заселение. Дом расположен рядом со зданием старого
        аэропорта, шикарный вид из окна, развитая инфраструктура, отличное транспортное сообщение,
        современная детская площадка с резиновым покрытием, множество парковочных мест.Чистая
        продажа. Показываем в удобное для вас время.Гарантия безопасности сделки и полное
        юридическое сопровождение.Поможем продать Вашу недвижимость для приобретения этой квартиры!
        Лот 430053"
              />
            </div>
          </div>
          <CreditCalculator />
        </div>

        {breakpoint > WindowWidth.SM && (
          <div
            className={clsx(
              'flex',
              'flex-row',
              'min-[1440px]:min-w-[337px]',
              'min-[1440px]:flex-col',
              'w-full',
            )}
          >
            <div className={clsx('bg-[#262626]', 'relative', 'h-[337px]', 'min-w-[337px]')}>
              <Typography fontSize={24} fontWeight="medium" className={clsx('absolute')}>
                Ольга Лазаренкова
              </Typography>
            </div>
            <form
              className={clsx(
                'bg-secondary',
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'p-6',
                'w-full',
              )}
            >
              <div className={clsx('flex')}>
                <Image alt="phone" src={PhoneIcon} />
                <Typography fontSize={14} fontWeight="medium" color="#000000">
                  +375 29 XXX-XX-XX
                </Typography>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={clsx('text-black', 'underline', 'text-sm', 'opacity-50', 'mb-6')}
              >
                Показать контакты
              </button>
              <input
                placeholder="Имя"
                className={clsx(
                  'w-full',
                  'text-base',
                  'border-b',
                  'border-black',
                  'text-black',
                  'mb-5',
                )}
              />
              {/**TODO: min validation, mask for tel-input? */}
              <input
                type="tel"
                placeholder="+375 25 784 65 47"
                className={clsx(
                  'w-full',
                  'text-base',
                  'border-b',
                  'border-black',
                  'text-black',
                  'mb-12',
                )}
              />
              <label
                className={clsx(
                  'text-black',
                  'text-sm',
                  'flex',
                  'justify-center',
                  'items-center',
                  'font-light',
                  'text-center',
                  'mb-5',
                )}
              >
                <input
                  onChange={() => setIsChecked(!isChecked)}
                  className={clsx('w-[15px]', 'h-[15px]')}
                  type="checkbox"
                  name="agreement"
                  checked={isChecked}
                />
                Я согласен(а) с обработкой моих персональных данных
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                disabled={!isChecked}
                className={clsx(
                  'disabled:pointer-events-none',
                  'bg-[#262626]',
                  'text-white',
                  'w-full',
                  'py-3',
                )}
              >
                Оставить заявку
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageContent;
