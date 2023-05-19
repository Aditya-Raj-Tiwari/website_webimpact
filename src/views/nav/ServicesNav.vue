<script setup>
import { ref } from 'vue'
import plentyIcon from '../../assets/images/plenty_icon.png'
import shopifyIcon from '../../assets/images/shopify-icon.png'
import shopwareIcon from '../../assets/images/shopware-icon.png'
import jtlIcon from '../../assets/images/jtl-icon.png'
import miraklIcon from '../../assets/images/mirakl-icon.png'
import wooCommerceIcon from '../../assets/images/woo-Commerce-icon.png'

const activeIndex = ref(0)

const activate = (event) => {
  const target = event.currentTarget
  const index = [...target.parentElement.children].indexOf(target)
  activeIndex.value = index
}

const isActive = (index) => (activeIndex.value === index ? 'active' : '')
</script>
<template>
  <div ref="dropdown" class="services absolute flex items-center overflow-hidden">
    <div class="container relative grid grid-cols-8 gap-20">
      <div class="first-col justify-start flex flex-col gap-y-menuitem col-start-1 col-end-4">
        <a
          @click="activate($event)"
          :class="[
            'cursor-pointer',
            'text-2xl 2xl:text-3xl',
            'text-gray-500',
            'font-normal',
            'services_headers',
            'pt-6',
            'd-flex',
            'align-items-center',
            'flex-row',
            isActive(0)
          ]"
        >
          Shopsysteme & W<span class="font-normal text-gray-500 dark:text-gray-400">awi</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C3CFD9"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
        <a
          @click="activate($event)"
          :class="[
            'cursor-pointer',
            'text-2xl 2xl:text-3xl',
            'text-gray-500',
            'font-normal',
            'services_headers',
            isActive(1)
          ]"
        >
          Multichannel
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C3CFD9"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
        <a
          @click="activate($event)"
          :class="[
            'cursor-pointer',
            'text-2xl 2xl:text-3xl',
            'text-gray-500',
            'font-normal',
            'services_headers',
            isActive(2)
          ]"
        >
          Consulting
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C3CFD9"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
        <a
          @click="activate($event)"
          :class="[
            'cursor-pointer',
            'text-2xl 2xl:text-3xl',
            'text-gray-500',
            'font-normal',
            'services_headers',
            isActive(3)
          ]"
        >
          Development
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C3CFD9"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
        <a
          @click="activate($event)"
          :class="[
            'cursor-pointer',
            'text-2xl 2xl:text-3xl',
            'text-gray-500',
            'font-normal',
            'services_headers',
            isActive(4)
          ]"
        >
          Marketing & Design
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C3CFD9"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>
      <div
        class="items-box w-full col-start-4 col-end-12 grid grid-cols-3 gap-4 h-screen place-items-center"
      >
        <div class="bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="plentyIcon" class="w-16 h-16 mb-6" alt="" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">plentymarkets</p>
        </div>
        <div class="p-4 bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="shopifyIcon" class="w-16 h-16 mb-6" alt="" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">Shopify</p>
        </div>
        <div class="bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="shopwareIcon" class="w-16 h-16 mb-6" alt="shopware" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">Shopware</p>
        </div>
        <div class="bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="jtlIcon" class="w-16 h-16 mb-6" alt="jtl" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">JTL</p>
        </div>
        <div class="bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="miraklIcon" class="w-16 h-16 mb-6" alt="mirakl" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">MIRAKL</p>
        </div>
        <div class="bg-gray-300 text-center flex flex-col justify-center items-center">
          <img :src="wooCommerceIcon" class="w-16 h-16 mb-6" alt="" />
          <p class="text-menuGrey hover:text-menuHeaderGrey hover:font-bold">WooCommerce</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.services {
  position: absolute;
  z-index: 9999;
  min-height: 55vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 57%,
    rgba(255, 255, 255, 1) 81%,
    rgba(222, 243, 255, 1) 100%
  );
  z-index: 999;
  box-shadow: 0px 25px 15px -20px rgba(49, 79, 111, 0.25);

  .items-box {
    justify-content: space-evenly;
    min-height: 60vh;
    height: 60vh;
    padding: 20px 0;

    & > div {
      background: #ffffff;
      box-shadow: 0px 5px 15px rgba(49, 79, 111, 0.15);
      border-radius: 10px;
      width: 80%;
      min-height: 80%;
      height: 80%;
    }
    & > div:hover {
      background: rgba(255, 255, 255, 0.65);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(15.5px);
      -webkit-backdrop-filter: blur(15.5px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      cursor: pointer;
    }
  }
  .first-col {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    & > a {
      color: #c3cfd9 !important;

      svg {
        position: absolute;
        top: 20%;
        transform: translateY(-30%);
        right: 20px;
      }

      &:first-of-type {
        svg {
          position: absolute;
          top: 50%;
          transform: translateY(-30%);
          right: 20px;
        }
      }
      &.active {
        background: -webkit-linear-gradient(180deg, #94a2ae, #314f6f80, #314f6f);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        svg {
          display: none;
        }

        &::after {
          content: '';
          display: block;
          width: 40px;
          height: calc(100% + 52px);
          background: #fff;
          position: absolute;
          bottom: -25px;
          left: 99%;
        }
      }
    }
  }
  .services_headers {
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 200%;
      transform: translateX(-50%);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-right: none;
      border-top: none;
      position: absolute;
      top: -28px;
    }
  }
}
</style>