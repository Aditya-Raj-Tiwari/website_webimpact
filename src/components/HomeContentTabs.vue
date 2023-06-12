<script setup>
import { ref, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import leistungBg from '../assets/images/image-7.png'

const loaded = ref(false)
onMounted(() => {
  loaded.value = true
  initFlowbite()
})
</script>

<template>
  <div class="outer-wrapper relative">
    <div class="title-wrapper h-[12rem] flex items-center">
      <div class="title-inline-wrapper mt-8">Leistungübersicht</div>
    </div>

    <div class="mb-4 border-b border-gray-200 absolute tab-custom-pos">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 dark:border-transparent text-[#314F6F] hover:font-[700] hover:text-[#314F6F] dark:text-[#314F6F] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-[#314F6F]"
            id="profile-tab"
            data-tabs-target="#profile"
            type=""
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Shopsysteme & Wavi
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 dark:border-transparent text-[#314F6F] hover:font-[700] hover:text-[#314F6F] dark:text-[#314F6F] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-[#314F6F]"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type=""
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            Multichannel
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:font-[700] text-[#314F6F] hover:border-gray-300"
            id="settings-tab"
            data-tabs-target="#settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            Consulting
          </button>
        </li>
        <li role="presentation">
          <button
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:font-[700] text-[#314F6F] hover:border-gray-300"
            id="contacts-tab"
            data-tabs-target="#contacts"
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected="false"
          >
            Development
          </button>
        </li>
        <li role="presentation">
          <button
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:font-[700] text-[#314F6F] hover:border-gray-300"
            id="contacts-tab"
            data-tabs-target="#contacts"
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected="false"
          >
            Marketing & Design
          </button>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="flex justify-center">
      <div
        class="hidden p-4 rounded-lg tab-content-bg container"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="first-row">
          <div class="text-[#314F6F] text-3xl mb-6">Shopsysteme & Wavi</div>
          <div class="text-[#94A2AE] mb-6">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr. Diam voluptua. Lorem ipsum dolor sit amet,
            consetetur.
          </div>
          <button
            class="rounded-[10px] bg-white text-[#314F6F] py-2 px-5 font-bold text-l shadow-button mb-6"
          >
            Mehr erfahren
          </button>
        </div>
        <div class="tab-image">
          <img :src="leistungBg" alt="leistungs-tab" />
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg tab-content-bg container"
        id="dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
        <div class="first-row">
          <div class="text-[#314F6F] text-3xl mb-6">Shopsysteme & Wavi</div>
          <div class="text-[#94A2AE] mb-6">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr. Diam voluptua. Lorem ipsum dolor sit amet,
            consetetur.
          </div>
          <button
            class="rounded-[10px] bg-white text-[#314F6F] py-2 px-5 font-bold text-l shadow-button mb-6"
          >
            Mehr erfahren
          </button>
        </div>
        <div class="tab-image">
          <img :src="leistungBg" alt="leistungs-tab" />
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg tab-content-bg container"
        id="settings"
        role="tabpanel"
        aria-labelledby="settings-tab"
      >
        <div class="first-row">
          <div class="text-[#314F6F] text-3xl mb-6">Shopsysteme & Wavi</div>
          <div class="text-[#94A2AE] mb-6">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr. Diam voluptua. Lorem ipsum dolor sit amet,
            consetetur.
          </div>
          <button
            class="rounded-[10px] bg-white text-[#314F6F] py-2 px-5 font-bold text-l shadow-button mb-6"
          >
            Mehr erfahren
          </button>
        </div>
        <div class="tab-image">
          <img :src="leistungBg" alt="leistungs-tab" />
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg tab-content-bg container"
        id="contacts"
        role="tabpanel"
        aria-labelledby="contacts-tab"
      >
        <div class="first-row">
          <div class="text-[#314F6F] text-3xl mb-6">Shopsysteme & Wavi</div>
          <div class="text-[#94A2AE] mb-6">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr. Diam voluptua. Lorem ipsum dolor sit amet,
            consetetur.
          </div>
          <button
            class="rounded-[10px] bg-white text-[#314F6F] py-2 px-5 font-bold text-l shadow-button mb-6"
          >
            Mehr erfahren
          </button>
        </div>
        <div class="tab-image">
          <img :src="leistungBg" alt="leistungs-tab" />
        </div>
      </div>
    </div>
  </div>
</template>
