<script setup>
import { RouterView } from 'vue-router'
import GlobalNav from '@/views/nav/GlobalNav.vue'
</script>

<template>
  <GlobalNav />
  <RouterView />
  <footer></footer>
</template>

<style lang="scss">
html,
body,
#app {
  overflow-x: hidden !important;
}
</style>
