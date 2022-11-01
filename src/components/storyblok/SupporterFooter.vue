<template v-if="footerLogos">
  <div class="logo-section pt-5 pb-4" v-editable>
    <!-- TODO: In future: as a preset component without global fields -->
    <b-container>
      <b-row class="sos-logo">
        <b-col lg="6" cols="12" class="company-logo-wrapper">
          <h4>{{footerLogos.headline_left}}</h4>
          <ClientOnly>
            <ImageLink :blok="footerLogos.logos_left[0]" />
          </ClientOnly>
        </b-col>
        <b-col lg="6" cols="12" class="company-logo-wrapper text-sm-left text-lg-right mt-lg-0 mt-5">
          <h4>{{footerLogos.headline_right}}</h4>
          <ClientOnly>
            <ImageLink :blok="footerLogos.logos_right[0]" class="text-sm-left text-lg-right"/>
          </ClientOnly>
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
</style>