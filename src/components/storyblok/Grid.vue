<template>
  <div 
    class="grid" 
    v-editable="blok" 
    :style="'background-color: ' + blok.background_color.color">
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