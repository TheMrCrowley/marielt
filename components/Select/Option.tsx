import clsx from 'clsx';

interface OptionItemProps {
  isSelected: boolean;
  onClick: (value: string) => void;
  value: string;
  label: string;
}

const Option = ({ label, onClick, value, isSelected }: OptionItemProps) => {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onClick(value);
      }}
      className={clsx(
        'px-4',
        'py-2',
        'border-solid',
        'border-b',
        'text-[20px]',
        'text-white',
        'hover:cursor-pointer',
        'hover:bg-secondary',
        'hover:text-black',
        'hover: text-black',
        isSelected && 'bg-secondary',
        isSelected && 'text-black',
      )}
    >
      {label}
    </div>
  );
};

export default Option;
