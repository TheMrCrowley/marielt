import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useDisableScroll } from '@/src/hooks/useDisableScroll';

const Portal = ({ children }: PropsWithChildren) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  useDisableScroll();

  return createPortal(children, container);
};

export default Portal;
