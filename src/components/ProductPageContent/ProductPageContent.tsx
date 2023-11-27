'use client';

import clsx from 'clsx';

import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

import AgentForm from './AgentForm';
import DescriptionField from './DescriptionField';

interface ProductPageContentProps {
  productHeader: React.ReactNode | React.ReactElement;
  characteristics: React.ReactElement | React.ReactNode;
  note: React.ReactElement | React.ReactNode;
  locationField: React.ReactNode | React.ReactElement;
  similarObjectsField: React.ReactNode | React.ReactElement;
  creditCalculator?: React.ReactNode | React.ReactElement;
}

const ProductPageContent = ({
  productHeader,
  characteristics,
  creditCalculator,
  note,
  locationField,
  similarObjectsField,
}: ProductPageContentProps) => {
  const breakpoint = useWindowSize();

  const renderMobileLocationField = () =>
    breakpoint < WindowWidth.LG && breakpoint > WindowWidth.XS && locationField;

  const renderDesktopLocationField = () =>
    (breakpoint >= WindowWidth.LG || breakpoint <= WindowWidth.XS) && locationField;

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
          {renderMobileLocationField()}
          <div className={clsx('flex', 'gap-8', 'xl:flex-row', 'flex-col')}>
            {characteristics}
            <div className={clsx('flex', 'flex-col', 'gap-8', 'xl:w-[65%]', 'w-full')}>
              {renderDesktopLocationField()}
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

              {note}
            </div>
          </div>
          {creditCalculator}
        </div>

        {breakpoint > WindowWidth.SM && <AgentForm />}
      </div>
      {similarObjectsField}
    </div>
  );
};

export default ProductPageContent;
