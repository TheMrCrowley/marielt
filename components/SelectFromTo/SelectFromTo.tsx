// 'use client';

// import clsx from 'clsx';
// import React, { useMemo } from 'react';

// import InputWrapper from '@/components/InputWrapper';
// import Select from '@/components/Select';
// import { OptionType } from '@/types/Option';

// interface SelectFromToProps {
//   label: string;
//   options: OptionType[];
//   fromValue: string;
//   toValue: string;
//   onChangeFrom: (value: string) => void;
//   onChangeTo: (value: string) => void;
// }

// const SelectFromTo = ({
//   label,
//   options,
//   fromValue,
//   onChangeFrom,
//   onChangeTo,
//   toValue,
// }: SelectFromToProps) => {
//   const filteredOptions = useMemo<{ fromOptions: OptionType[]; toOptions: OptionType[] }>(() => {
//     const fromOptions = options.filter((option, id) => {
//       if (toValue) {
//         const toIndex = options.findIndex((item) => item.value === toValue);
//         return id < toIndex;
//       }
//       return true;
//     });

//     const toOptions = options.filter((option, id) => {
//       if (fromValue) {
//         const fromIndex = options.findIndex((item) => item.value === fromValue);
//         return id > fromIndex;
//       }
//       return true;
//     });
//     return {
//       fromOptions,
//       toOptions,
//     };
//   }, [fromValue, toValue]);

//   return (
//     <InputWrapper label={label}>
//       <div className={clsx('flex', 'gap-x-1', 'items-center')}>
//         <Select
//           onChange={(selected) => onChangeFrom(selected[0])}
//           options={filteredOptions.fromOptions}
//           placeholder="От"
//         />
//         <Select
//           onChange={(selected) => onChangeTo(selected[0])}
//           options={filteredOptions.toOptions}
//           placeholder="До"
//         />
//       </div>
//     </InputWrapper>
//   );
// };

// export default SelectFromTo;
