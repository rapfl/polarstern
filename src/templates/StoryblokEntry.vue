<template>
  <Layout>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </Layout>
</template>
 
<script>
export default {
  mounted() {
    var optOutButton = document.querySelectorAll("a[href='#app-opt-out']");
    optOutButton[0].onclick = function() {
      window.klaro.show();
    }
  },
  name: 'StoryblokEntryTemplate',
  computed: {
    story () {
      return this.$page.storyblokEntry
    }
  }
}
</script>
 
<page-query>
query StoryblokEntry ($id: ID) {
  storyblokEntry (id: $id) {
    id
    slug
    content
  }
}
</page-query>