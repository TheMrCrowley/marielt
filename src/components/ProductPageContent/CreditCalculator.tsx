'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import BankIcon from '@/public/bank-icon.svg';
import InfoIcon from '@/public/info-icon.svg';
import CreditInput from '@/src/components/ProductPageContent/CreditInput';
import Button from '@/src/components/common/Button/Button';
import InputWrapper from '@/src/components/common/InputWrapper/InputWrapper';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';
import { convertToBYN, getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

const CreditCalculator = ({
  price,
  initialCurrency,
  rate,
}: {
  rate: number;
  price: number;
  initialCurrency: AvailableCurrencies;
}) => {
  const { rates } = useCurrency();
  const [initialFeeValue, setInitialFeeValue] = useState<string>(
    `${Math.round(convertToBYN(price, initialCurrency || 'USD', rates) / 2)}`,
  );
  const [loanTermValue, setLoanTermValue] = useState<string>('20');
  const [loanAmount, setLoanAmount] = useState<number>(
    Math.round(convertToBYN(price, initialCurrency || 'USD', rates)) - +initialFeeValue,
  );
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  const calculateMonthlyPayment = () => {
    setMonthlyPayment(
      +(+loanAmount / (+loanTermValue * 12) + +loanAmount * (rate / 12 / 100)).toFixed(2),
    );
    setInterestRate(rate / 12);
  };

  const calculateLoanAmount = (val: string) => {
    setInitialFeeValue(val.replace(/[^\d]/, ''));
    setLoanAmount(Math.round(convertToBYN(price, initialCurrency || 'USD', rates)) - +val);
    if (+val > Math.round(convertToBYN(price, initialCurrency || 'USD', rates))) {
      setInitialFeeValue(`${Math.round(convertToBYN(price, initialCurrency || 'USD', rates))}`);
      setLoanAmount(0);
    }
  };

  return (
    <div className={clsx('flex', 'flex-col', 'bg-[#262626]')}>
      <Title
        variant="h2"
        fontSize={24}
        fontWeight="medium"
        className={clsx('lg:p-7', 'p-5', 'border-b', 'border-[#ffffff1a]')}
      >
        Кредитный калькулятор
      </Title>
      <div className={clsx('flex', 'lg:flex-row', 'flex-col')}>
        <div
          className={clsx(
            'flex',
            'flex-col',
            'lg:border-r',
            'border-b',
            'border-[#ffffff1a]',
            'lg:p-7',
            'p-5',
            'gap-y-12',
            'lg:w-[30%]',
            'w-full',
          )}
        >
          <div>
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Стоимость квартиры
            </Typography>
            <Typography fontSize={36} fontWeight="medium">
              {getPriceByCurrencyMonetary(price, initialCurrency, 'BYN', rates)}
            </Typography>
          </div>
          <div className={clsx('flex', 'flex-col', 'gap-y-8', 'w-full')}>
            <div className={clsx('flex', 'flex-col', 'gap-y-5')}>
              {/* <CreditInput
                setValue={setInitialFeeValue}
                value={initialFeeValue}
                placeholder="0"
                labelText="Первоначальный взнос"
                rightUnits="byn"
              /> */}
              <InputWrapper label="Первоначальный взнос">
                <div className={clsx('relative')}>
                  {/*TODO: add validation*/}
                  <input
                    value={initialFeeValue}
                    onChange={(e) => {
                      calculateLoanAmount(e.target.value);
                    }}
                    placeholder="0"
                    className={clsx(
                      'w-full',
                      'text-2xl',
                      'border-b',
                      'border-secondary',
                      'text-secondary',
                    )}
                  />
                  <Typography
                    className={clsx(
                      'absolute',
                      'right-0',
                      'z-10',
                      'uppercase',
                      'top-1/2',
                      '-translate-y-1/2',
                      'pointer-events-none',
                    )}
                    fontWeight="medium"
                    fontSize={24}
                    color="text-secondary"
                  >
                    BYN
                  </Typography>
                </div>
              </InputWrapper>
              <CreditInput
                value={loanTermValue}
                setValue={setLoanTermValue}
                placeholder="0"
                labelText="Срок кредита"
                rightUnits="лет"
              />
            </div>
            <Button onClick={calculateMonthlyPayment}>Рассчитать</Button>
          </div>
          <div>
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Сумма кредита
            </Typography>
            <Typography fontWeight="medium" color="text-secondary" fontSize={36}>
              {loanAmount} BYN
            </Typography>
          </div>
        </div>
        <div
          className={clsx('flex', 'flex-col', 'py-7', 'lg:px-12', 'px-5', 'lg:w-[70%]', 'w-full')}
        >
          <div className={clsx('flex', 'gap-x-2', 'lg:mb-24', 'mb-16')}>
            <Image alt="bank" src={BankIcon} />
            <Typography fontSize={36} fontWeight="medium">
              Беларусбанк
            </Typography>
          </div>
          <div className={clsx('flex', 'lg:gap-x-32', 'gap-x-16', 'self-center', 'mb-3')}>
            <div className={clsx('flex', 'flex-col', 'justify-center', 'gap-y-1', 'items-center')}>
              <Typography className={clsx('text-center')} fontSize={36} fontWeight="medium">
                от {interestRate} %
              </Typography>
              <Typography className={clsx('text-center')} fontSize={16} fontWeight="medium">
                Первоначальная ставка
              </Typography>
            </div>
            <div className={clsx('flex', 'flex-col', 'justify-center', 'gap-y-1', 'items-center')}>
              <Typography fontSize={36} fontWeight="medium" className={clsx('text-center')}>
                {monthlyPayment} BYN
              </Typography>
              <Typography className={clsx('text-center')} fontSize={16} fontWeight="medium">
                Ежемесячный платёж
              </Typography>
            </div>
          </div>

          <Typography
            color="text-[#B1B1B1]"
            fontSize={14}
            className={clsx(
              'opacity-50',
              'self-center',
              'lg:mb-20',
              'mb-12',
              'max-w-xl',
              'text-center',
            )}
          >
            Для расчтета Первоначальной ставки и Ежемесячного платежа - введите необходимые
            параметры в калькуляторе
          </Typography>
          <div
            className={clsx(
              'flex',
              'sm:flex-row',
              'flex-col',
              'justify-center',
              'items-center',
              'gap-y-2',
              'gap-x-5',
              'bg-[#3D3D3D]',
              'sm:px-5',
              'px-2',
              'py-7',
              'lg:max-w-[740px]',
              'w-full',

              'sm:text-left',
              'text-center',
            )}
          >
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
