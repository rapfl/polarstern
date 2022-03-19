<template>
  <div class="main-wrapper post">
    <Header/>
    <slot/>
  </div>
</template>

<script>
import Header from '~/components/NewHeader.vue'

export default {
  components: {
    Header
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