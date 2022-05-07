<template>
  <div v-editable="blok" 
       :style="'text-align: ' + blok.justify" 
       class="heading-block"
       :class="blok.font">
    <h1 v-if="blok.hierarchy == 'h1'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h1>
    <h2 v-if="blok.hierarchy == 'h2'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h2>
    <h3 v-if="blok.hierarchy == 'h3'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h3>
    <h4 v-if="blok.hierarchy == 'h4'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h4>
    <h5 v-if="blok.hierarchy == 'h5'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h5>
    <h6 v-if="blok.hierarchy == 'h6'">
      <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h6>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>