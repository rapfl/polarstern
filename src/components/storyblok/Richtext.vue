<template>
  <div class="richtext">
    <div v-html="richtext"></div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  computed: {
    richtext() {
      return this.text ? this.$storyapi.richTextResolver.render(this.text) : ''
    }
  }
}
</script>

<style lang="scss">
  .richtext {
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Chau Philomene One', sans-serif;
    }
    p {
      font-family: 'Roboto', sans-serif;
    }
  }
</style>