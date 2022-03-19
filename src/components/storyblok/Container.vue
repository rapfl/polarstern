<template>
  <b-container v-editable="blok" :style="marginStyles">
    <b-row>
      <b-col :key="blok._uid" v-for="blok in blok.columns">
      <component :blok="blok" :is="blok.component"></component>

      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    marginStyles() {
      var marginTop = `margin-top: ${this.blok.margin_top}px;`
      var marginBottom = `margin-bottom: ${this.blok.margin_bottom}px;`

      return marginTop + marginBottom
    }
  }
}
</script>

<style>

</style>