'use client';

import React, { PropsWithChildren } from 'react';

import { useWindowResizeEventDispatcher } from '@/src/hooks/useWindowResizeEventDispatcher';

const WindowResizeProvider = ({ children }: PropsWithChildren) => {
  useWindowResizeEventDispatcher();

  return <>{children}</>;
};

export default WindowResizeProvider;
