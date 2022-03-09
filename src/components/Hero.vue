<template>
  <section class="hero-wrapper">
      <h1><span>Eine Starke Jungend Für Eine Starke Zukunft</span></h1>
      <!-- TODO: Background Image -->
      <!-- TODO: Background Video -->
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .hero-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    background-color: var(--red);

    h1 {
      color: white;
      text-align: center;
      span {
        background-color: black;
        -webkit-box-decoration-break: clone;
	      box-decoration-break: clone;
      }
    }
  }
</style>