import React, { PropsWithChildren } from 'react';

import { useDisableScroll } from '@/src/hooks/useDisableScroll';

const WithDisabledScroll = ({ children }: PropsWithChildren) => {
  useDisableScroll();

  return <>{children}</>;
};

export default WithDisabledScroll;
