<template>
  <div v-editable="blok" class="carousel-wrapper">
    <ssr-carousel 
      :slides-per-page="3"
      paginate-by-slide
      show-arrows
      show-dots
      feather
      :responsive='[
        {
          maxWidth: 1280,
          slidesPerPage: 3,
        },
        {
          maxWidth: 991,
          slidesPerPage: 2,
        },
        {
          maxWidth: 575,
          slidesPerPage: 1
        }
      ]'>
      <div v-for="box in blok.slides" :key="box._uid" class="slide">
        <ThumbnailBox :blok="box"/>
        <!-- TODO: Make it work with buttons and other components -->
      </div>
    </ssr-carousel>
  </div>
</template>

<script>
import ThumbnailBox from '~/components/storyblok/ThumbnailBox.vue'// Import Swiper Vue.js components
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'

export default {
  props: ['blok'],
  components: {
    ThumbnailBox,
    SsrCarousel,
    ssrCarouselCss
  },
}
</script>

<style lang="scss">
  .carousel-wrapper {
    width: 100%;
    margin: 40px 0;

    .ssr-carousel-slide {
      text-align: center;
    }
  }
</style>