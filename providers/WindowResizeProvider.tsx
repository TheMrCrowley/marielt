'use client';

import React, { PropsWithChildren } from 'react';

import { useWindowResizeEventDispatcher } from '@/helpers/useWindowResizeEventDispatcher';

const WindowResizeProvider = ({ children }: PropsWithChildren) => {
  useWindowResizeEventDispatcher();

  return <>{children}</>;
};

export default WindowResizeProvider;
