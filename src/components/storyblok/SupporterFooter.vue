<template v-if="footerLogos">
  <div class="logo-section" v-editable>
    <!-- TODO: How to set global fields? -->
    <b-container>
      <b-row class="sos-logo">
        <b-col lg="6" cols="12" class="company-logo-wrapper">
          <h4>{{footerLogos.headline_left}}</h4>
          <ClientOnly>
            <ImageLink v-for="logo in footerLogos.logos_left" :key="logo._uid" :blok="logo" />
          </ClientOnly>
        </b-col>
        <b-col lg="6" cols="12" class="company-logo-wrapper text-sm-left text-lg-right">
          <h4>{{footerLogos.headline_right}}</h4>
          <b-container style="margin-top: 16px">
            <b-row>
              <b-col xl="5" lg="5" md="5" sm="5" cols="5" class="text-center" align-self="center">
                <ClientOnly>
                  <ImageLink :blok="footerLogos.logos_right[0]" />
                </ClientOnly>
              </b-col>
              <b-col xl="3" lg="3" md="3" sm="3" cols="3" class="text-center" align-self="center">
                <ClientOnly>
                  <ImageLink :blok="footerLogos.logos_right[1]" />
                </ClientOnly>
              </b-col>
              <b-col xl="4" lg="4" md="4" sm="4" cols="4" class="text-center" align-self="center">
                <ClientOnly>
                  <ImageLink :blok="footerLogos.logos_right[2]" />
                </ClientOnly>
              </b-col>

              
            </b-row>
          </b-container>
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
import Column from '~/components/storyblok/Column.vue'
import ImageLink from '~/components/storyblok/ImageLink.vue'

export default {
  components: {
    ImageLink,
    Column
  },
  computed: {
    edges () {
      return this.$static.allStoryblokEntry.edges || []
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
}
</script>

<style lang="scss">
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
</style>