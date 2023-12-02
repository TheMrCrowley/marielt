import clsx from 'clsx';

const SliderButton = ({
  buttonType,
  sliderClassName,
  className,
}: {
  buttonType: 'next' | 'prev';
  sliderClassName: string;
  className?: string;
}) => {
  const renderButton = () => {
    return (
      <button
        className={clsx(
          sliderClassName,
          buttonType === 'prev' ? 'left-0' : 'right-0',
          'absolute',
          'md:w-20',
          'w-12',
          'h-full',
          'z-50',
          'top-0',
          'flex',
          'justify-center',
          'items-center',
          'stroke-secondary',
          'transition-all',
          'hover:cursor-pointer',
          'bg-white',
          'hover:bg-opacity-25',
          className,
        )}
      >
        {buttonType === 'prev' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
          >
            <g clipPath="url(#clip0_566_5002)">
              <path
                d="M18.002 2.57153L2.57338 18.0001L18.002 33.4287"
                strokeWidth="2.57143"
                strokeLinecap="square"
              />
            </g>
            <defs>
              <clipPath id="clip0_566_5002">
                <rect
                  width="36"
                  height="20.5714"
                  fill="white"
                  transform="translate(20.5723) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
          >
            <g clipPath="url(#clip0_566_5006)">
              <path
                d="M2.57031 2.57153L17.9989 18.0001L2.57031 33.4287"
                strokeWidth="2.57143"
                strokeLinecap="square"
              />
            </g>
            <defs>
              <clipPath id="clip0_566_5006">
                <rect
                  width="36"
                  height="20.5714"
                  fill="white"
                  transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
    );
  };

  return renderButton();
};

export default SliderButton;
