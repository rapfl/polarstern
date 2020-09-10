<template>
  <b-tab :title="'Workshop ' + romanize((index+1))">
    <div class="workshop-box">
      <div class="heading">
        <h2>{{getCurrentPost($page.workshops.edges, Workshops.workshops[index]).title}}</h2>
        <h3>Workshop {{romanize((index+1))}}</h3>
      </div>
      <div class="content">
        <vue-markdown class="markdown-body">{{getCurrentPost($page.workshops.edges, Workshops.workshops[index]).content}}</vue-markdown>
      </div>
      <b-button pill v-b-toggle="'workshop-form-wrapper-' + (index+1)" variant="primary">
        Jetzt Termine anfragen
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
    romanize(num) {
      if (isNaN(num))
        return NaN;
      var digits = String(+num).split(""),
          key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
          roman = "",
          i = 3;
      while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }
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
      h2 {
        margin: 1rem 2rem 1rem 0 !important
      }
      h3 {
        margin: 1rem 0 !important;
      }
    }
  }
</style>