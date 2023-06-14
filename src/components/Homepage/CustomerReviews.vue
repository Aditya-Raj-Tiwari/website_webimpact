<template>
  <div id="swiper-app" class="swiper-container-wrapper" ref="carouselRef">
    <div class="customer-review"><p>Das sagen unsere Kunden.</p></div>
    <div class="swiper-navigation">
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="swiper-container mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide page1 flex">
          <div class="lg:w-1/2">
            <h3>desiary.de</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aspernatur fugiat modi
              ipsum neque exercitationem fuga doloremque laboriosam debitis odit. Fugit sint totam
              est. Delectus dolorum nostrum tempore modi ullam.
            </p>
          </div>
          <div class="images-container relative">
            <div class="image-container lg:w-1/2 overflow-hidden">
              <img class="zoom-image" :src="SliderPic1" alt="" />
            </div>
            <div class="after-image"></div>
          </div>
        </div>

        <div class="swiper-slide page2">
          <div class="lg:w-1/2">
            <h3>desiary.de</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aspernatur fugiat modi
              ipsum neque exercitationem fuga doloremque laboriosam debitis odit. Fugit sint totam
              est. Delectus dolorum nostrum tempore modi ullam.
            </p>
          </div>
          <div class="images-container relative">
            <div class="image-container lg:w-1/2 overflow-hidden">
              <img class="zoom-image" :src="SliderPic1" alt="" />
            </div>
            <div class="after-image"></div>
          </div>
        </div>
        <div class="swiper-slide page3">
          <div class="lg:w-1/2">
            <h3>desiary.de</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aspernatur fugiat modi
              ipsum neque exercitationem fuga doloremque laboriosam debitis odit. Fugit sint totam
              est. Delectus dolorum nostrum tempore modi ullam.
            </p>
          </div>
          <div class="images-container relative">
            <div class="image-container lg:w-1/2 overflow-hidden">
              <img class="zoom-image" :src="SliderPic1" alt="" />
            </div>
            <div class="after-image"></div>
          </div>
        </div>
        <div class="swiper-slide page4">
          <div class="lg:w-1/2">
            <h3>desiary.de</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aspernatur fugiat modi
              ipsum neque exercitationem fuga doloremque laboriosam debitis odit. Fugit sint totam
              est. Delectus dolorum nostrum tempore modi ullam.
            </p>
          </div>
          <div class="images-container relative">
            <div class="image-container lg:w-1/2 overflow-hidden">
              <img class="zoom-image" :src="SliderPic1" alt="" />
            </div>
            <div class="after-image"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, nextTick, ref, onUnmounted } from 'vue'
import Swiper, { Navigation, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
import { gsap } from 'gsap'
import SliderPic1 from '../../assets/images/desiaryMoodslidertempPic1.png'

Swiper.use([Navigation, Autoplay]) // Include Autoplay

export default {
  setup() {
    const carouselRef = ref(null)
    let observer = null

    onMounted(() => {
      nextTick(() => {
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper('.mySwiper', {
          direction: 'horizontal',
          simulateTouch: true,
          touchStartPreventDefault: false,
          mousewheel: {
            invert: false,
            forceToAxis: true,
            releaseOnEdges: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          autoplay: {
            delay: 1000000
          },
          on: {
            slideChangeTransitionStart: function () {
              let currentSlide = this.slides[this.activeIndex]
              gsap.fromTo(
                currentSlide,
                { scale: 0.95, opacity: 0.5 },
                { scale: 1, opacity: 1, duration: 0.5 }
              )

              gsap.fromTo(
                currentSlide.children,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, delay: 0.3, ease: 'power1.out' }
              )
            }
          }
        })

        gsap.fromTo('.zoom-image', { scale: 1.6 }, { scale: 1, duration: 3 })
        gsap.to('.zoom-image', {
          scale: 1.1,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        })

        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              window.scrollTo({
                top: entry.target.offsetTop,
                behavior: 'smooth'
              })
            }
          },
          {
            threshold: 0.25
          }
        )

        observer.observe(carouselRef.value)
      })
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return { carouselRef, SliderPic1 }
  }
}
</script>

<style scoped lang="scss">
html {
  scroll-behavior: smooth;
}

#swiper-app,
.swiper-container,
.swiper-wrapper,
.swiper-slide {
  width: 100vw;
  height: 100vh;

  p {
    font-size: 1rem;
  }
}

#swiper-app {
  position: relative;
  overflow: hidden;
}

.swiper-container-wrapper {
  margin-top: 50px;
  position: relative;
}

.mySwiper .swiper-wrapper {
  padding-left: 0 !important;
}

.swiper-slide {
  text-align: center;
  font-size: 38px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    &:first-child {
      padding-right: 20px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h3 {
        margin-bottom: 30px;
      }

      p {
        max-width: 70%;
        color: #97a1ad;
      }
    }
  }

  &.page1 {
    background: url('../../assets/images/blur_bg 1.png') no-repeat bottom left;
    background-size: cover;
  }

  &.page2 {
    background-color: #f9d9ca;
  }

  &.page3 {
    background-color: #bdc2bb;
  }

  &.page4 {
    background-color: #d2d5b8;
  }
}

.images-container {
  transform: translateX(-80px);
  .image-container {
    width: 500px;
    height: 500px;
    border-radius: 10px;
    position: relative;
    z-index: 2;
  }

  .after-image {
    content: '';
    background: url('../../assets/images/dot-pattern-bg.png') no-repeat;
    position: absolute;
    width: 500px;
    height: 500px;
    top: 100px;
    left: 100px;
    z-index: 1;
    display: block;
  }

  .zoom-image {
    transition: transform 0.5s ease;
  }
}

.customer-review {
  position: absolute;
  top: 90px;
  z-index: 9;
  width: 100%;
  text-align: center;
  height: 100%;
  left: -24%;

  p {
    font-size: 3rem !important;
  }
}

.swiper-navigation {
  width: 100%;
  text-align: center;
  .swiper-button-next {
    position: absolute;
    right: 30px !important;
  }
  .swiper-button-prev {
    position: absolute;
    right: 90px !important;
  }
}
</style>
