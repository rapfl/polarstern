<template>
  <b-tab :title="'Modul ' + (index+1)">
    <div class="workshop-box">
      <div class="heading">
        <h2>{{getCurrentPost($page.workshops.edges, Workshops.workshops[index]).title}}</h2>
        <h3>Modul {{(index+1)}}</h3>
      </div>
      <div class="content">
        <vue-markdown class="markdown-body">{{getCurrentPost($page.workshops.edges, Workshops.workshops[index]).content}}</vue-markdown>
      </div>
      <b-button pill v-b-toggle="'workshop-form-wrapper-' + (index+1)" variant="primary">
        Jetzt Termin anfragen
      </b-button>
      <b-collapse :id="'workshop-form-wrapper-' + (index+1)" class="mt-3">
        <WorkshopForm :module_id="(index+1)" :name="getCurrentPost($page.workshops.edges, Workshops.workshops[index]).title + ' Anfragen'"/>
      </b-collapse>
    </div>
  </b-tab>
</template>

<page-query>
query {
  workshops: allWorkshop {
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
import WorkshopForm from '~/components/Workshop-Form.vue'
import Workshops from '~/data/footer/Workshops.yml'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    WorkshopForm,
    VueMarkdown
  },
  computed: {
    Workshops() {
      return Workshops
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
  .workshop-box {
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