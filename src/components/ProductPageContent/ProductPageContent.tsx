'use client';

import clsx from 'clsx';

import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ProductPageContentProps {
  productHeader: React.ReactNode | React.ReactElement;
  characteristics: React.ReactElement | React.ReactNode;
  note: React.ReactElement | React.ReactNode;
  locationField: React.ReactNode | React.ReactElement;
  similarObjectsField: React.ReactNode | React.ReactElement;
  creditCalculator?: React.ReactNode | React.ReactElement;
  agentForm?: React.ReactNode | React.ReactElement;
  detailedDescription?: React.ReactNode | React.ReactElement;
}

const ProductPageContent = ({
  productHeader,
  characteristics,
  creditCalculator,
  note,
  locationField,
  agentForm,
  similarObjectsField,
  detailedDescription,
}: ProductPageContentProps) => {
  const breakpoint = useWindowSize();

  const renderMobileLocationField = () =>
    breakpoint < WindowWidth.LG && breakpoint > WindowWidth.XS && locationField;

  const renderDesktopLocationField = () =>
    (breakpoint >= WindowWidth.LG || breakpoint <= WindowWidth.XS) && locationField;

  return (
    <div className={clsx('w-full', 'lg:px-12', 'px-5', 'mb-8')}>
      <div
        className={clsx(
          'flex',
          'justify-center',
          'gap-8',
          'min-[1440px]:flex-row',
          'flex-col',
          'relative',
          'mb-8',
        )}
      >
        <div className={clsx('flex', 'flex-col', 'gap-8', 'w-[calc(100% - 340px)]')}>
          {productHeader}

          <div className={clsx('flex', 'gap-8', 'xl:flex-row', 'flex-col')}>
            {characteristics}
            <div className={clsx('flex', 'flex-col', 'gap-8', 'xl:w-[65%]', 'w-full')}>
              {renderDesktopLocationField()}
              {detailedDescription}

              {note}
            </div>
          </div>
          {renderMobileLocationField()}
          {creditCalculator}
        </div>
        {/* TODO move to component */}
        {agentForm}
      </div>

      {similarObjectsField}
    </div>
  );
};

export default ProductPageContent;
