import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.removeChild(container);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return createPortal(children, container);
};

export default Portal;
