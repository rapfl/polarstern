<template>
    <div 
      class="strength-heading-pill"
      :class="color">
      <h2>{{title}}</h2>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    index: Number
  },
  computed: {
    color() {
      switch(this.index) {
        case 0:
          return "blue"
        case 1: 
          return "red"  
        case 2: 
          return "yellow-dark"
        case 3: 
          return "yellow-mono"
        default: 
          return "blue"
      }
    }
  }
}
</script>

<style lang="scss">
  .strength-heading-pill {
    text-align: center;
    padding: 0.4em 0;
    border: 4px solid;
    border-radius: 40px;
    h2 {
      margin: 0;
      font-family: 'Roboto', sans-serif;
      font-size: 24px;
      font-weight: 600;
    }
  }
</style>