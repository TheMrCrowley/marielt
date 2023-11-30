import React, { PropsWithChildren } from 'react';

interface FullScreenSliderWrapperProps extends PropsWithChildren {
  isOpen: boolean;
}

const FullScreenSliderWrapper = ({ isOpen, children }: FullScreenSliderWrapperProps) => {
  if (!isOpen) {
    return null;
  }

  return <>{children}</>;
};

export default FullScreenSliderWrapper;
