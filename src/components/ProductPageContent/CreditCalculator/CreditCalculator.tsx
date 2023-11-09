import clsx from 'clsx';
import Image from 'next/image';

import BankIcon from '@/public/bank-icon.svg';
import InfoIcon from '@/public/info-icon.svg';
import Button from '@/src/components/common/Button/Button';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

import CreditInput from './CreditInput';

const CreditCalculator = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'bg-[#262626]')}>
      <Title
        variant="h2"
        fontSize={24}
        fontWeight="medium"
        className={clsx('p-7', 'border-b', 'border-[#ffffff1a]')}
      >
        Кредитный калькулятор
      </Title>
      <div className={clsx('flex')}>
        <div
          className={clsx(
            'flex',
            'flex-col',
            'border-r',
            'border-[#ffffff1a]',
            'p-7',
            'gap-y-12',
            'w-[30%]',
          )}
        >
          <div>
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Стоимость квартиры
            </Typography>
            <Typography fontSize={36} fontWeight="medium">
              70 546 USD
            </Typography>
          </div>
          <div className={clsx('flex', 'flex-col', 'gap-y-8', 'max-w-xs', 'self-center')}>
            <div className={clsx('flex', 'flex-col', 'gap-y-5')}>
              <CreditInput placeholder="1000" labelText="Первоначальный взнос" rightUnits="usd" />
              <CreditInput placeholder="20" labelText="Срок кредита" rightUnits="лет" />
            </div>
            <Button>Рассчитать</Button>
          </div>
          <div>
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Сумма кредита
            </Typography>
            <Typography fontWeight="medium" color="text-secondary" fontSize={36}>
              35 273 USD
            </Typography>
          </div>
        </div>
        <div className={clsx('flex', 'flex-col', 'py-7', 'px-12', 'w-[70%]')}>
          <div className={clsx('flex', 'gap-x-2', 'mb-24')}>
            <Image alt="bank" src={BankIcon} />
            <Typography fontSize={36} fontWeight="medium">
              Беларусбанк
            </Typography>
          </div>
          <div className={clsx('flex', 'gap-x-32', 'self-center', 'mb-3')}>
            <div className={clsx('flex', 'flex-col', 'justify-center', 'gap-y-1', 'items-center')}>
              <Typography className={clsx('text-center')} fontSize={36} fontWeight="medium">
                от 0 %
              </Typography>
              <Typography className={clsx('text-center')} fontSize={16} fontWeight="medium">
                Первоначальная ставка
              </Typography>
            </div>
            <div className={clsx('flex', 'flex-col', 'justify-center', 'gap-y-1', 'items-center')}>
              <Typography fontSize={36} fontWeight="medium" className={clsx('text-center')}>
                0 BYN
              </Typography>
              <Typography className={clsx('text-center')} fontSize={16} fontWeight="medium">
                Ежемесячный платёж
              </Typography>
            </div>
          </div>

          <Typography
            color="text-[#B1B1B1]"
            fontSize={14}
            className={clsx('opacity-50', 'self-center', 'mb-20', 'max-w-xl', 'text-center')}
          >
            Для расчтета Первоначальной ставки и Ежемесячного платежа - введите необходимые
            параметры в калькуляторе
          </Typography>
          <div className={clsx('flex', 'gap-x-5', 'bg-[#3D3D3D]', 'px-5', 'py-7', 'max-w-[740px]')}>
            <Image alt="info" src={InfoIcon} />
            <Typography color="text-[#B8B8B8]" fontSize={14}>
              Расчет проведен по программе “Ипотека экспресс” от Беларусбанка. Компания Мариэлт
              официальный партнер Беларусбанка - вы можете оформить кредит на квартиру прямо в нашем
              офисе. *Расчет является предварительным, точную информацию узнавайте у специалистов
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCalculator;
