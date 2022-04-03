<template v-if="footerLogos">
  <div class="logo-section">
    <!-- TODO: How to set global fields? -->
    <b-container>
      <b-row class="sos-logo">
        <b-col lg="6" cols="12" class="company-logo-wrapper">
          <h4>{{footerLogos.headline_left}}</h4>
          <div class="d-flex justify-content-between align-items-center">
            <a v-for="logo in footerLogos.logos_left" :key="logo._uid" :href="logo.link_url.url">
              <g-image :src="logo.image_url.filename" width="370" class="company-logo img-fluid"></g-image>
            </a>
          </div>
        </b-col>
        <b-col lg="6" cols="12" class="company-logo-wrapper">
          <h4>{{footerLogos.headline_right}}</h4>
          <div class="d-flex justify-content-between align-items-center">
            <a v-for="logo in footerLogos.logos_right" :key="logo._uid" :href="logo.link_url.url">
              <g-image :src="logo.image_url.filename" width="370" class="company-logo img-fluid"></g-image>
            </a>
          </div>
        </b-col>
      </b-row>  
    </b-container>
  </div>
</template>

<static-query>
  query {
    allStoryblokEntry {
      edges {
        node {
          full_slug
          content
        }
      }
    }
  }
</static-query>

<script>
export default {
  computed: {
    edges () {
      return this.$static.allStoryblokEntry.edges || []
    },
    footerLogos () {
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].node.full_slug.includes("global/footer-logos")) {
          return this.edges[i].node.content
        }
      }
      return null
    },
  },
}
</script>

<style lang="scss">
  .logo-section {
    background-color: var(--white); 
    padding: 1rem;
    .company-logo-wrapper {

      margin-top: 1.5rem;

      h4 {
        font-family: 'Chau Philomene One', sans-serif;
        font-size: 20px;
        margin: 0;
        margin-bottom: 20px;
        font-weight: 200;
      }

      a {
        margin-right: 20px;
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
</style>