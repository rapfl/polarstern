<template>
  <div class="main-wrapper post" v-bind:class="{blue: blue}">
    <Header/>
    <SocialButtons/>
    <slot/>
    <SupporterFooter/>
    <Footer/>
  </div>
</template>

<page-query>
  query Meta {
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
import Header from '~/components/NewHeader.vue'
import SocialButtons from '~/components/Social-Buttons.vue'
import SupporterFooter from '~/components/Supporter-Footer.vue'
import Footer from '~/components/Footer.vue'
import Dots from '~/assets/svg/dots.svg'

export default {
  components: {
    Header,
    SocialButtons,
    SupporterFooter,
    Footer,
    Dots
  },
  props: {
    blue: Boolean
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap');

  h1 {
    font-family: 'Chau Philomene One', sans-serif;
    text-transform: uppercase;
  }
  .main-wrapper.post.blue {
    background: var(--blue);
  }
</style>