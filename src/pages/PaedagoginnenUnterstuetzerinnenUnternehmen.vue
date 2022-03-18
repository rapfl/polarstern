<template>
  <Layout>
    <div class="header-image">
      <g-image :src="$page.meta.siteUrl + Teacher.header_background_image" width="512"></g-image>
      <div class="triangle-bottomright">
      </div>
    </div>
    <!-- Info Text -->
    <div class="first-section">
      <div class="rectangle">
        <b-container>
          <b-row>
            <b-col  cols="12"
                    md="6"
                    v-bind:class="{fadeIn: firstSectionScrolled}"
                    v-view="viewHandlerFirstSection"
                    class="animated">
              <vue-markdown>{{Teacher.content_1}}</vue-markdown>
            </b-col>
            <b-col  cols="12"
                    md="6"
                    v-bind:class="{fadeIn: firstSectionScrolled}"
                    v-view="viewHandlerFirstSection"
                    class="animated">
              <vue-markdown>{{Teacher.content_2}}</vue-markdown>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="triangle-topright">
      </div>
      <div class="triangle-bottomleft">
      </div>
    </div>
    <!-- Blogposts -->
    <div class="second-section">
      <div class="rectangle">
        <b-container>
          <b-row class="first-post">
            <b-col  cols="12" 
                    md="4"
                    v-bind:class="{fadeIn: secondSectionScrolled}"
                    v-view="viewHandlerSecondSection"
                    class="animated">
              <vue-markdown>{{Teacher.content_3}}</vue-markdown>
            </b-col>
            <b-col  cols="12" 
                    md="8"
                    v-bind:class="{fadeInUp: secondSectionScrolled}"
                    v-view="viewHandlerSecondSection"
                    class="animated">
              <g-link to="/workshops" class="user-box teacher border border-warning" 
                    v-bind:style="'background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url(' + $page.meta.siteUrl + Workshops.featured_image + ');'">
                    <div class="title">
                      <h3>{{Workshops.preview_text_1}}</h3>
                      <h4>{{Workshops.preview_text_2}}</h4>
                    </div>
              </g-link>
            </b-col>
          </b-row>
          <b-row class="next-posts">
            <b-col  cols="12" 
                    md="6"
                    v-bind:class="{fadeInUp: secondSectionScrolled}"
                    v-view="viewHandlerSecondSection"
                    class="animated">
              <g-link to="/unternehmensangebote" class="user-box teacher border border-warning" 
                    v-bind:style="'background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url(' + $page.meta.siteUrl + Unternehmen.featured_image + ');'">
                    <div class="title">
                      <h3>{{Unternehmen.preview_text_1}}</h3>
                      <h4>{{Unternehmen.preview_text_2}}</h4>
                    </div>
              </g-link>
            </b-col>
            <TeacherBlogpost v-for="(blogpost, index) in Teacher.blogposts" 
                             :key="blogpost.id"
                             :index="index"
                             :md="getBlogpostWidth(index)"/>
          </b-row>
        </b-container>
      </div>
      <div class="triangle-topleft">

      </div>
      <div class="triangle-bottomright">

      </div>
    </div>
    <!-- Support Section -->
    <div class="third-section">
      <div class="rectangle">
        <b-container>
          <b-row class="call-to-action">
            <b-col  cols="12"
                    v-bind:class="{fadeIn: thirdSectionScrolled}"
                    v-view="viewHandlerThirdSection"
                    class="animated">
              <vue-markdown>{{Teacher.content_4}}</vue-markdown>
              <g-link to="/contact">
                <b-button pill variant="primary">
                  Ich bin dabei
                </b-button>
              </g-link>
            </b-col>
          </b-row>
          <b-row class="company-logos">
            <b-col  v-for="(logo, index) in Teacher.logos"
                    :key="logo.id"
                    md="3"
                    cols="6"
                    v-bind:class="{fadeIn: thirdSectionScrolled}"
                    v-view="viewHandlerThirdSection"
                    class="company-logo-wrapper animated" 
                    :style="'animation-delay: ' + ((index+1)*380) + 'ms;'" >
              <g-link :to="logo.company_url">
                <g-image :src="logo.logo" class="company-logo img-fluid"></g-image>
              </g-link>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query Posts {
    posts: allPost {
      edges {
        node {
          id
          title
          excerpt
          button_text
          featured_image
          path
        }
      }
    },
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
import Layout from '~/layouts/Landing.vue'
import TeacherBlogpost from '~/components/Teacher-Blogpost.vue'
import SupporterFooter from '~/components/Supporter-Footer.vue'
import Teacher from '~/data/Teacher.yml'
import Workshops from '~/data/footer/Workshops.yml'
import Unternehmen from '~/data/footer/Unternehmen.yml'
import VueMarkdown from 'vue-markdown'

// TODO: Add other title
export default {
  components: {
    Layout,
    VueMarkdown,
    TeacherBlogpost,
    SupporterFooter
  },
  computed: {
    Teacher() {
      return Teacher
    },
    Workshops() {
      return Workshops
    },
    Unternehmen() {
      return Unternehmen
    }
  },
  data() {
    return {
      firstSectionScrolled: false,
      secondSectionScrolled: false,
      thirdSectionScrolled: false,
    }
  },
  methods: {
    getBlogpostWidth(index) {
      if ((index % 4 >= 0) && (index % 4 < 2)) {
        return 5
      }
      else if ((index % 4 >= 2) && (index % 4 < 4)) {
        return 6
      }
    },
    viewHandlerFirstSection(e) {
      if (e.type == "enter") {
        this.firstSectionScrolled = true
      }
    },
    viewHandlerSecondSection(e) {
      if (e.type == "enter") {
        this.secondSectionScrolled = true
      }
    },
    viewHandlerThirdSection(e) {
      if (e.type == "enter") {
        this.thirdSectionScrolled = true
      }
    },
  }
}
</script>

<style lang="scss">
  // Typography
  @import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap&subset=latin-ext');
  .second-section {
    h3 {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--red);
      font-size: 18px;
      padding: 0 1em;
    }
    h4 {
      font-family: 'Chau Philomene One', sans-serif;
      text-transform: uppercase;
      color: var(--yellow);
      font-size: 30px;
      font-weight: 400;
    }
  } 
  .first-section, .second-section, .third-section {
    p {
      font-family: 'Roboto', sans-serif;
      font-weight: 200;
      strong {
        font-family: 'Chau Philomene One', sans-serif;
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .header-image {

    display: block;
    min-height: 80vh;
    position: relative;
    background-size: cover;
    background-position: center;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }

    .triangle-bottomright {
      width: 0;
      height: 0;
      bottom: 0;
      border-bottom: 25vh solid var(--yellow);
      border-left: 100vw solid transparent;
      position: absolute;
    }
  }
  .first-section {
    // min-height: 80vh;
    background-color: var(--blue);
    .rectangle {
      display: block;
      width: 100%;
      background-color: var(--yellow);
      .col-12 {
        opacity: 0;
      }
    }
    .triangle-topright {
      width: 0;
      height: 0;
      top: 0;
      border-top: 25vh solid var(--yellow);
      border-left: 100vw solid transparent;
    }
    .triangle-bottomleft {
      width: 0;
      height: 0;
      transform: translateY(-25vh);
      border-bottom: 25vh solid var(--blue);
      border-right: 100vw solid transparent;
      position: absolute;
    }
  }


  .second-section {
    background-color: var(--white);
    color: var(--white);
    overflow: hidden;
    .rectangle {
      background-color: var(--blue);

      .first-post .col-12,
      .next-posts .col-12 {
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        opacity: 0;
      }
    }
    .triangle-topleft {
      width: 0;
      height: 0;
      top: 0;
      border-top: 16vh solid var(--blue);
      border-right: 100vw solid transparent;
    }
    .triangle-bottomright {
      width: 0;
      height: 0;
      transform: translateY(-16vh);
      border-bottom: 16vh solid var(--white);
      border-left: 100vw solid transparent;
      position: absolute;
    }

    @media screen and (min-width: 768px) {
      .next-posts .col-md-5 .user-box{
        height: 460px;
      }
      .next-posts .col-md-6 {
        height: 350px;
      }
      .first-post .user-box {
        width: 67%;
      }
    }
  }


  .third-section {
    background-color: var(--white);
    .rectangle {
      background-color: var(--white);
      .col-12,
      .col-12 div{
        text-align: center;
      }
      .col-12 {
        opacity: 0;
      }
    }
    .triangle-topleft {
      width: 0;
      height: 0;
      top: 0;
      border-top: 16vh solid var(--blue);
      border-right: 100vw solid transparent;
    }
    .triangle-bottomright {
      width: 0;
      height: 0;
      transform: translateY(-16vh);
      border-bottom: 16vh solid var(--white);
      border-left: 100vw solid transparent;
      position: absolute;
    }
    .call-to-action {
      padding-top: 3em;
      padding-bottom: 3em;
    }
    .company-logos {
      padding-top: 1em;
      padding-bottom: 2em;
    }
    .company-logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 767px){
        margin: 1.2rem 0;
      }
    }
  }
  
</style>