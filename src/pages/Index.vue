<template>
  <Layout>
    
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
import Layout from '~/layouts/Start.vue'
import Start from '~/data/Start.yml'

export default {
  metaInfo: {
    titleTemplate: 'Polarstern - %s',
    title: 'Finde deine Stärken'
  },
  components: {
    Layout
  },
  data() {
    return {
      hover: ''
    }
  },
  computed: {
    Start() {
      return Start
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