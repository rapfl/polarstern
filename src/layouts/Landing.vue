<template>
  <div class="main-wrapper landing" style="">
    <Header/>
    <SocialButtons/>
    <slot />
    <SupporterFooter/>
    <Footer/>
  </div>
</template>

<page-query>
  query Meta {
  	meta: metadata {
      siteUrl
      siteName
    }
  }
</page-query>

<script>
  import Start from '~/data/Start.yml'
  import Header from '~/components/NewHeader.vue'
  import SocialButtons from '~/components/Social-Buttons.vue'
  import SupporterFooter from '~/components/storyblok/SupporterFooter.vue'
  import Footer from '~/components/storyblok/Footer.vue'

  export default {
    components: {
      Header,
      SocialButtons,
      SupporterFooter,
      Footer
    },
    computed: {
      Start() {
        return Start
      }
    },
    data: function() {
      return  {
        menuOpen: false
      }
    },
    methods: {
      toggleMenu: function() {
        this.menuOpen = !this.menuOpen
      }
    }
  }
</script>

<style lang="scss">
  // Typography
  @import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap');
  .header h2 {
    font-family: 'Chau Philomene One', sans-serif;
    color: #fff;
    margin-right: 4%;
    filter: drop-shadow(1px 1px 0px var(--blue));
  }

  .main-wrapper {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  
</style>