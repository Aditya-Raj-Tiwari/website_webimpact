<template>
  <div id="swiper-app-blog" class="swiper-container-wrapper" ref="carouselRef">
    <div class="customer-review">
      <p>Ratgeber und Aktuelles</p>
    </div>
    <div class="swiper-navigation">
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="swiper-container mySwiper-blog block">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="flex row">
            <div class="w-30">
              <div class="image-container">
                <img :src="TempBlog" alt="Image" />
                <div class="after-image"></div>
              </div>
            </div>
            <div class="w-70 pl-32">
              <h2>Header</h2>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
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
import TempBlog from '../../assets/images/temp-blog.png'

Swiper.use([Navigation, Autoplay])

export default {
  name: 'SwiperCarouselComponent',
  setup() {
    const carouselRef = ref(null)
    let observer = null

    onMounted(() => {
      nextTick(() => {
        const tl = gsap.timeline()
        tl.from('.mySwiper-blog .image-container img', {
          opacity: 0,
          duration: 0.5
        }).from(
          '.content',
          {
            opacity: 0,
            y: -20,
            duration: 0.5
          },
          '+=0.5'
        )

        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper('.mySwiper-blog', {
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
            delay: 6000
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

              gsap.from(currentSlide.querySelector('.mySwiper-blog .customer-quote'), {
                scale: 0.5,
                duration: 1,
                zIndex: 99,
                ease: 'elastic.out(1, 0.3)',
                clearProps: 'all'
              })
            }
          }
        })

        gsap.fromTo('.mySwiper-blog .zoom-image', { scale: 1.6 }, { scale: 1, duration: 3 })
        gsap.to('.mySwiper-blog .zoom-image', {
          scale: 1.1,
          duration: 12,
          zIndex: 9,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        })
      })
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return { carouselRef, TempBlog }
  }
}
</script>
    
  <style scoped lang="scss">
#swiper-app-blog {
  overflow: hidden;
  background: linear-gradient(#fbfcfe, #f9fbfd);
}

#swiper-app-blog,
.swiper-container,
.swiper-wrapper,
.swiper-slide {
  width: 100% !important;
  height: 90vh;
  max-width: 1400px;
  .flex {
    width: 100%;
  }

  p {
    font-size: 1rem;
  }
}

.after-image {
  content: '';
  background: url('../../assets/images/dot-pattern-bg.png') no-repeat;
  position: absolute;
  width: 300px;
  height: 300px;
  top: 100px;
  left: 100px;
  z-index: 1;
  display: block;
}

.image-container {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  z-index: 9;
  overflow: visible;
  z-index: 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: relative;
    z-index: 9;
  }
}

.swiper-container-wrapper {
  margin-top: 50px;
  position: relative;
}

.mySwiper-blog .swiper-wrapper {
  padding-left: 0 !important;
}

.mySwiper-blog {
  margin-top: 30px;
}

.swiper-slide {
  text-align: center;
  font-size: 38px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

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
  top: 90px;
  position: absolute;
  max-width: 800px;
  width: 220px;
  right: 300px;
  z-index: 9999 !important;
  display: block !important;
  .swiper-button-lock {
    display: flex !important;
    cursor: pointer;
    z-index: 9999 !important;
    pointer-events: all !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 8px 32px 0 rgba(133, 134, 146, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 90px;
    height: 70px;
    color: #97a1ad;
    z-index: 9999;
  }
}
</style>