<template>
  <Layout :blue="true">
    <b-container class="header-padding footer-padding company">
      <b-row>
        <b-col cols="12">
          <vue-markdown class="markdown-body">{{Unternehmen.body}}</vue-markdown>
          <b-tabs nav-class="company">
            <CompanyModule  v-for="(offer, index) in Unternehmen.company_offers"
                            :key="index"
                            :index="index"/>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </Layout>
</template>

<page-query>
query {
  companyOffers: allCompanyOffer {
    edges {
      node {
        title
        content
      }
    }
  },
  meta: metadata {
    siteUrl
  }
}
</page-query>

<script>
import Layout from '~/layouts/Page.vue'
import Unternehmen from '~/data/footer/Unternehmen.yml'
import CompanyModule from '~/components/Company-Module.vue'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    Layout,
    CompanyModule,
    VueMarkdown
  },
  computed: {
    Unternehmen() {
      return Unternehmen
    }
  },
  metaInfo: {
    title: 'Unternehmensangebote'
  }
}
</script>

<style lang="scss">
  .company .markdown-body {
    margin-bottom: 5rem;
  }
  .nav-tabs.company {
    border-bottom: none;

    .nav-link {
      color: #000;
      background-color: #ece1d9;
      font-family: 'Chau Philomene One';
      text-transform: uppercase;
      font-size: 20px;
      border: none;
      border-top: 6px solid #ece1d9;
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      transition: .2s ease-out;
      @media screen and (max-width: 575px) {
        padding: 0.3rem 0.2rem;
        font-size: 14px;
      }
    }
    .nav-link.active, 
    .nav-item.show .nav-link {
      background-color: #fff;
      border-color: #007770;
    }
    .nav-link:hover {
      border-color: #007770;
    }
  }
</style>