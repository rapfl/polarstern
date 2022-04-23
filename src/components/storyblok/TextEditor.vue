<template>
  <richtext 
    v-editable="blok" 
    :text="blok.richtext" 
    :class="blok.alignment"
    class="w-100"/>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>