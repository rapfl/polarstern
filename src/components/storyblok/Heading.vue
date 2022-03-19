<template>
  <div v-editable="blok" 
       :style="'text-align: ' + blok.justify" 
       class="heading-block"
       :class="blok.font">
    <h1 v-if="blok.hierarchy == 'h1'">{{blok.heading}}</h1>
    <h2 v-if="blok.hierarchy == 'h2'">{{blok.heading}}</h2>
    <h3 v-if="blok.hierarchy == 'h3'">{{blok.heading}}</h3>
    <h4 v-if="blok.hierarchy == 'h4'">{{blok.heading}}</h4>
    <h5 v-if="blok.hierarchy == 'h5'">{{blok.heading}}</h5>
    <h6 v-if="blok.hierarchy == 'h6'">{{blok.heading}}</h6>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>