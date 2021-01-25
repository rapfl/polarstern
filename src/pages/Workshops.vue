<template>
  <Layout>
    <b-container class="header-padding workshops">
      <b-row class="pb-0">
        <b-col cols="12">
          <h1>{{workshopPageTitle}}</h1>
          <!-- Strengths -->
          <b-row class="px-lg-5 px-xl-0">
            <b-col v-for="(keyTopic, index) in Workshops.key_topics" 
              :key="index"
              xl="3"
              class="mb-4 px-sm-5 px-xl-3">
              <StrengthHeadingPill 
                :title="keyTopic.title" 
                :index="index"
                class="mb-3"/>
              <p class="pl-lg-1 mb-4">
                {{keyTopic.description}}
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <BookWorkshopBanner/>
    <!-- Workshop Infos -->
    <div v-for="(workshop, index) in workshops" :key="index">
      <WorkshopInfoBanner 
        :color="workshop.color" 
        :title="workshop.title" 
        :icon="workshop.icon"/>

    </div>

    <!-- Corona Warning -->
    <b-container class="my-5">
      <b-row>
        <b-col cols="12" sm="2" lg="1" class="mb-3 mb-sm-0 text-center text-sm-left">
          <g-image src="~/assets/img/corona_virus.png"></g-image>
        </b-col>
        <b-col cols="12" sm="10" lg="11">
            <vue-markdown class="markdown-body" :source="Workshops.corona_warning">
              </vue-markdown>  
        </b-col>
      </b-row>
    </b-container>
    <BookWorkshopBanner/>
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
        info
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
import WorkshopModule from '~/components/Workshop-Module.vue'
import ModalBox from '~/components/Modal-Box.vue'
import VueMarkdown from 'vue-markdown'
import StrengthHeadingPill from '~/components/Strength-Heading-Pill.vue'
import BookWorkshopBanner from '~/components/Book-Workshop-Banner.vue'
import WorkshopInfoBanner from '~/components/Workshop-Info-Banner.vue'
import Workshops from '~/data/footer/Workshops.yml'

export default {
  components: {
    Layout,
    WorkshopModule,
    ModalBox,
    VueMarkdown,
    StrengthHeadingPill,
    BookWorkshopBanner,
    WorkshopInfoBanner
  },
  computed: {
    Workshops() {
      return Workshops
    }
  },
  data() {
    return {
      successTitle: 'Anfrage erfolgreich :)',
      successMessage: 'Cool, dass Sie jungen Menschen ermöglichen möchten, stark zu sein! Wir melden uns ganz bald mit der Terminbestätigung für die Workshops.',
      errorTitle: 'Etwas ist schief gelaufen :(',
      errorMessage: 'Die Internetverbindung bzw. unsere Website scheint technische Schwierigkeiten zu haben. Versuche es später noch einmal!',
      workshopPageTitle: 'Wir geben jungen Menschen das Handwerkszeug, um ihre Stärken zu finden und zu nutzen!',
      workshops: [
        {
          title: 'Stärken Entdecken',
          color: 'blue',
          icon: '/uploads/weightlift_guy.png'
        },
        {
          title: 'Zukunftsperspektiven',
          color: 'red',
          icon: '/uploads/footsteps.png'
        },
        {
          title: 'Achtsamkeit',
          color: 'yellow',
          icon: '/uploads/happyfaces.png'
        }
      ]
    }
  },
  metaInfo: {
    title: 'Workshops'
  }
}
</script>

<style lang="scss">
  .workshops .markdown-body {
    margin-bottom: 2rem;
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