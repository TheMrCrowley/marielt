'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import CheckBoxIcon from '@/public/CardChecklist.svg';
import ArrowIcon from '@/public/arrow-left.svg';
import CheckIcon from '@/public/check.svg';
import CrossIcon from '@/public/plus.svg';
import Button from '@/src/components/common/Button';
import Portal from '@/src/components/common/Portal';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';

const testQuestions: Array<{
  question: string;
  answer: 'Да' | 'Нет' | null;
}> = [
  { question: 'Нравится ли вам общаться с людьми? ', answer: null },
  { question: 'Хотите ли вы планировать свой рабочий день и отпуск самостоятельно?', answer: null },
  { question: 'Хотите ли самостоятельно влиять на свой доход?', answer: null },
  { question: 'Любите ли вы обучаться и узнавать что-то новое?', answer: null },
  { question: 'Умеете ли вы работать в команде? (если нет, то мы научим)', answer: null },
  { question: 'Считаете ли вы себя порядочным человеком?', answer: null },
  { question: 'Вы себя считаете дисциплинированным?', answer: null },
  { question: 'Нравится ли вам деловой стиль одежды?', answer: null },
  { question: 'Интересна ли вам работа в сфере с возможностью высокого заработка?', answer: null },
  { question: 'Любите ли вы помогать людям?', answer: null },
];

const TEST_MIN_PERCENT = 0.7;

const TestCheckbox = ({
  currentAnswer,
  onNoClick,
  onYesClick,
}: {
  currentAnswer: (typeof testQuestions)[number]['answer'];
  onYesClick: () => void;
  onNoClick: () => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <label
        onClick={onYesClick}
        className="flex gap-2 justify-center items-center hover:cursor-pointer"
      >
        <div
          className={clsx(
            'w-7',
            'h-7',
            'border',
            'border-[#B1B1B1]',
            'rounded-full',
            currentAnswer === 'Да' && 'bg-secondary',
            'flex',
            'justify-center',
            'items-center',
          )}
        >
          {currentAnswer === 'Да' && <Image src={CheckIcon} alt="check-icon-yes" />}
        </div>
        <input type="checkbox" checked={currentAnswer === 'Да'} className="hidden" readOnly />
        <Typography>Да</Typography>
      </label>
      <label
        onClick={onNoClick}
        className="flex gap-2 justify-center items-center hover:cursor-pointer"
      >
        <div
          className={clsx(
            'w-7',
            'h-7',
            'border',
            'border-[#B1B1B1]',
            'rounded-full',
            currentAnswer === 'Нет' && 'bg-secondary',
            'flex',
            'justify-center',
            'items-center',
          )}
        >
          {currentAnswer === 'Нет' && <Image src={CheckIcon} alt="check-icon-no" />}
        </div>
        <input type="checkbox" checked={currentAnswer === 'Нет'} className="hidden" readOnly />
        <Typography>Нет</Typography>
      </label>
    </div>
  );
};

