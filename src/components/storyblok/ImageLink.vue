<template>
  <div v-editable="blok" :class="blok.justify">
    <a v-if="blok.link_url.cached_url || blok.link_url.email" 
       :href="getLink">
      <b-img 
        :src="blok.image_url.filename" 
        :alt="blok.image_url.alt" 
        :width="blok.width"
        fluid/>
    </a>
    <b-img v-else 
      :src="blok.image_url.filename" 
      :alt="blok.image_url.alt" 
      :width="blok.width"
      fluid/>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    getLink() {
      switch (this.blok.link_url.linktype) {
        case "story":
          return this.blok.link_url.cached_url
        case "url":
          if (this.blok.link_url.url.includes("https://") || this.blok.link_url.url.includes("http://"))
            return this.blok.link_url.url
          else
            return "http://" + this.blok.link_url.url
        case "email":
          return "mailto:" + this.blok.link_url.email
        default:
          return this.blok.link_url.cached_url
      }
    },
    styles() {
      var inlineStyles = ''
      // TODO: build inline styles string
      // TODO: use numeric parameters in CMS
      return inlineStyles
      
    }
  }
}
</script>