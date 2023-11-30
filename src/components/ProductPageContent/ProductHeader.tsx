import clsx from 'clsx';
import { FC } from 'react';

import Title from '@/src/components/common/Title/Title';

// const renderHeaderField = (type: ProductType) => {
//   switch (type) {
//     case 'flats':
//       return (
// <div
//   className={clsx(
//     'flex',
//     'justify-between',
//     'mt-4',
//     'lg:flex-row',
//     'flex-col',
//     'flex-wrap',
//     'gap-2',
//   )}
// >
//   <Typography fontSize={16}>Комнат:2</Typography>
//   <Typography fontSize={16}>Этаж:7/16</Typography>
//   <Typography fontSize={16}>Год постройки:2020</Typography>
// </div>
//       );
//     case 'commercial':
//       return <CommercialType />;

//     case 'houses-and-lots':
//       return (
//         <div
//           className={clsx(
//             'flex',
//             'justify-between',
//             'mt-4',
//             'lg:flex-row',
//             'flex-col',
//             'flex-wrap',
//             'gap-2',
//           )}
//         >
//           <div className={clsx('flex', 'gap-1.5')}>
//             <Image alt="house" src={HouseIcon} />
//             <Typography fontSize={16}>Коттедж</Typography>
//           </div>

//           <Typography fontSize={16}>Год постройки:2020</Typography>
//         </div>
//       );
//   }
// };

/* <Title variant="h2" fontSize={24} fontWeight={'medium'}>
          Название двухкомнатной квартиры
        </Title>
        <div className={clsx('flex', 'gap-1.5')}>
          <Image alt="map-pin" src={LocationIcon} />
          <Typography fontSize={16}>Минск, Мира пр-т</Typography>
        </div>
        {type !== 'flats' && (
          <div className={clsx('flex', 'gap-1.5')}>
            <Image alt="direction" src={DirectionIcon} />
            <Typography color="text-[#A3A3A3]" fontSize={16}>
              Московское, 7 км от МКАД
            </Typography>
          </div>
        )} */

/* {renderHeaderField('flats')} */

/* <div
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
        <div
          className={clsx(
            'flex',
            'lg:justify-center',
            'justify-start',
            'items-center',
            'flex-wrap',
            'lg:gap-16',
            'gap-2',
          )}
        >
          <Typography color="text-[#E3C496]" fontSize={20} fontWeight="medium">
            1 650 $ за{' '}
            <span>
              м<sup>2</sup>
            </span>
          </Typography>
          <Typography color="text-[#B1B1B1]" fontSize={20} fontWeight="medium">
            4 240 BYN за{' '}
            <span>
              м<sup>2</sup>
            </span>
          </Typography>
        </div> */

interface Props {
  description?: React.ReactNode | React.ReactElement;
  price?: React.ReactNode | React.ReactElement;
  area?: React.ReactNode | React.ReactElement;
}

const ProductHeader: FC<Props> = ({ area, description, price }) => {
  return (
    <div className={clsx('bg-[#262626]', 'flex', 'lg:flex-row', 'flex-col')}>
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
        {description}
      </div>
      {area}
      <div
        className={clsx(
          'flex',
          'flex-col',
          'lg:gap-0',
          'gap-5',
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
        {price}
      </div>
    </div>
  );
};

export default ProductHeader;
