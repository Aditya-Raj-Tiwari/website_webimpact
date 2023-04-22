<script setup>
import { RouterLink } from 'vue-router'
import logoFull from '../../assets/images/webimpact-logo.png'
import logoHalf from '../../assets/images/webimpact-logo-half.png'
import ServicesNav from './ServicesNav.vue'
import { ref, onMounted, defineComponent } from 'vue'
import autoAnimate from '@formkit/auto-animate'

const dropdown = ref()
onMounted(() => {
  autoAnimate(dropdown.value)
})

const currentComponent = ref('')
const currentLogo = ref(logoFull)

const toggleComponent = (componentName) => {
  if (currentComponent.value === 'ServicesNav' && componentName === 'ServicesNav') {
    currentLogo.value = logoFull
    currentComponent.value = ''
    return
  }
  currentComponent.value = componentName
  console.log(currentComponent.value)
  currentLogo.value = logoFull
  if (componentName === 'ServicesNav') {
    currentLogo.value = logoHalf
  }
}

defineComponent({
  components: {
    ServicesNav
  }
})
</script>

<template>
  <header ref="dropdown">
    <div class="header border-b-2 border-webimpactGray">
      <nav class="bg-white-900">
        <div class="container mx-auto flex flex-row items-center justify-between menu-index">
          <ul class="flex flex-row align-middle company-logo">
            <li>
              <router-link
                to="/"
                class="text-black-900 px-3 py-2"
                @click="() => toggleComponent('')"
              >
                <img class="h-60 w-100" :src="currentLogo" alt="" />
              </router-link>
            </li>
          </ul>
          <ul class="flex flex-row justify-center header-list">
            <li :class="{ 'active-li': currentComponent === 'ServicesNav' }">
              <a
                @click="() => toggleComponent('ServicesNav')"
                class="text-menuHeaderGrey px-3 py-2"
              >
                Leistungen
              </a>
            </li>
            <li :class="{ 'active-li': currentComponent === 'AgneturNav' }">
              <router-link
                @click="toggleComponent('AgneturNav')"
                to="/agetur"
                class="text-menuHeaderGrey px-3 py-2"
              >
                Agentur
              </router-link>
            </li>
            <li :class="{ 'active-li': currentComponent === 'KundenNav' }">
              <router-link
                to="/contact"
                class="text-menuHeaderGrey px-3 py-2"
                @click="() => toggleComponent('KundenNav')"
              >
                Unsere Kunden
              </router-link>
            </li>
            <li :class="{ 'active-li': currentComponent === 'KontaktNav' }">
              <router-link
                to="/contact"
                class="text-menuHeaderGrey px-3 py-2"
                @click="() => toggleComponent('KontaktNav')"
              >
                Kontakt
              </router-link>
            </li>
          </ul>
          <ul class="flex flex-row justify-center items-center contact">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="19" viewBox="0 0 5 3">
              <desc>Flag of Germany</desc>
              <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000" />
              <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00" />
              <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00" />
            </svg>
            <span class="pl-3 font-bold"> 02974 77 999 99¹ </span>
          </ul>
        </div>
      </nav>
    </div>
    <ServicesNav v-if="currentComponent === 'ServicesNav'" />
  </header>
</template>

<style lang="scss">
header {
  position: relative;
  z-index: 9;
  .company-logo {
    img {
      width: 223px;
      object-fit: contain;
    }
  }
  li {
    &.active-li {
      a {
        font-weight: bold;
      }
    }
    a {
      cursor: pointer;
    }
  }
  .menu-index {
    position: relative;
    z-index: 9;
    background: #fff;
  }
}
</style>