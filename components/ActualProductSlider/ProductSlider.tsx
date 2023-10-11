'use client';

import React from 'react';
import Slider, { Settings } from 'react-slick';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/services/actualProducts';

import './ProductSlider.css';

import 'slick-carousel/slick/slick.css';

const settings: Settings = {
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
  lazyLoad: 'progressive',
  swipeToSlide: true,
  swipe: true,
};

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  return (
    <Slider {...settings}>
      {products.map((product) => (
        // TODO add uid for products
        <ProductCard product={product} key={product.productId + product.address} />
      ))}
    </Slider>
  );
};

export default ProductSlider;
