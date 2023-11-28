'use client';
import clsx from 'clsx';
import { useState } from 'react';

import ProductSlider from '@/src/app-pages/HomePage/ProductSlider';
import CheckboxGroup from '@/src/components/common/CheckboxGroup/CheckboxGroup';
import Title from '@/src/components/common/Title/Title';
import { DefaultFlatItem } from '@/src/types/Flats';
import { ProductType } from '@/src/types/Product';

const SimilarProducts = ({
  similarProducts,
  type,
}: {
  type: ProductType;
  similarProducts: Array<{
    label: string;
    data: DefaultFlatItem[];
  }>;
}) => {
  const [checkedValue, setCheckedValue] = useState<string>(
    similarProducts.find((item) => item.label && item.data.length)?.label || '',
  );

  const dataToRender = similarProducts.filter((item) => item.data.length);

  if (!dataToRender.length) {
    return null;
  }

  return (
    <div className={clsx('flex', 'flex-col', 'md:my-24', 'my-12')}>
      <div
        className={clsx(
          'flex',
          'lg:items-center',
          'items-start',
          'gap-3',
          'lg:gap-12',
          'flex-col',
          'lg:flex-row',
          'justify-start',
          'mb-8',
        )}
      >
        <Title fontSize={32}>Похожие квартиры</Title>
        <CheckboxGroup
          isMulti={false}
          items={dataToRender.map((item) => ({ label: item.label, value: item.label }))}
          onChange={(value) => {
            setCheckedValue(value);
          }}
          values={checkedValue}
          wrapperClassName={clsx('items-center', 'justify-center')}
        />
      </div>
      {checkedValue && (
        <ProductSlider
          type={type}
          products={dataToRender.find((item) => item.label === checkedValue)!.data}
        />
      )}
    </div>
  );
};

export default SimilarProducts;
