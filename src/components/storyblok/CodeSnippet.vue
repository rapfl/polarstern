<template>
  <div v-editable="blok">
    <div v-html="blok.code_snippet"></div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>