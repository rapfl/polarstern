<template>
  <Layout :blue="true">
    <b-container class="header-padding footer-padding workshops">
      <b-row>
        <b-col cols="12">
          <vue-markdown class="markdown-body">{{Workshops.body}}</vue-markdown>
          <b-tabs nav-class="workshops">
            <WorkshopModule  v-for="(offer, index) in Workshops.workshops"
                            :key="index"
                            :index="index"/>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
    <ModalBox id="modal-success" :title="successTitle" :message="successMessage"/>
    <ModalBox id="modal-error" :title="errorTitle" :message="errorMessage"/>
  </Layout>
</template>

<page-query>
query {
  workshops: allWorkshop {
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
import Workshops from '~/data/footer/Workshops.yml'
import WorkshopModule from '~/components/Workshop-Module.vue'
import ModalBox from '~/components/Modal-Box.vue'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    Layout,
    WorkshopModule,
    ModalBox,
    VueMarkdown
  },
  computed: {
    Workshops() {
      return Workshops
    }
  },
  data() {
    return {
      successTitle: 'Anfrage erfolgreich :)',
      successMessage: 'Cool, dass du jungen Menschen ermöglichen möchtest, stark zu sein! Wir melden uns ganz bald mit Terminvorschlägen für den Workshop.',
      errorTitle: 'Etwas ist schief gelaufen :(',
      errorMessage: 'Die Internetverbindung bzw. unsere Website scheint technische Schwierigkeiten zu haben. Versuche es später noch einmal!'
    }
  },
  metaInfo: {
    title: 'Workshops'
  }
}
</script>

<style lang="scss">
  .workshops .markdown-body {
    margin-bottom: 5rem;
  }
  .nav-tabs.workshops {
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