<template>
<div class="logo-section">
  <b-container>
    <b-row class="sos-logo">
      <b-col cols="12" class="company-logo-wrapper">
        <p>{{SOSFooter.sos_kinderdorf_text}}</p>
        <a :href="SOSFooter.sos_kinderdorf_link">
          <g-image :src="$page.meta.siteUrl + SOSFooter.sos_kinderdorf_logo" width="370" class="company-logo img-fluid"></g-image>
        </a>
      </b-col>
    </b-row>  
  </b-container>
</div>
</template>

<page-query>
  query Meta {
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
import SOSFooter from '~/data/settings/SOS-Kinderdorf-Footer.yml'
export default {
  computed: {
    SOSFooter() {
      return SOSFooter
    }
  },
  props: [
    'src'
  ]
}
</script>

<style lang="scss">
  .logo-section {
    background-color: var(--white); 

    .company-logo-wrapper {
      display: grid;
      text-align: center;
      align-items: center;
      grid-template-rows: auto auto;
      grid-template-columns: auto;
      margin-top: 1.5rem;

      p {
        font-family: Roboto, sans-serif;
        font-size: 20px;
        margin: 0;
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