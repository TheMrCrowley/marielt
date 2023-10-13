import clsx from 'clsx';

import LeaveApplicationSection from '@/components/LeaveApplicationSection';
import ProductPreview from '@/components/ProductPreview';
import { getHomePageData } from '@/services/homePage';
import { WelcomeSectionItem } from '@/types/HomePage';

import styles from './page.module.css';

const WelcomeSection = ({ data }: { data: WelcomeSectionItem }) => {
  const { title, description, image } = data;

  return (
    <section className={styles.welcomeSection} style={{ backgroundImage: `url(${image.src})` }}>
      <div className={styles.descriptionWrapper}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageDescription}>{description}</p>
      </div>
      {/*TODO //place for form */}
    </section>
  );
};

const Home = async () => {
  const { opportunityItems, productItems, welcomeSectionItem } = await getHomePageData();

  return (
    <>
      <WelcomeSection data={welcomeSectionItem} />
      <section className={clsx(styles.products)}>
        {productItems.map((item) => (
          <ProductPreview key={item.to} data={item} />
        ))}
      </section>
      <LeaveApplicationSection />
    </>
  );
};

export default Home;
