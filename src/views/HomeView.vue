<script setup>
import homepageHeroImg from '../assets/images/temp-homepage-img.png'
import dotPatternBg from '../assets/images/dot-pattern-bg.png'
import plentysrtupCert from '../assets/images/Plentymarkets_Zertifikat.svg'
import plentysrtupCert1 from '../assets/images/Plentymarkets _Zertifikat_1.svg'
import plentysrtupCert2 from '../assets/images/Plentymarkets Zertifikat_2.svg'
import plentysrtupCert3 from '../assets/images/Plentymarkets Zertifikat_3.svg'
import plentyCertNumber from '../assets/images/Plentymarkets Zertifikat_number.svg'
import goDigitalLogo from '../assets/images/go-digital_logo.png'
import { ref, onMounted } from 'vue'

const loaded = ref(false)
onMounted(() => {
  loaded.value = true
})
</script>

<template>
  <main>
    <div class="grid grid-cols-2" :class="{ 'animate-item': loaded }">
      <div class="first-child" :class="{ 'animate-item-first-div': loaded }">
        <div class="h-[32rem] flex flex-col justify-center items-start first-sub-child">
          <h1 class="text-7xl mb-3 font-bold tracking-wider">Optimieren</h1>
          <h1 class="text-7xl mb-3 font-bold tracking-wider">Sie Ihr</h1>
          <h1 class="text-7xl mb-5 font-bold tracking-wider">Geschäft.</h1>
          <div class="hr first" :class="{ 'animate-item-hr': loaded }"></div>
          <p class="w-3/4 text-menuGrey">
            Wir helfen Ihnen Potentiale ihres eCommerce <br />
            Geschäfts zu erkennen, um Ihr System sowie Ihre <br />Prozesse effizient zu optimieren.
          </p>
          <div class="hr second" :class="{ 'animate-item-second-div': loaded }"></div>

          <button class="text-xl rounded-md text-menuHeaderGrey font-semibold">
            Jetzt Kontaktieren
          </button>
        </div>
        <div class="h-[26rem] second-sub-child flex flex-col justify-center items-center pt-0">
          <p class="text-menuGrey text-xl mb-7 pr-12">
            Vollzertifizierter plentymarkets Expert Partner
          </p>
          <div class="flex flex-row justify-center">
            <img :src="plentysrtupCert" class="w-1/5" alt="" />
            <img :src="plentysrtupCert1" class="w-1/5" alt="" />
            <img :src="plentysrtupCert2" class="w-1/5" alt="" />
            <img :src="plentysrtupCert3" class="w-1/5" alt="" />
            <img :src="plentyCertNumber" alt="" class="ml-12" />
          </div>
          <div class="beratung_section bottom-0 pr-12">
            <p class="text-menuGrey text-xl mt-9 mb-5 pb-5">Autorisierte Beratungsagentur</p>
            <img :src="goDigitalLogo" alt="godigital logo " class="w-1/7 absolute" />
          </div>
          <div class="hr first"></div>
          <div class="hr second"></div>
        </div>
      </div>

      <div class="second-child">
        <div class="h-[20rem] bg-bgMenuGridRed second-sub-child">
          <img
            class="hero"
            :class="{ 'animate-item-img-hero': loaded }"
            :src="homepageHeroImg"
            alt=""
          />

          <img :src="dotPatternBg" alt="" />
        </div>
        <div class="h-[38rem] relative">
          <img :src="dotPatternBg" alt="" :class="{ 'animate-item-second-div': loaded }" />
          <div class="hr first"></div>
          <div class="hr second"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  font-family: 'Fira Sans', sans-serif !important;
  .grid {
    h1 {
      background: -webkit-linear-gradient(180deg, #94a2ae, #314f6f80, #314f6f);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    & .first-child {
      .first-sub-child {
        position: relative;
        margin-left: 20%;

        .hr {
          width: 2px;
          height: 100%;
          display: block;
          background: #c3cfd9;
          position: absolute;

          &.first {
            left: -30px;

            &::before {
              content: '';
              width: 5px;
              height: 25%;
              display: block;
              background: #ff4d00;
              position: absolute;
              left: -1px;
              top: 5%;
            }
          }

          &.second {
            right: 53%;
            z-index: -1;
          }
        }
        button {
          padding: 10px 35px;
          position: absolute;
          bottom: -20px;
          left: 18%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      }
      .second-sub-child {
        background: rgb(255, 255, 255);
        background: linear-gradient(
          4deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 1) 39%,
          rgba(232, 238, 244, 1) 64%,
          rgba(232, 238, 244, 1) 100%
        );
      }
    }
    & .second-child {
      .second-sub-child {
        position: relative;
        img {
          width: 45%;
          position: absolute;
          top: -15px;
          left: -25%;
          z-index: 0;

          &.hero {
            min-width: 30vw !important;
            height: 58vh !important;
            object-fit: contain;
            z-index: 1;
            top: 100px;
            left: -20%;
          }
        }
      }
    }
    & > div:nth-child(2) {
      background: rgb(255, 255, 255);
      background: linear-gradient(
        4deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 39%,
        rgba(232, 238, 244, 1) 64%,
        rgba(232, 238, 244, 1) 100%
      );
      img {
        position: absolute;
        top: -70px;
      }
    }
    .hr {
      width: 2px;
      height: 100%;
      display: block;
      background: #c3cfd9;
      position: absolute;

      &.first {
        left: 20%;

        &::before {
          content: '';
          width: 5px;
          height: 25%;
          display: block;
          background: #ff4d00;
          position: absolute;
          left: -1px;
          top: 5%;
        }
      }

      &.second {
        right: 10%;
      }
    }
  }
}

/* Animation styles */
.animate-item {
  animation: itemEnter 0.5s;
}

.animate-item-first-div {
  animation: itemEnter 1s;
}

.animate-item-second-div {
  animation: itemEnterSecondDiv 1.4s;
}

.animate-item-img-hero {
  animation: itemEnterImgHero 2s;
}

.animate-item-hr {
  animation: itemEnterHr 6s;
}

@keyframes itemEnter {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes itemEnterHr {
  0% {
    transform: translateX(-80px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes itemEnterSecondDiv {
  0% {
    transform: translate(-130px, -30px);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes itemEnterImgHero {
  0% {
    transform: translate(-70px, -70px);
    position: absolute;
    opacity: 0.5;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
    position: absolute;
  }
}
</style>
