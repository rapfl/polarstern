<template>
  <footer>
    <b-container>
      <b-row>
        <b-col v-for="footerPage in footerPages" :key="footerPage.content._uid" cols="4">
          <a class="footer-menu-item" :href="footerPage.full_slug">
            {{footerPage.name}}
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
          position
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
    footerPages () {
      var footerPagesArr = []
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].node.content.component == 'footerPage')
          footerPagesArr.push(this.edges[i].node)
      }
      footerPagesArr.sort((a, b) => b.position - a.position)
      return footerPagesArr
    }
  },
}
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