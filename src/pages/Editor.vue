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
const getParam = function(val) {
  var result = '',
      tmp = []
  location.search
    .substr(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=')
      if (tmp[0] === val) result = decodeURIComponent(tmp[1])
  })
  return result
}
 
const loadStoryblokBridge = function(cb) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${getParam('token')}`
  script.onload = cb
  document.getElementsByTagName('head')[0].appendChild(script)
}
 
export default {
  name: 'EditorPage',
  data() {
    return {
      story: {content: {}},
      oldPath: ''
    }
  },
  computed: {
    globalData () {
      return this.$page.global.edges[0].node
    }
  },
  mounted() {
    loadStoryblokBridge(() => { this.initStoryblokEvents() })
  },
  methods: {
    loadStory() {
      const path = getParam('path')
 
      if (path !== '') {
        this.oldPath = path
      }
 
      window.storyblok.get({
        slug: path || this.oldPath,
        version: 'draft'
      }, (data) => {
        this.story = data.story
      })
    },
    initStoryblokEvents() {
      this.loadStory()
      let sb = window.storyblok
      sb.on(['change', 'published'], (payload) => {
        this.loadStory()
      })
      sb.on('input', (payload) => {
        if (this.story && payload.story.id === this.story.id) {
          payload.story.content = sb.addComments(payload.story.content, payload.story.id)
          this.story = payload.story
        }
      })
      sb.pingEditor(() => {
        if (sb.inEditor) {
          sb.enterEditmode()
        }
      })
    }
  }
}
</script>