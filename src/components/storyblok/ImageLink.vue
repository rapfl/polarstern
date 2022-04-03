<template>
  <div v-editable="blok">
    <a :href="blok.link_url">
      <img src="" alt="">
    </a>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>