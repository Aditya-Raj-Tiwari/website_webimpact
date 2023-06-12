<script setup>
import bwdwLogo from '../assets/images/ranking-bwdw.png'
import iBusinessLogo from '../assets/images/ranking-ibusiness.png'
import plentyIcon from '../assets/images/plenty_icon.png'
import { initFlowbite } from 'flowbite'
import { ref, onMounted } from 'vue'

const loaded = ref(false)
onMounted(() => {
  loaded.value = true
  initFlowbite()
})
</script>

<template>
  <div class="slider-wrapper flex justify-between" data-carousel="slide">
    <div class="ranking-wrapper flex ml-2 grid-cols-4" data-carousel-item>
      <div class="flex justify-center items-center">
        <div class="ranking-img-wrapper w-2/4 h-2/4 shadow-xl">
          <img class="p-1" :src="bwdwLogo" alt="ranking_bwdw" />
        </div>
      </div>
      <div class="p-2 flex-column align-center">
        <div class="text-rankingTextGrey font-bold">Platz 155 im Agentur Ranking (2021)</div>
        <div class="text-rankingTextGrey font-medium">im BVDW dt. Internet Agentur Ranking</div>
      </div>
    </div>
    <div class="ranking-wrapper flex grid-cols-4" data-carousel-item>
      <div class="flex justify-center items-center">
        <div class="ranking-img-wrapper">
          <img class="p-1 ranking-shadow" :src="iBusinessLogo" alt="ranking_bwdw" />
        </div>
      </div>
      <div class="p-2 flex-column align-center">
        <div class="text-rankingTextGrey font-bold">Stärkstes Umsatzwachstum (2022)</div>
        <div class="text-rankingTextGrey font-medium">im iBusiness Agentur Branchenreport</div>
      </div>
    </div>
    <div class="ranking-wrapper flex me-4 grid-cols-4" data-carousel-item>
      <div class="flex justify-center items-center">
        <div class="ranking-img-wrapper w-2/4 h-2/4 plenty-icon">
          <img class="p-1" :src="plentyIcon" alt="ranking_bwdw" />
        </div>
      </div>
      <div class="p-2 flex-column align-center">
        <div class="text-rankingTextGrey font-bold">Platz 2 im Partner Ranking</div>
        <div class="text-rankingTextGrey font-medium">nach Kundenumsatzes</div>
      </div>
    </div>
  </div>
</template>
