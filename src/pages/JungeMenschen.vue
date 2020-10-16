<template>
  <Layout>
    <div class="header-image-wrapper">
      <g-image src="~/assets/img/sternenhimmel.jpg" class="background"></g-image>
      <div class="triangle-bottomright">
      </div>
      <div class="container-wrapper">
        <b-container>
          <b-row>
            <b-col cols="12" md="4" class="user-column" v-for="item in Student.header_images" v-bind:key="item.id">
              <div class="user-box border border-warning fadeInDown animated">
                <g-image :src="item" class="img-fluid"></g-image>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>   
    </div>
    <div class="animation-section">
      <!-- TODO: fade in animations -->
      <b-container>
        <b-row>
          <b-col  cols="12"
                  lg="5"
                  :class="{fadeIn: secondSectionScrolled}"
                  v-view="viewHandlerSecondSection"
                  class="animated small-delay">
            <vue-markdown>{{Student.video_text}}</vue-markdown>
          </b-col>
          <b-col  cols="12"
                  lg="7"
                  :class="{fadeIn: secondSectionScrolled}"
                  v-view="viewHandlerSecondSection"
                  class="animated medium-delay">
            <iframe width="100%" :src="'https://www.youtube.com/embed/' + Student.youtube_video_ID" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="app-store-buttons-wrapper">
              <a id="google-play-button" class="app-store-button" target="_blank" href='https://play.google.com/store/apps/details?id=at.sos.polarstern.app&hl=de_AT&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <g-image src='~/assets/img/GooglePlayDownload.png' alt='Jetzt bei Google Play' class="img-fluid"></g-image>
              </a>
              <a id="app-store-button" class="app-store-button" target="_blank" href="https://apps.apple.com/at/app/polarstern/id1477830653">
                <g-image src="~/assets/img/AppStoreDownload.png" alt="Laden im App Store" class="img-fluid"></g-image>
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="post-section">
      <div class="rectangle">

      </div>
      <div class="triangle-topright">

      </div>
      <b-container class="box-list">
        <b-row>
          <StudentBlogpost  v-for="(blogpost, index) in Student.blogposts" 
                            :key="blogpost.id"
                            :index="index"/>
        </b-row>
      </b-container>
      <BookWorkshopBanner/>
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
import StudentBlogpost from '~/components/Student-Blogpost.vue'
import SOSLogo from '~/components/SOS-Logo.vue'
import BookWorkshopBanner from '~/components/Book-Workshop-Banner.vue'
import Start from '~/data/Start.yml'
import Student from '~/data/Student.yml'
import VueMarkdown from 'vue-markdown'

export default {
  metaInfo: {
    title: 'Junge Menschen'
  },
  components: {
    Layout,
    StudentBlogpost,
    SOSLogo,
    VueMarkdown,
    BookWorkshopBanner
  },
  computed: {
    Start() {
      return Start
    },
    Student() {
      return Student
    }
  },
  data() {
    return {
      secondSectionScrolled: false
    }
  },
  methods: {
    viewHandlerSecondSection(e) {
      if (e.type == "enter") {
        this.secondSectionScrolled = true
      }
    }
  }
}
</script>

<style lang="scss">
  // Typography
  @import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap');
  h3 {
    font-family: 'Chau Philomene One', sans-serif;
    text-transform: uppercase;
    font-weight: 400;
  }
  p {
    font-family: 'Roboto', sans-serif;
    font-weight: 200;
  }


  // Elements
  .main-wrapper {
    
    .header-image-wrapper {
      min-height: 70vh;
      position: relative;
      overflow-x: hidden;
      img.background {
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
        transform: translateX(-10vw) scaleX(1.2);
        border-bottom: 50vh solid var(--blue);
        border-left: 100vw solid transparent;
        position: absolute;
      }
      .container-wrapper {
        bottom: 0;
        // position: absolute;
        width: 100%;
        margin-top: 300px;
      }
      .user-column:nth-of-type(1) {
        .user-box img {
          width: 200px;
        }
      }

      .user-column:nth-of-type(2) {
        .user-box {
          margin-bottom: 60px;

          img {
            width: 280px;
          }
        }
      }
      .user-column:nth-of-type(3) {
        .user-box {
          margin-bottom: 240px;
          img {
            width: 200px;
          }
        }
      }
    }
    .animation-section {
      background-color: #fff;
      .container {
        margin-top: 3rem;
        margin-bottom: 3rem;
        .col-12 {
          opacity: 0;
        }
        h1 {
          font-family: 'Chau Philomene One', sans-serif;
          text-transform: uppercase;
          font-size: 44px;
        }
        iframe {
          height: 420px;
          @media screen and (max-width: 991px) {
            margin: 1rem 0;
          }
          @media screen and (max-width: 575px) {
            height: 340px;
          }
        }
        @media screen and (max-width: 575px){
          margin-bottom: 1.2rem;
        }
      }
      .app-store-buttons-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2.5rem 0 1rem;

        .app-store-button {
          margin: 0 0.7rem;
        }

        @media screen and (max-width: 319px){
          flex-direction: column;
          margin: 0;

          .app-store-button {
            margin-bottom: 0.8rem;
            text-align: center;
            img {
              width: 80%;
            }
          }
        }
      }
    }

    .post-section {
      background-color: #fff;
      position: relative;
      overflow: hidden;

      .rectangle {
        display: block;
        width: 100%;
        height: 190px;
        background-color: var(--red);
        position: absolute;
      }
      .triangle-topright {
        width: 0;
        height: 0;
        border-top: 13vh solid var(--red);
        border-left: 100vw solid transparent;
        position: absolute;
        display: block;
        top: 190px;
      }

      .user-column:nth-of-type(2n+1) .user-box img {
        width: 200px;
      }
      .user-column:nth-of-type(2n+2) .user-box img {
        width: 280px;
      }
      .user-column:nth-of-type(2n+3) .user-box img {
        width: 280px;
      }
      .user-column:nth-of-type(2n+4) .user-box img {
        width: 200px;
      }
    }
  }
  .user-box {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 0 1.5em 0.4em;
  }
  .user-column {
    align-self: baseline;
  }
  @media screen and (max-width: 767px) {
    .user-column {
      text-align: left;
    }
    .header-image-wrapper {
      

      .container-wrapper {
        bottom: unset;
        top: 220px;
        margin-top: 170px !important;
      }
      .user-box {
        margin-bottom: 20px !important;
      }

      .user-column:nth-of-type(1) {
        .user-box img {
          width: 140px !important;
        }
      }

      .user-column:nth-of-type(2) {
        .user-box {
          margin-bottom: 60px;
          margin-left: 15%;
          img {
            width: 220px !important;
          }
        }
      }
      .user-column:nth-of-type(3) {
        .user-box {
          margin-bottom: 240px;
          margin-left: 40%;
          img {
            width: 140px !important;
          }
        }
      }
    }
  }
</style>