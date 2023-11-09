import clsx from 'clsx';
import Image from 'next/image';

import LocationIcon from '@/public/card-map-pin.svg';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography';
import { DefaultFlatItem } from '@/src/types/Flats';

const ProductPageContent = async ({ flat }: { flat: DefaultFlatItem }) => {
  return (
    <div className={clsx('w-full', 'px-12')}>
      <div className={clsx('flex', 'justify-between')}>
        {/*TODO //move gap value to taiwind? */}
        <div className={clsx('flex', 'flex-col', 'gap-y-[30px]')}>
          <div className={clsx('bg-[#262626]', 'flex', 'lg:flex-row', 'flex-col')}>
            {/*TODO //move padding, gap, border-color value to taiwind? */}
            <div
              className={clsx(
                'flex',
                'flex-col',
                'gap-y-5',
                'px-8',
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
              <div className={clsx('flex', 'justify-between', 'mt-4', 'flex-wrap', 'gap-3')}>
                <Typography fontSize={16}>Комнат:2</Typography>
                <Typography fontSize={16}>Этаж:7/16</Typography>
                <Typography fontSize={16}>Год постройки:2020</Typography>
              </div>
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'gap-y-[38px]',
                'px-8',
                'py-5',
                'border-r',
                'border-[#ffffff1a]',
              )}
            >
              <Title variant="h2" fontSize={24} fontWeight={'medium'}>
                Площадь
              </Title>
              <div className={clsx('flex', 'flex-wrap')}>
                <div className={clsx('flex', 'flex-col', 'px-8', 'border-r', 'border-[#ffffff1a]')}>
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
                <div className={clsx('flex', 'flex-col', 'px-8', 'border-r', 'border-[#ffffff1a]')}>
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
                <div className={clsx('flex', 'flex-col', 'px-8')}>
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
            <div className={clsx('flex', 'flex-col', 'gap-y-8', 'px-8', 'py-5')}>
              <Title variant="h2" fontSize={24} fontWeight={'medium'}>
                Стоимость
              </Title>
              <div className={clsx('flex', 'justify-center', 'items-center', 'flex-wrap', 'gap-3')}>
                <Typography
                  fontSize={24}
                  fontWeight="medium"
                  color="text-[#343434]"
                  className={clsx('bg-secondary', 'px-6', 'py-3')}
                >
                  67 0246 USD
                </Typography>
                <Typography fontSize={24}>198 623 BYN</Typography>
              </div>
            </div>
          </div>
          {/*TODO //move gap value to taiwind? */}
          {/* <div className={clsx('flex', 'gap-x-[30px]')}>
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
            <div className={clsx('flex', 'flex-col', 'gap-y-[30px]', 'w-[65%]')}>
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
          </div> */}
          {/* <CreditCalculator /> */}
        </div>
        <form></form>
      </div>
    </div>
  );
};

export default ProductPageContent;
