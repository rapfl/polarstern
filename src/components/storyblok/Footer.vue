<template>
  <footer>
    <b-container>
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
export default {
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