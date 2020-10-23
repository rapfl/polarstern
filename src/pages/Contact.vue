<template>
  <Layout>
    <b-container class="header-padding footer-padding contact">
      <b-row>
        <b-col cols="12">
          <vue-markdown class="markdown-body">{{Kontakt.body}}</vue-markdown>
        </b-col>
      </b-row>
    </b-container>
    <BookWorkshopBanner/>
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
import Kontakt from '~/data/footer/Contact.yml'
import VueMarkdown from 'vue-markdown'
import BookWorkshopBanner from '~/components/Book-Workshop-Banner.vue'

export default {
  components: {
    Layout,
    VueMarkdown,
    BookWorkshopBanner
  },
  computed: {
    Kontakt() {
      return Kontakt
    }
  },
  metaInfo: {
    title: 'Kontakt'
  }
}
</script>

<style lang="scss">
  .contact {
    form {
      margin-top: 4rem;
      @media screen and (max-width: 767px) {
        margin-top: 2rem;
      } 
    }  
  }
</style>