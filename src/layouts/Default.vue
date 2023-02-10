<template>
  <div class="main-wrapper post">
    <Header/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/storyblok/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

</style>