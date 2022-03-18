<template>
<div class="logo-section">
  <b-container>
    <b-row class="sos-logo">
      <b-col cols="6" class="company-logo-wrapper">
        <h4>{{SOSFooter.sos_kinderdorf_text}}</h4>
        <a :href="SOSFooter.sos_kinderdorf_link">
          <g-image :src="$static.meta.siteUrl + SOSFooter.sos_kinderdorf_logo" width="370" class="company-logo img-fluid"></g-image>
        </a>
      </b-col>
      <b-col cols="6" class="company-logo-wrapper">
        <h4>{{SOSFooter.sos_kinderdorf_text}}</h4>
        <a :href="SOSFooter.sos_kinderdorf_link">
          <g-image :src="$static.meta.siteUrl + SOSFooter.sos_kinderdorf_logo" width="370" class="company-logo img-fluid"></g-image>
        </a>
      </b-col>
    </b-row>  
  </b-container>
</div>
</template>

<static-query>
  query Meta {
  	meta: metadata {
      siteUrl
    }
  }
</static-query>

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
    padding: 1rem;
    .company-logo-wrapper {

      margin-top: 1.5rem;

      h4 {
        font-family: 'Chau Philomene One', sans-serif;
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