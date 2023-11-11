import clsx from 'clsx';

export interface OptionItemProps {
  isSelected: boolean;
  onClick: (value: string) => void;
  value: string;
  label: string;
  disabled?: boolean;
}

const Option = ({ label, onClick, value, isSelected, disabled }: OptionItemProps) => {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        if (!disabled) {
          onClick(value);
        }
      }}
      className={clsx(
        'max-w-full',
        'break-all',
        'px-2',
        'py-2',
        'border-solid',
        'border-b',
        'text-base',
        !isSelected && !disabled && 'text-white',
        !disabled && 'hover:bg-secondary',
        !disabled && 'hover:text-black',
        !disabled && 'hover: text-black',
        isSelected && 'bg-secondary',
        isSelected && 'text-black',
        disabled && 'bg-[#d9d9d9]',
        disabled && 'text-black',
        disabled && 'cursor-default',
        'first-letter:uppercase',
      )}
    >
      {label}
    </div>
  );
};

export default Option;
