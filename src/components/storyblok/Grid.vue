<template>
  <div 
    class="grid" 
    v-editable="blok" 
    :style="'background: ' + (blok.show_bg_image ? 'url(' + blok.background_image.filename + ')' : blok.background_color.color )">
      <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
  </div>
</template>
 
<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">

  .grid {
    max-width: initial;
  }

</style>