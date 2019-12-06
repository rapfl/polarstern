<template>
  <Layout>
    <b-container class="header-padding footer-padding about">
      <b-row>
        <b-col cols="12">
          <vue-markdown class="markdown-body">{{About.body}}</vue-markdown>
          <div class="group-photo-wrapper">
            <g-image :src="About.team_funny" class="img-fluid group-photo funny"></g-image>
            <g-image :src="About.team_serious" class="img-fluid group-photo serious"></g-image>
              <MemberBox  v-for="(member, index) in About.team_members" 
                          :key="index"
                          :index="(index+1)"
                          :inImage="true"
                          :memberName="member.name"
                          :memberDescription="member.description"
                          :show="true"
                          :windowWidth="windowWidth"/>
          </div>
          <div id="responsive-member-box-wrapper" class="responsive-member-box-wrapper">
            <MemberBox  v-for="(member, index) in About.team_members" 
                      :key="index"
                      :index="(index+1)"
                      :memberName="member.name"
                      :memberDescription="member.description"
                      :show="(windowWidth < 768)"/>
          </div>
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
import About from '~/data/footer/About.yml'
import VueMarkdown from 'vue-markdown'
import MemberBox from '~/components/Member-Box.vue'

export default {
  components: {
    Layout,
    VueMarkdown,
    MemberBox
  },
  computed: {
    About() {
      return About
    }
  },
  data() {
    return {
      windowWidth: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  destroyed() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
      console.log(this.windowWidth)
    }
  },
  metaInfo: {
    title: 'Über Uns'
  }
}
</script>

<style lang="scss">
  .group-photo-wrapper {
    display: grid;
    grid-template-rows: auto auto;
    margin-bottom: 1rem;
    img {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
    .group-photo.serious {
      opacity: 1;
      transition: .3s ease-in-out;
    }
    &:hover {
      .group-photo.serious {
        opacity: 0;
      }
    }
  }
  .member-box-wrapper.image-overlay {
    display: grid;
    width: 100%;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 60px 60px 60px 60px 60px;
    align-items: flex-start;
    margin-top: 380px;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
    .member-box {
      z-index: 20;
      margin: 0.5rem 0;
    }
    #member-box-1 {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
      z-index: 90;
    }
    #member-box-2 {
      grid-row: 4 / 4;
      grid-column: 2 / 2;
      z-index: 80;
    }
    #member-box-3 {
      grid-row: 2 / 2;
      grid-column: 3 / 3;
      z-index: 90;
    }
    #member-box-4 {
      grid-row: 5 / 5;
      grid-column: 4 / 4;
      z-index: 80;
    }
    #member-box-5 {
      grid-row: 1 / 1;
      grid-column: 5 / 5;
      justify-self: end;
      z-index: 90;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      margin-top: 230px;
      #member-box-3 {
        grid-row: 3 / 3;
        grid-column: 3 / 3;
      }
    }
    @media screen and (max-width: 767px){
      grid-template-rows: 60px 60px 60px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      margin-top: 160px;
      #member-box-2 {
        grid-row: 3 / 3;
        grid-column: 2 / 2;
      }
      #member-box-3 {
        grid-row: 1 / 1;
        grid-column: 3 / 3;
      }
      #member-box-4 {
        grid-row: 3 / 3;
        grid-column: 4 / 4;
      }
    }
    @media screen and (max-width: 575px) {
      margin-top: 160px;
      grid-template-rows: 60px;
      .member-box {
        grid-row: 1 / 1 !important;
        margin: 0.2rem 0;
        justify-self: center !important;
      }
    }
  }
  .responsive-member-box-wrapper {
    .member-box-wrapper {
      margin-top: 0.4em;
    }
  }
</style>