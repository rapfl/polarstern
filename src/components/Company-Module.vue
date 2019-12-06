<template>
  <b-tab :title="'Angebot ' + (index+1)">
    <div class="company-box">
      <div class="heading">
        <h2>{{getCurrentPost($page.companyOffers.edges, Unternehmen.company_offers[index]).title}}</h2>
        <h3>Angebot {{(index+1)}}</h3>
      </div>
      <div class="content">
        <vue-markdown class="markdown-body">{{getCurrentPost($page.companyOffers.edges, Unternehmen.company_offers[index]).content}}</vue-markdown>
      </div>
      <a :href="'mailto:info@polarstern.me?subject=Anfrage%20Unternehmensangebot%20' + (index+1)">
        <b-button pill variant="primary">
          Anfrage schicken
        </b-button>
      </a>
    </div>
  </b-tab>
</template>

<page-query>
query {
  companyOffers: allCompanyOffer {
    edges {
      node {
        title
        content
      }
    }
  }
}
</page-query>

<script>
import Unternehmen from '~/data/footer/Unternehmen.yml'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  computed: {
    Unternehmen() {
      return Unternehmen
    }
  },
  methods: {
    getCurrentPost(list, item) {
      for(let i = 0; i < list.length; i++) {
        if (list[i].node.title == item) {
          return list[i].node;
        }
      }
      return list[0].node;
    },
  },
  props: {
    index: Number
  }
}
</script>

<style lang="scss">
  .company-box {
    width: 100%;
    background-color: #fff;
    margin: 0 0 5rem 0;
    padding: 2rem;
    transition: box-shadow 200s linear;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      h2, h3 {
        font-family: 'Chau Philomene One', sans-serif;
        text-transform: uppercase;
        margin: 1.5rem 0;
      }
    }
    .content {
      margin: 1rem 0;
    }
  }
  @media screen and (max-width: 575px) {
    .heading {
      flex-wrap: wrap;
      h2, h3 {
        margin: 1rem 0 !important;
      }
    }
  }
</style>