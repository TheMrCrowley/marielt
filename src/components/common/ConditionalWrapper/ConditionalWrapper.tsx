import React, { PropsWithChildren } from 'react';

interface ConditionalWrapperProps extends PropsWithChildren {
  condition: boolean;
}

const ConditionalWrapper = ({ condition, children }: ConditionalWrapperProps) => {
  if (!condition) {
    return null;
  }

  return <>{children}</>;
};

export default ConditionalWrapper;
