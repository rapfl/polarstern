<template>
  <div class="main-wrapper post" v-bind:class="{blue: blue}">
    <Header/>
    <SocialButtons/>
    <Dots/>
    <slot/>
    <SOSLogo/>
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
import Header from '~/components/Header.vue'
import SocialButtons from '~/components/Social-Buttons.vue'
import SOSLogo from '~/components/SOS-Logo.vue'
import Footer from '~/components/Footer.vue'
import Dots from '~/assets/svg/dots.svg'

export default {
  components: {
    Header,
    SocialButtons,
    SOSLogo,
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