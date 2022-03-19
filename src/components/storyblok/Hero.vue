<template>
  <section class="hero-section" v-editable="blok">
    <div class="hero-wrapper">
      <h1><span>{{blok.headline}}</span></h1>
    </div>
    <g-image v-if="!blok.showVideo" :src="blok.heroImage.filename" class="hero-bg">
    </g-image>
    <video v-else autoplay muted loop playsinline class="hero-bg">
      <source type="video/mp4" :src="blok.heroVideo.filename" />
    </video>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
  .hero-section {
    position: relative;
    height: 70vh;

    .hero-wrapper {
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      justify-content: center;
      align-items: center;

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
    .hero-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
</style>