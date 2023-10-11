import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import ContactItem from '@/components/ContactItem';
import Title from '@/components/Title';
import Typography from '@/components/Typography';
import RatingImg from '@/public/footer_rating.png';
import InstagramIcon from '@/public/instagram.svg';
import Logo from '@/public/logo.svg';
import WeOnRealtImg from '@/public/realt.png';
import TelegramIcon from '@/public/telegram.svg';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={clsx(styles.footerContentItem, styles.footerDescription)}>
            <Image src={Logo} alt="logo" />
            <div>
              <Typography fontSize={16}>
                Lorem ipsum dolor sit amet consectetur. Semper lacinia laoreet magna imperdiet eu{' '}
              </Typography>
              <Typography fontSize={16}>
                nullam et aliquet magnis. Nulla pellentesque cras suspendisse felis purus nunc nisl{' '}
              </Typography>
              <Typography fontSize={16}>
                placerat. Aenean tempus morbi et ipsum. Sed dictum a sagittis orci{' '}
              </Typography>
            </div>
          </div>
          <div className={clsx(styles.footerContentItem, styles.footerContacts)}>
            <Title variant="h2" fontSize={36} fontWeight="bold">
              Контакты
            </Title>
            <ul className={styles.contactList}>
              <ContactItem type="phone">+375 17 322 73 22</ContactItem>
              <ContactItem type="phone">+375 29 710 20 20</ContactItem>
              <ContactItem type="email">office@marielt.by</ContactItem>
            </ul>
            <div className={styles.socialWrapper}>
              <a
                href="https://www.instagram.com/marielt_an/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={InstagramIcon} alt="instagram" />
              </a>
              {/* TODO add link to telegram */}
              <a href="" target="_blank" rel="noopener noreferrer">
                <Image src={TelegramIcon} alt="telegram" />
              </a>
            </div>
          </div>
          <div className={clsx(styles.footerContentItem, styles.footerAddresses)}>
            <Title variant="h2" fontSize={36} fontWeight="bold">
              Адрес
            </Title>
            <ul className={styles.contactList}>
              <ContactItem type="address">
                ул. Кальварийская 42, оф. 72 ст. м .Молодёжная
              </ContactItem>
              <ContactItem type="clock">Время работы: с 9:00 до 21:00</ContactItem>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className="container">
        <div className={styles.footerCopyright}>
          <Typography fontSize={16}>© 2019 «ГРУППА КОМПАНИЙ Мариэлт»</Typography>
          <div className={styles.imgWrapper}>
            <Image src={RatingImg} alt="rating-realt" />
            <Image src={WeOnRealtImg} alt="we-on-realt" />
          </div>
          <Typography fontSize={16}>VUCA - digital studio © {new Date().getFullYear()}</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
