<template>
  <b-container v-editable="blok" :style="marginStyles">
    <b-row>
      <b-col 
        v-for="blok in blok.columns"
        :key="blok._uid"
        :cols="calculatedColumnSize[0]"
        :sm="calculatedColumnSize[1]"
        :md="calculatedColumnSize[2]"
        :lg="calculatedColumnSize[3]"
        :xl="calculatedColumnSize[3]">
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
    },
    calculatedColumnSize() {
      switch (this.blok.columns.length) {
        case 1:
          return [12, 12, 12, 12]
        case 2:
          return [12, 12, 6, 6]
        case 3:
          return [12, 4, 4, 4]
        case 4:
          return [12, 3, 3, 3]
        default:
          return [12, 12, 12, 12]
      }
    }
  }
}
</script>

<style>

</style>