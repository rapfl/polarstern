<template>
  <b-col  v-if="existsInList($page.posts.edges, Teacher.blogposts[index])"
          cols="12"
          :md="md"
          class="animated"
          v-bind:class="{fadeInUp: blogpostScrolled}"
          v-view="viewHandler">
    <g-link :to="getCurrentPost($page.posts.edges, Teacher.blogposts[index]).path" class="user-box teacher border border-warning" 
          v-bind:style="getBackgroundImage($page.posts.edges, Teacher.blogposts[index], $page.meta.siteUrl)">
          <div class="title">
            <h3>{{getCurrentPost($page.posts.edges, Teacher.blogposts[index]).excerpt}}</h3>
            <h4>{{getCurrentPost($page.posts.edges, Teacher.blogposts[index]).title}}</h4>
          </div>
    </g-link>
  </b-col>
</template>

<page-query>
  query Posts {
    posts: allPost {
      edges {
        node {
          id
          title
          excerpt
          button_text
          featured_image
          path
        }
      }
    },
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
import Teacher from '~/data/Teacher.yml'

export default {
  computed: {
    Teacher() {
      return Teacher
    }
  },
  data() {
    return {
      blogpostScrolled: false
    }
  },
  methods: {
    existsInList(list, item) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].node.title == item) {
          return true
        }
      }
      return false
    },
    getCurrentPost(list, item) {
      for(let i = 0; i < list.length; i++) {
        if (list[i].node.title == item) {
          return list[i].node;
        }
      }
      return list[0].node;
    },
    getBackgroundImage(list, item, siteUrl) {
      let styles = '';
      if (siteUrl.length) {
        // var gradientStyle = "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.41780462184873945) 100%)";
        for(let i = 0; i < list.length; i++) {
          if (list[i].node.title == item) {
            if (list[i].node.featured_image) {
              styles = "background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url('" + siteUrl + list[i].node.featured_image + "');"
              break;
            }
          }
        }
      }
      return styles;
    },
    viewHandler(e) {
      if (e.type == "enter") {
        this.blogpostScrolled = true
      }
    }
  },
  props: {
    index: Number,
    cols: Number,
    md: Number
  }  
}
</script>

<style lang="scss">
  .user-box.teacher {
    background-size: cover !important;
    background-position-x: center !important;
    height: 350px;
    display: grid;
    justify-content: center;
    text-align: center;
    align-content: end;
    transition: .32s ease-in-out;
    z-index: 10;
    text-decoration: none;
    .title {
      margin-bottom: 1em;
    }
  }
  .user-box.teacher:hover {
    transform: scale(0.9);
  }
</style>