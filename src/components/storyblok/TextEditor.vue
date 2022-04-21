<template>
  <richtext 
    v-editable="blok" 
    :text="blok.richtext" 
    :class="blok.alignment"/>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>