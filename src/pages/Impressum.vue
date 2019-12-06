<template>
  <Layout>
    <b-container class="header-padding footer-padding impress">
      <b-row>
        <b-col cols="12" md="6" order="2" order-md="1" class="image-column">
          <g-image src="~/assets/img/Polarstern_Logo.png" width="324"></g-image>
        </b-col>
        <b-col cols="12" md="6" order="1" order-md="2">
          <vue-markdown class="markdown-body">{{Impressum.body}}</vue-markdown>
        </b-col>
      </b-row>
    </b-container>
    
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
import Layout from '~/layouts/Page.vue'
import Impressum from '~/data/footer/Impress.yml'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    Layout,
    VueMarkdown
  },
  computed: {
    Impressum() {
      return Impressum
    }
  },
  metaInfo: {
    title: 'Impressum'
  }
}
</script>

<style lang="scss">
  .impress {
    .image-column {
      text-align: center;
      img {
        margin-top: 3rem;
      }
    }
  }
</style>