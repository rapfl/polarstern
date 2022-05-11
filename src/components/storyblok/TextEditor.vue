<template>
  <richtext 
    v-editable="blok" 
    :text="blok.richtext" 
    :class="styles"
    class="w-100"/>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    styles() {
      var classes = ''
      if (this.blok.alignment) classes += (this.blok.alignment + ' ')
      if (this.blok.has_pill_bg) classes += 'rounded-pill bg-pill '
      if (this.blok.bg_color) classes += (this.blok.bg_color + ' ')
      if (this.blok.border_color) classes += ('pill-border ' + this.blok.border_color + ' ')
      if (this.blok.font_color) classes += this.blok.font_color
      return classes
    }
  }
}
</script>

<style>

</style>