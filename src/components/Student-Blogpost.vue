<template>
  <b-col  v-if="existsInList($page.posts.edges, Student.blogposts[index])"
      cols="12"
      md="6"
      v-bind:class="{fadeInUp: blogpostScrolled}"
      v-view="viewHandler"
      class="user-column student animated">
  <div>
    <div class="user-box student border border-warning">
      <g-image :src="getCurrentPost($page.posts.edges, Student.blogposts[index]).featured_image"></g-image>
    </div>
    <h3>{{getCurrentPost($page.posts.edges, Student.blogposts[index]).title}}</h3>
    <p>{{getCurrentPost($page.posts.edges, Student.blogposts[index]).excerpt}}</p>
    <g-link :to="getCurrentPost($page.posts.edges, Student.blogposts[index]).path">
      <b-button pill variant="primary">
        {{getCurrentPost($page.posts.edges, Student.blogposts[index]).button_text}}
      </b-button>
    </g-link>
  </div>
  </b-col>
</template>

<script>
import Student from '~/data/Student.yml'

export default {
  computed: {
    Student() {
      return Student
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
    viewHandler(e) {
      if (e.type == "enter") {
        this.blogpostScrolled = true
      }
    }
  },
  props: {
    index: Number
  }
}
</script>

<style lang="scss" scoped>
  .user-column {
    margin: 2rem 0;
    opacity: 0;
  }

</style>