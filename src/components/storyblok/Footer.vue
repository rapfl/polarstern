<template>
  <footer>
    <b-container>
      <b-row>
        <b-col cols="6" sm="3">
          <g-link class="footer-menu-item" to="/impressum">Impressum</g-link>
        </b-col>
        <b-col cols="6" sm="3">
          <g-link class="footer-menu-item" to="/datenschutz">Datenschutz</g-link>
        </b-col>
        <b-col cols="6" sm="3">
          <g-link class="footer-menu-item" to="/contact">Schreibe eine E-Mail</g-link>
        </b-col>
        <b-col cols="6" sm="3">
          <g-link class="footer-menu-item" to="/about">Über uns</g-link>
        </b-col>
      </b-row>
    </b-container>
  </footer>  
</template>

<script>


</script>

<style lang="scss">
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