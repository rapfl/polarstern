<template>
  <div v-editable="blok">
    <a class="storyblok-btn-wrapper" v-if="blok.button_link.cached_url || blok.button_link.email" :href="getLink">
      <b-button
        pill
        :block="blok.full_width"
        :size="blok.button_size" 
        :variant="blok.button_color"
        :class="blok.is_bg_button ? 'bg-btn-wrapper' : '' ">
        <span :class="blok.is_bg_button ? 'background-button' : '' ">
          {{ blok.button_label }}
        </span>
      </b-button>
    </a>
    <b-button v-else
      pill
      :block="blok.full_width"
      :size="blok.button_size" 
      :variant="blok.button_color"
      :class="blok.is_bg_button ? 'bg-btn-wrapper' : '' ">
      <span :class="blok.is_bg_button ? 'background-button' : '' ">
        {{ blok.button_label }}
      </span>
    </b-button>
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