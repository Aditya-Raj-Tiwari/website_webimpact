<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

import bwdwLogo from '../../assets/images/ranking-bwdw.png'
import iBusinessLogo from '../../assets/images/ranking-ibusiness.png'
import plentyIcon from '../../assets/images/plenty_icon.png'
</script>


<template>
  <Swiper
    :slidesPerView="2.3"
    :spaceBetween="10"
    on-navigation-hide="true"
    class="mySwiper-agentur py-6"
    :loop="true"
    :autoplay="{ delay: 2000 }"
  >
    <SwiperSlide>
      <div class="flex items-center">
        <img class="w-24 h-12 object-contain p-1" :src="bwdwLogo" alt="ranking_bwdw" />
        <div class="content-wrap">
          <div class="text-gray-500 font-bold">Platz 155 im Agentur Ranking (2021)</div>
          <div class="text-gray-500">im BVDW dt. Internet Agentur Ranking</div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="flex items-center">
        <img class="w-24 h-12 object-contain p-1" :src="iBusinessLogo" alt="ranking_iBusiness" />
        <div class="content-wrap">
          <div class="text-gray-500 font-bold">Stärkstes Umsatzwachstum (2022)</div>
          <div class="text-gray-500">im iBusiness Agentur Branchenreport</div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="flex items-center">
        <img class="w-24 h-12 object-contain p-1" :src="plentyIcon" alt="ranking_plenty" />
        <div class="content-wrap">
          <div class="text-gray-500 font-bold">Platz 2 im Partner Ranking</div>
          <div class="text-gray-500">nach Kundenumsatzes</div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>



<style lang="scss">
@import 'swiper/swiper-bundle.css';

.mySwiper-agentur .swiper-wrapper {
}
.mySwiper-agentur {
  &.swiper {
    padding-left: 3%;
    border: 1px solid #e2e7eb;
    height: 140px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20%;
      height: 100%;
      background: linear-gradient(to left, white, transparent);
      z-index: 2;
    }
    .swiper-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      margin-left: 90px;
      position: relative;

      .swiper-slide {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        color: #97a1ad !important;
        height: 100%;

        & > div {
          height: 100%;
        }
      }
    }
  }
}
</style>
