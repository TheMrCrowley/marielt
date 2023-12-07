'use client';

import { useEffect } from 'react';

import { handlePageViews } from '@/src/services/localStorageServices';
import { ProductType } from '@/src/types/Product';

type ProductViewsHandlerProps = {
  type: ProductType;
  id: string;
};

const ProductViewsHandler = ({ id, type }: ProductViewsHandlerProps) => {
  useEffect(() => {
    handlePageViews(type, id);
  }, []);

  return null;
};

export default ProductViewsHandler;
