<template>
  <div class="customers-container" ref="customersContainer">
    <h1 class="title">Betreute Unternehmen</h1>
    <div class="logos-container" ref="logosContainer">
      <div
        v-for="(logo, index) in logos"
        :key="index"
        class="logo"
        :style="{ backgroundImage: `url(${logo})` }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      ></div>
      <div class="fade-effect" ref="fadeEffect"></div>
    </div>
    <button class="show-all-button" ref="showAllButton" @click="toggle">Alle anzeigen</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const logosContainer = ref(null)
const fadeEffect = ref(null)
const showAllButton = ref(null)
const customersContainer = ref(null)

const getImageUrl = (name) => {
  return new URL(`../../assets/images/company/${name}`, import.meta.url).href
}

const logos = [
  getImageUrl('Referenz-1.png'),
  getImageUrl('Referenz-2.png'),
  getImageUrl('Referenz-3.png'),
  getImageUrl('Referenz-4.png'),
  getImageUrl('Referenz-5.png'),
  getImageUrl('Referenz-6.png'),
  getImageUrl('Referenz-7.png'),
  getImageUrl('Referenz-8.png'),
  getImageUrl('Referenz-9.png'),
  getImageUrl('Referenz-10.png'),
  getImageUrl('Referenz-11.png'),
  getImageUrl('Referenz-12.png'),
  getImageUrl('Referenz-13.png'),
  getImageUrl('Referenz-14.png'),
  getImageUrl('Referenz-15.png'),
  getImageUrl('Referenz-16.png'),
  getImageUrl('Referenz-17.png'),
  getImageUrl('Referenz-18.png'),
  getImageUrl('Referenz-19.png'),
  getImageUrl('Referenz-20.png')
]

let tl

onMounted(() => {
  tl = gsap
    .timeline({ reversed: true, paused: true })
    .set(showAllButton.value, { autoAlpha: 1 })
    .to(logosContainer.value, { height: '100%', duration: 1.5 })
    .from('.logo', { autoAlpha: 1, duration: 1 }, '-=1')
    .to(fadeEffect.value, { opacity: 0, display: 'none', duration: 1 }, '-=1')
    .to(showAllButton.value, { autoAlpha: 0, duration: 1 }, '-=1')
    .to(customersContainer.value, { height: '100vh', duration: 0.3 }, '-=1.5')
    .call(scrollToCustomers)

  function scrollToCustomers() {
    gsap.to(window, {
      scrollTo: {
        y: customersContainer.value.offsetTop,
        autoKill: false
      },
      duration: 0.3
    })
  }
})
function toggle() {
  tl.reversed() ? tl.play() : tl.reverse()
}

function handleMouseEnter(event) {
  gsap.to(event.target, {
    duration: 0.4,
    scale: 1.2,
    ease: 'power2.out'
  })
}

function handleMouseLeave(event) {
  gsap.to(event.target, {
    duration: 0.4,
    scale: 1,
    ease: 'power2.out'
  })
}
</script>



  <style lang="scss">
.customers-container {
  text-align: center;
  overflow: hidden !important;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  padding-bottom: 40px;

  h1 {
    background: -webkit-linear-gradient(180deg, #94a2ae, rgba(49, 79, 111, 0.5019607843), #314f6f);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.4rem !important;
    font-weight: 600 !important;
    margin-bottom: 60px;
  }

  .title {
    margin-bottom: 90px;
  }

  .logos-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
    height: 350px;
    overflow: hidden;
    position: relative;
  }

  .logo {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 80px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      filter: brightness(140%);
    }
  }

  .fade-effect {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 100%;
    height: 280px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    z-index: 1;
  }

  .show-all-button {
    padding: 10px 20px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 12px 0 rgba(209, 210, 215, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 200px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
}
</style>
  