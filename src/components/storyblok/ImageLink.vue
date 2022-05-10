<template>
  <div v-editable="blok" :class="styles">
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
      // TODO: Defensive if cases for undefined properties
      // Margin
      inlineStyles += ('mt-' + this.blok.margin.top + ' ')
      inlineStyles += ('mr-' + this.blok.margin.right + ' ')
      inlineStyles += ('mb-' + this.blok.margin.bottom + ' ')
      inlineStyles += ('ml-' + this.blok.margin.left + ' ')
      
      // Padding
      inlineStyles += ('pt-' + this.blok.padding.top + ' ')
      inlineStyles += ('pr-' + this.blok.padding.right + ' ')
      inlineStyles += ('pb-' + this.blok.padding.bottom + ' ')
      inlineStyles += ('pl-' + this.blok.padding.left + ' ')
      
      // Justify
      inlineStyles += this.blok.justify

      return inlineStyles
      
    }
  }
}
</script>