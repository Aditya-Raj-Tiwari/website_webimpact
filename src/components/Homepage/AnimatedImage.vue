<template>
  <div class="reveal" ref="revealContainerRef">
    <div class="overlay" ref="overlayRef"></div>
    <img :src="homepageHeroImg" alt="" ref="imageRef" />
  </div>
</template>
  
  <script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Power2 } from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import homepageHeroImg from '../../assets/images/temp-homepage-img.png'

export default {
  setup() {
    const revealContainerRef = ref(null)
    const imageRef = ref(null)
    const overlayRef = ref(null)
    const loaded = ref(false)

    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger)
      initReveal()
    })

    function initReveal() {
      let container = revealContainerRef.value
      let image = imageRef.value
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: 'restart none none reset'
        }
      })

      tl.set(container, { autoAlpha: 1 })
      tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out
      })
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.8,
        delay: -1.5,
        ease: Power2.out
      })
    }

    // Returning the imported image as well
    return { revealContainerRef, imageRef, overlayRef, homepageHeroImg, loaded, initReveal }
  }
}
</script>
  
  <style lang="scss" scoped>
.reveal {
  visibility: hidden;
  position: relative;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  top: 100px;
  left: -20%;
  width: 470px;
  height: 450px;
  img {
    left: 0 !important;
    top: 0 !important;
    height: 100% !important;
    width: 100% !important;
    object-fit: cover;
    transform-origin: left;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
}
</style>
  