const AgentTestContent = ({ onClose }: { onClose: () => void }) => {
  const [questions, setQuestions] = useState<
    Array<{
      question: string;
      answer: 'Да' | 'Нет' | null;
    }>
  >(testQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const [currentAnswer, setCurrentAnswer] = useState<(typeof questions)[number]['answer']>(null);

  useEffect(() => {
    if (currentQuestion >= 0 && currentQuestion < questions.length) {
      setCurrentAnswer(questions[currentQuestion].answer);
    }
  }, [currentQuestion]);

  const handleBackClick = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNextClick = () => {
    setQuestions(
      questions.map((item, i) => {
        if (currentQuestion === i) {
          return { ...item, answer: currentAnswer };
        }
        return item;
      }),
    );

    setCurrentQuestion(currentQuestion + 1);
  };

  const renderTest = () => {
    return (
      <>
        <Title fontSize={48}>Тест</Title>

        <div className="flex-auto w-full flex flex-col gap-8 justify-center items-center h-full">
          <Typography fontSize={24} color="text-[#B1B1B1]">
            Вопрос №{currentQuestion + 1}
          </Typography>
          <Typography fontSize={32} fontWeight="medium" className="text-center">
            {questions[currentQuestion].question}
          </Typography>
          <TestCheckbox
            currentAnswer={currentAnswer}
            onYesClick={() => setCurrentAnswer('Да')}
            onNoClick={() => setCurrentAnswer('Нет')}
          />

          <Button
            onClick={handleNextClick}
            disabled={!currentAnswer}
            className="disabled:opacity-50"
          >
            Далее
          </Button>
        </div>
        {currentQuestion > 0 && (
          <button
            onClick={handleBackClick}
            className="absolute bottom-4 left-4 flex gap-4 justify-center items-center"
          >
            <Image src={ArrowIcon} alt="arrow-back" />
            <Typography fontWeight="medium" color="text-[#B1B1B1]">
              Назад
            </Typography>
          </button>
        )}
        <Typography
          fontWeight="medium"
          color="text-[#B1B1B1]"
          className="absolute bottom-4 right-4"
        >
          {currentQuestion + 1} из {questions.length}
        </Typography>
      </>
    );
  };

  const renderResults = () => {
    const yesAnswers = questions.filter((question) => question.answer === 'Да').length;

    const isPassed = yesAnswers > 0 && questions.length / yesAnswers >= TEST_MIN_PERCENT;

    return (
      <>
        <Title fontSize={48}>Результат</Title>
        <div className="flex-auto w-full flex flex-col gap-8 justify-center items-center h-full">
          <Typography
            fontSize={128}
            fontWeight="medium"
            color="text-secondary"
            className="text-center"
          >
            70%
          </Typography>
          <Typography fontSize={24} color="text-[#B1B1B1]" className="text-center">
            Вы на 70% соответствуете требованиям стать агентом
          </Typography>
          {isPassed ? (
            <>
              <Typography fontSize={32} fontWeight="medium" className="text-center">
                Поздравляю, вы подходите для знакомства с компанией
              </Typography>
              <Typography fontSize={24} fontWeight="light" className="text-center">
                оставьте свои контакты, с вами свяжутся наши HR менеджеры
              </Typography>
              <Button onClick={onClose}>Оставить контакты</Button>
            </>
          ) : (
            <>
              <Typography fontSize={32} fontWeight="medium">
                Хотите повысить % соответствия на должность агента?
              </Typography>
              <Typography fontSize={24} fontWeight="light" className="text-center">
                Ознакомьтесь с обучением в{' '}
                <Link href={AppRoutes.Academy} className="text-secondary" prefetch>
                  Академии Мариэлт
                </Link>
              </Typography>
              <Button onClick={onClose}>Оставить контакты</Button>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <section className="w-full flex flex-col items-center flex-auto relative">
      {currentQuestion < questions.length && renderTest()}
      {currentQuestion >= questions.length && renderResults()}
    </section>
  );
};

const AgentTestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={clsx(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'lg:p-9',
          'md:p-4',
          'p-0',
          'box-border',
          'z-50',
          'flex',
          'justify-center',
          'items-center',
          'bg-[#00000099]',
          'backdrop-blur-sm',
        )}
        role="dialog"
      >
        <div
          className={clsx(
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'cursor-pointer',
            'bg-[#00000099]',
            'z-0',
          )}
          onClick={onClose}
          role="button"
        />
        <div
          className={clsx(
            'flex',
            'bg-primary-bold',
            'md:max-w-[1620px]',
            'w-full',
            'relative',
            'z-10',
            'flex-auto',
            'h-full',
            'overflow-hidden',
            'lg:py-12',
            'py-6',
            'lg:px-20',
            'px-0',
            'bg-[url(/modal-bg.png)]',
          )}
        >
          <button
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'absolute',
              'md:top-6',
              'md:right-6',
              'top-9',
              'right-4',
              'z-50',
            )}
            onClick={onClose}
          >
            <Image
              src={CrossIcon}
              alt="close-icon"
              className={clsx('md:w-8', 'md:h-8', 'w-4', 'h-4')}
            />
          </button>
          <section
            className={clsx(
              'flex',
              'flex-col',
              'w-full',
              'justify-start',
              'overflow-y-auto',
              'gap-y-10',
              'px-4',
              'scrollbar-thin',
              'scrollbar-thumb-primary',
              'scrollbar-track-secondary',
            )}
          >
            <AgentTestContent onClose={onClose} />
          </section>
        </div>
      </div>
    </Portal>
  );
};

const AgentTest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className={clsx('flex', 'flex-col', 'gap-4', 'max-w-max')}>
        <div className="flex gap-4 items-center">
          <Image src={CheckBoxIcon} alt="checkbox" />
          <div className="flex flex-col">
            <Title fontSize={24}>Пройди тест</Title>
            <Typography fontSize={16} color="text-[#B1B1B1]">
              и узнай на сколько ты агент
            </Typography>
          </div>
        </div>
        <Button
          buttonType="bordered"
          className="border-white text-white"
          onClick={() => setIsOpen(true)}
        >
          Начать
        </Button>
      </div>
      <AgentTestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AgentTest;
