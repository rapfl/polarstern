<template>
  <footer>
    <b-container>
      <b-row class="sos-logo pt-4 pb-5">
        <b-col lg="6" cols="12" class="company-logo-wrapper chau-font text-left">
          <h4 class="mb-3">{{footerLogos.headline_left}}</h4>
          <ClientOnly>
            <ImageLink :blok="footerLogos.logos_left[0]" />
          </ClientOnly>
        </b-col>
        <b-col lg="6" cols="12" class="company-logo-wrapper chau-font text-sm-left text-lg-right mt-lg-0 mt-5">
          <h4 class="mb-3">{{footerLogos.headline_right}}</h4>
          <ClientOnly>
            <ImageLink :blok="footerLogos.logos_right[0]" class="text-sm-left text-lg-right"/>
          </ClientOnly>
        </b-col>
      </b-row>  
      <b-row>
        <b-col v-for="footerPage in footerPages" :key="footerPage._uid" cols="6" md="3" class="mb-2" >
          <a class="footer-menu-item" :href="getLink(footerPage.link)">
            {{footerPage.title}}
          </a>
        </b-col>
      </b-row>
    </b-container>
  </footer>  
</template>

<static-query>
  query {
    allStoryblokEntry {
      edges {
        node {
          name
          full_slug
          content
        }
      }
    }
  }
</static-query>

<script>
import ImageLink from '~/components/storyblok/ImageLink.vue'

export default {
  components: {
    ImageLink
  },
  computed: {
    edges () {
      return this.$static.allStoryblokEntry.edges || []
    },
    footerPages () {
      var footerPagesArr = []
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].node.full_slug == 'global/footer')
          footerPagesArr = this.edges[i].node.content.footer_pages
      }
      return footerPagesArr
    },
    footerLogos () {
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].node.full_slug.includes("global/footer")) {
          return this.edges[i].node.content
        }
      }
      return null
    },
  },
  methods: {
    getLink(blok) {
      switch (blok.linktype) {
        case "story":
          return ('/' + blok.cached_url)
        case "url":
          if (blok.url.includes("https://") || blok.url.includes("http://"))
            return blok.url
          else
            return "http://" + blok.url
        case "email":
          return "mailto:" + blok.email
        default:
          return blok.cached_url
      }
    },
  }
}
</script>

<style lang="scss">
  // TODO: Fix sizing of logos
  .logo-section {
    background-color: var(--white); 
    // padding: 1rem;
    .company-logo-wrapper {

      margin-top: 1.5rem;

      h4 {
        font-family: 'Chau Philomene One', sans-serif;
        margin: 0;
        margin-bottom: 20px;
        font-weight: 200;
      }

      @media screen and (min-width: 768px) {
        grid-template-rows: auto;
        grid-template-columns: auto auto;
        margin-top: 0;
        p {
          justify-self: right;
        }
        a {
          justify-self: left;
        }
      } 
    }
  }
  footer {
    background-color: var(--white);
    padding: 1rem;
    a {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      color: var(--black);
    }
    .col-sm-3 {
      text-align: center;
      margin: 0.8rem 0;
    }
    .footer-menu-item {
      display: inline;
    }
  }
  
</style>