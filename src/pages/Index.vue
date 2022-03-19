<template>
  <Layout>
    <!-- <Hero 
      :showVideo="Home.show_video"
      :heroImage="Home.hero_image"
      :heroVideo="Home.hero_video"
      :heroString="Home.hero_string">
      
    </Hero> -->
  </Layout>
</template>

<page-query>
  query Meta {
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
import Layout from '~/layouts/PageUpdated.vue'
import Start from '~/data/Start.yml'
import Home from '~/data/Home.yml'
// import Hero from '~/components/storyblok/Hero.vue'

export default {
  metaInfo: {
    titleTemplate: 'Polarstern - %s',
    title: 'Finde deine Stärken'
  },
  components: {
    Layout,
    // Hero
  },
  data() {
    return {
      hover: ''
    }
  },
  computed: {
    Start() {
      return Start
    },
    Home() {
      return Home
    }
  },
  methods: {
    setBackgroundImage: function(elementHovered, image, siteUrl) {
      if (elementHovered == 'Student') {
        var styles = 'url("' + siteUrl + image + '")'
      }
      else if (elementHovered == 'Teacher'){
        var styles = 'background-image: url("' + siteUrl + image + '");'
      }
    }
  }
}
</script>

<style lang="scss">
  .start-box-container {
    text-align: center;
    .start-button-box {
      display: inline-block;
      border: 3px solid;
      vertical-align: middle;
      margin: 15px;
    }
    .start-button-box:hover {
      text-decoration: none;
    }
    .card {
      width: 19rem;
      height: 19rem;
    }
  }
  @media screen and (max-width: 767px) {
    .start-box-container {
      .card {
        width: 14rem;
        height: 14rem;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .start-box-container {
      .card {
        width: 26rem;
        height: 26rem;
      }
    }
  }
</style>