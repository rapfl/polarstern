<template>
  <b-container v-editable="blok" :style="marginStyles">
    <b-row>
      <Column v-for="col in blok.columns" :key="col._uid" :blok="col"/>
    </b-row>
  </b-container>
</template>

<script>
import Column from '~/components/storyblok/Column.vue'
export default {
  props: ['blok'],
  components: {
    Column
  },
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