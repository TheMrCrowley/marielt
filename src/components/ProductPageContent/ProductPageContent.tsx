'use client';

import clsx from 'clsx';

import Title from '@/src/components/common/Title/Title';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

import AgentForm from './AgentForm';
import Characteristics from './Characteristics';
import CreditCalculator from './CreditCalculator';
import DescriptionField from './DescriptionField';
import NoteField from './NoteField';

interface ProductPageContentProps {
  productHeader: React.ReactNode | React.ReactElement;
  characteristics: Array<{ name: string; value: string }>;
  note: string;
  cost: number;
}

const ProductPageContent = ({
  productHeader,
  characteristics,
  note,
  cost,
}: ProductPageContentProps) => {
  const breakpoint = useWindowSize();

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
          {productHeader}
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
            <Characteristics characteristics={characteristics} />
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

              <NoteField note={note} />
            </div>
          </div>
          <CreditCalculator price={cost} />
        </div>

        {breakpoint > WindowWidth.SM && <AgentForm />}
      </div>
    </div>
  );
};

export default ProductPageContent;
