<template>
  <Layout>
    <b-container class="header-padding footer-padding privacy">
      <b-row>
        <b-col cols="12">
          <vue-markdown class="markdown-body">{{Datenschutz.body}}</vue-markdown>
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
import Datenschutz from '~/data/footer/Privacy.yml'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    Layout,
    VueMarkdown
  },
  computed: {
    Datenschutz() {
      return Datenschutz
    }
  },
  metaInfo: {
    title: 'Datenschutz'
  }
}
</script>