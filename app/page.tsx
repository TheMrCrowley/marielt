import clsx from 'clsx';

import ActualPreview from '@/components/ActualPreview/ActualPreview';

import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.welcomeSection}>
        <div className={styles.descriptionWrapper}>
          <h1 className={styles.pageTitle}>Продать\купить\снять?</h1>
          <p className={styles.pageDescription}>С нами это как легкая прогулка</p>
        </div>
        {/*TODO //place for form */}
      </section>
      <section className={clsx(styles.categories)}>
        <ActualPreview type="flats" />
        <ActualPreview type="commercial" />
        <ActualPreview type="house" />
      </section>
    </>
  );
}
