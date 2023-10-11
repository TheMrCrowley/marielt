import clsx from 'clsx';
import { StaticImageData } from 'next/image';

import CategoryPreview from '@/components/CategoryPreview';
import ApartmentsImg from '@/public/apartments.png';
import CommercialImg from '@/public/commercial.png';
import HouseImg from '@/public/house.png';

import styles from './page.module.css';

const previewItems: Array<{
  title: string;
  description: string;
  variant: 'primary' | 'secondary';
  image: StaticImageData;
}> = [
  {
    description:
      'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
    title: 'Квартиры',
    variant: 'primary',
    image: ApartmentsImg,
  },
  {
    description:
      'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
    title: 'Дома и участки',
    variant: 'secondary',
    image: HouseImg,
  },
  {
    description:
      'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
    title: 'Коммерческая недвижимость',
    variant: 'primary',
    image: CommercialImg,
  },
];

export default function Home() {
  return (
    <>
      <section className={styles.welcomeSection}>
        <div className={styles.descriptionWrapper}>
          <h1 className={styles.pageTitle}>Продать\купить\снять?</h1>
          <p className={styles.pageDescription}>С нами это как легкая прогулка</p>
        </div>
        {/* //place for form */}
      </section>
      <section className={clsx('container', styles.categories)}>
        {previewItems.map(({ description, image, title, variant }, i) => (
          <CategoryPreview
            description={description}
            image={image}
            title={title}
            variant={variant}
            key={i}
          />
        ))}
      </section>
    </>
    // <Loader />
  );
}
