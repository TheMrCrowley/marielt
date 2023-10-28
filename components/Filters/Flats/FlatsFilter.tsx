import React, { useState } from 'react';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

const FlatsFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <DefaultFilters openModal={() => setIsModalOpen(true)} />
      <ExpandedFilters closeModal={() => setIsModalOpen(false)} isModalOpen={isModalOpen} />
    </>
  );
};

export default React.memo(FlatsFilter);
