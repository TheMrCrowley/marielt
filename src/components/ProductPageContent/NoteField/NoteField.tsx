import clsx from 'clsx';

import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

const NoteField = ({ note }: { note: string }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'bg-[#262626]',
        'px-5',
        'xl:px-24',
        'lg:px-12',
        'py-10',
        'relative',
      )}
    >
      <Title className={clsx('pb-3')} fontSize={32}>
        Примечание
      </Title>
      <Typography fontSize={16} fontWeight="light" className={clsx('leading-6')}>
        {note}
      </Typography>
    </div>
  );
};

export default NoteField;
