<template>
  <div id="social-buttons" class="social-buttons">
    <!-- TODO: Put buttons on bottom in mobile -->
    <a href="https://www.facebook.com/polarstern.me/">
      <g-image src="~/assets/img/facebook_logo.png" width="40"></g-image>
    </a>
    <a href="https://www.instagram.com/polarstern_wien/">
      <g-image src="~/assets/img/instagram_logo.png" width="40"></g-image>
    </a>
  </div>  
</template>

<style lang="scss">
  .social-buttons {
    position: fixed;
    right: 0;
    top: 220px;
    z-index: 80;
    background-color: #3b579d;
    @media screen and (max-width: 767px){
      position: absolute;
      bottom: 304px;
      right: 0;
      top: unset;
    }
    a {
      display: block;
      img {
        @media screen and (max-width: 575px) {
          width: 40px;
        }
      }
    }
  }
</style>