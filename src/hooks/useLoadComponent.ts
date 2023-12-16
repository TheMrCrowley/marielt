import { Dispatch, SetStateAction, useState, useEffect } from 'react';

export type LoadFunctionType = (
  setComponent: Dispatch<SetStateAction<JSX.Element | null>>,
) => Promise<void>;

export const useLoadComponent = (loadFunction: LoadFunctionType) => {
  const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);
  const [component, setComponent] = useState<React.JSX.Element | null>(null);

  useEffect(() => {
    loadFunction(setComponent);
  }, []);

  useEffect(() => {
    if (component) {
      setIsComponentLoaded(true);
    }
  }, [component]);

  return {
    isLoaded: isComponentLoaded,
    component,
  };
};
