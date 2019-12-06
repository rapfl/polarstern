<template>
  <div class="main-wrapper start">
    <g-image  :src="getBackgroundImageSrc($page.meta.siteUrl, 'Student')" 
              :class="backgroundImageStudent.active ? 'background-image active' : 'background-image'" width="1024"></g-image>
    <g-image  :src="getBackgroundImageSrc($page.meta.siteUrl, 'Teacher')" 
              :class="backgroundImageTeacher.active ? 'background-image active' : 'background-image'" width="1024"></g-image>
    <g-image  :src="getBackgroundImageSrc($page.meta.siteUrl, 'Default')" 
              :class="backgroundImageDefault.active ? 'background-image active' : 'background-image'" width="1024"></g-image>
    <div class="header-wrapper">
      <Header/>
    </div>
    <div class="start-box-container">
      <g-link class="start-button-box border border-warning" 
              to="/junge-menschen"> 
        <b-card
          :title="Start.title_student"
          title-tag="h2"
          :img-src="$page.meta.siteUrl + '/uploads/young_emoji.png'"
          img-alt="Strong Arm Emoji"
          align="center"
          tag="article"
          class="rounded-0 border-0"
          @mouseover="updateBackgroundImage(Start.background_student, 'Student')"
          @mouseleave="updateBackgroundImage(Start.background_default, 'Default')">
        </b-card>
      </g-link>
      <g-link class="start-button-box border border-warning" 
              to="/lehrer"> 
        <b-card
          :title="Start.title_teacher"
          title-tag="h2"
          :img-src="$page.meta.siteUrl + '/uploads/old_emoji.png'"
          img-alt="Suit Emoji"
          align="center"
          tag="article"
          class="rounded-0 border-0"
          @mouseover="updateBackgroundImage(Start.background_teacher, 'Teacher')"
          @mouseleave="updateBackgroundImage(Start.background_default, 'Default')">
        </b-card>
      </g-link>
    </div>
  </div>
</template>


<page-query>
  query Meta {
  	meta: metadata {
      siteUrl
    }
  }
</page-query>

<script>
  import Start from '~/data/Start.yml'
  import Header from '~/components/Header.vue'

  export default {
    components: {
      Header
    },
    computed: {
      Start() {
        return Start
      }
    },
    data() {
      return {
        backgroundImageDefault: {
          active: true,
          url: Start.background_default
        },
        backgroundImageStudent: {
          active: false,
          url: Start.background_student
        },
        backgroundImageTeacher: {
          active: false,
          url: Start.background_teacher
        }
      }
    },
    methods: {
      updateBackgroundImage: function(image, type) {
        if (type == "Student") {
          this.backgroundImageStudent.active = true;
          this.backgroundImageTeacher.active = false;
          this.backgroundImageDefault.active = false;
        } 
        else if (type == "Teacher") {
          this.backgroundImageStudent.active = false;
          this.backgroundImageTeacher.active = true;
          this.backgroundImageDefault.active = false;
        }
        else {
          this.backgroundImageStudent.active = false;
          this.backgroundImageTeacher.active = false;
          this.backgroundImageDefault.active = true;
        }
      },
      getBackgroundImageSrc: function(siteUrl, type) {
        if (type == "Student") {
          return siteUrl + this.backgroundImageStudent.url
        } 
        else if (type == "Teacher") {
          return siteUrl + this.backgroundImageTeacher.url
        }
        else {
          return siteUrl + this.backgroundImageDefault.url
        }
      }
    }
  }
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap');
.start-box-container {
  text-align: center;
  z-index: 10;
  margin-top: 7rem;
  .start-button-box {
    display: inline-block;
    border: 3px solid;
    vertical-align: middle;
    margin: 15px;
  }
  .start-button-box:hover {
    text-decoration: none;
  }
  .card {
    width: 19rem;
    height: 19rem;
    display: grid;
    grid-template-rows: 50% 50%;
    justify-items: center;
    transition: .2s;
    img {
      width: 140px;
      align-self: end;
      margin-bottom: 0.6em;
      @media screen and (min-width: 768px) and (max-width: 1199px){
        width: 110px;
      }
      @media screen and (max-width: 767px) {
        width: 80px;
      }
    }
  }
  .card:hover {
    background-color: var(--yellow);
  }
}
.main-wrapper {
  min-height: 100vh;
  position: relative;
}
.header-wrapper {
  z-index: 90;
}
.main-wrapper.start {
  display: grid;
  text-align: center;
  background-color: var(--blue);
  .background-image {
    position: absolute;
    width: 100vw;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: .4s;
    opacity: 0;
    padding-top: 106px;
    @media screen and (max-width: 767px) {
      padding-top: 72px;
    }
    
  }
  .background-image.active {
    opacity: 1;
  }
  h2 {
    color: #000;
    font-family: 'Chau Philomene One', sans-serif;
    text-transform: uppercase;
    margin: 0;
    @media screen and (max-width: 1199px){
      font-size: 24px;
    }
  }
}
@media screen and (max-width: 767px) {
  .start-box-container {
    .card {
      width: 14rem;
      height: 14rem;
    }
  }
}
@media screen and (min-width: 1200px) {
  .start-box-container {
    .card {
      width: 26rem;
      height: 26rem;
    }
  }
}

</style>