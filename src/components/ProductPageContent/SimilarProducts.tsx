'use client';
import clsx from 'clsx';
import { useState } from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup/CheckboxGroup';
import Title from '@/src/components/common/Title/Title';

const SimilarProducts = ({
  productSlider,
  product,
}: {
  productSlider: React.ReactNode | React.ReactElement;
  product: string;
}) => {
  const [checkedValue, setCheckedValue] = useState<string>('По цене');

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
        <Title fontSize={32}>Похожие {product}</Title>
        <CheckboxGroup
          isMulti={false}
          items={['По цене', 'По расположению', 'По планировке'].map((item) => ({
            label: item,
            value: item,
          }))}
          onChange={(value) => {
            setCheckedValue(value);
          }}
          values={checkedValue}
          wrapperClassName={clsx('items-center', 'justify-center')}
        />
      </div>
      {productSlider}
    </div>
  );
};

export default SimilarProducts;
