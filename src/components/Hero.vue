<template>
  <section class="hero-section">
    <div class="hero-wrapper">
      <h1><span>{{heroString}}</span></h1>
    </div>
    <g-image v-if="!showVideo" :src="heroImage" class="hero-bg">
    </g-image>
    <video v-else autoplay muted loop playsinline class="hero-bg">
      <source type="video/mp4" :src="heroVideo" />
    </video>
  </section>
</template>

<script>
export default {
  props: {
    showVideo: {
      type: Boolean,
      default: false
    },
    heroImage: {
      type: String,
      default: "/uploads/coolkids.jpeg"
    },
    heroVideo: {
      type: String,
      default: "/uploads/lifestylevid.mp4"
    },
    heroString: {
      type: String,
      default: "Eine Starke Jungend Für Eine Starke Zukunft"
    },
  }
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