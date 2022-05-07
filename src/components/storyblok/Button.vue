<template>
  <div v-editable="blok">
    <a v-if="blok.button_link.cached_url || blok.button_link.email" :href="getLink" 
        class="storyblok-btn-wrapper" 
        :class="styles">
      <b-button
        pill
        :block="blok.full_width"
        :size="blok.button_size" 
        :variant="blok.button_color"
        :class="blok.is_bg_button ? 'bg-btn-wrapper' : '' ">
        <span :class="blok.is_bg_button ? ('text-bg bg-' + blok.button_color) : '' ">
          {{ blok.button_label }}
        </span>
      </b-button>
    </a>
    <div v-else :class="styles" class="storyblok-btn-wrapper" >
      <b-button 
        pill
        :block="blok.full_width"
        :size="blok.button_size" 
        :variant="blok.button_color"
        :class="blok.is_bg_button ? 'bg-btn-wrapper' : '' ">
        <span :class="blok.is_bg_button ? ('text-bg bg-' + blok.button_color) : '' ">
          {{ blok.button_label }}
        </span>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    getLink() {
      switch (this.blok.button_link.linktype) {
        case "story":
          return this.blok.button_link.cached_url
        case "url":
          if (this.blok.button_link.url.includes("https://") || this.blok.button_link.url.includes("http://"))
            return this.blok.button_link.url
          else
            return "http://" + this.blok.button_link.url
        case "email":
          return "mailto:" + this.blok.button_link.email
        default:
          return this.blok.button_link.cached_url
      }
    },
    styles() {
      var inlineStyles = ''

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
      
      return inlineStyles
    }
  }
}
</script>

<style lang="scss">
.storyblok-btn {
  &-wrapper {
    &:hover {
      text-decoration: none;
    }
  }
}
</style>