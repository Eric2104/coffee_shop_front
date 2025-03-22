import CarouselTextbanner from '@/components/carousel-text-banner'
import React from 'react'
import FeatureProducts from "@/components/feature-products";
import BannerDiscount from '@/components/bannerDiscount';
import ChooseCategory from '@/components/choose-category';
import BannerProduct from '@/components/bannerProduct';

export default function page() {
  return (
    <main>
      <CarouselTextbanner/> {/* Estatico  */}
      <FeatureProducts/>
      <BannerDiscount/> {/* Estatico  */}
      <ChooseCategory/>
      <BannerProduct/>{/* Estatico  */}
      
    </main>
  )
}
