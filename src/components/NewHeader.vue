<template>
  <header class="header-wrapper">
    <div class="header-new">
      <div class="header-elements"></div>
      <div class="header-elements"><g-link to="/junge-menschen">{{Menu.student_label}}</g-link></div>
      <div class="header-elements"><g-link to="https://polarstern.thinkific.com/courses/starken-entdecken"</g-link></div>
      <div class="header-elements"><g-link to="/"><g-image src="~/assets/img/Polarstern_Logo.png" width="200"></g-image></g-link></div>
      <div class="header-elements"><g-link>Lehrmaterial</g-link></div>
      <div class="header-elements"><g-link to="/workshops">{{Menu.workshop_label}}</g-link></div>
      <div class="header-elements "><g-link to="/workshops" class="yellow-box">Workshop Buchen</g-link></div>
    </div>
    <div class="header">
      <tasty-burger-button
          v-if="!isStartScreen" 
          :type="buttonType" 
          :active="isActive" 
          :size="size" 
          :color="color" 
          :active-color="activeColor"
          @toggle="toggleMenu"/>
    
    <div v-if="!isStartScreen" class="header-menu " :class="{active: showMenu}">
      <ul>
        <li><g-link to="/junge-menschen">{{Menu.student_label}}</g-link></li>
        <li><g-link>Online-Kurs</g-link></li>
        <li><g-link>Lehrmaterial</g-link></li>
        <li><g-link to="/workshops">{{Menu.workshop_label}}</g-link></li>
      </ul>
    </div>
      <div class="header-elements"><g-link to="/"><g-image src="~/assets/img/Polarstern_Logo.png" width="200"></g-image></g-link></div>
      <div class="header-elements"><g-link to="/workshops" class="yellow-box">Workshop Buchen</g-link></div>
    </div>
  </header>
  
</template>

<script>
import Menu from '~/data/settings/Menu.yml'
export default {
  data () {
    return {
      buttonType: 'elastic',
      isActive: false,
      size: 'xl',
      color: '#ffffff',
      activeColor: '#ffffff',
      showMenu: false
    }
  },
  computed: {
    Menu() {
      return Menu
    }
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu
    }
  },
  props: {
    isStartScreen: Boolean
  }
}
</script>

<style lang="scss">
  .main-wrapper.landing,
  .main-wrapper.post,
  .main-wrapper.start {
    .header-new {
      display: none;
    }
    .header {
        background-color: var(--red);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        position: fixed;
        width: 100%;
        z-index: 110;
        padding: 0.4em;
        a {
          justify-self: center;
          img {
            width: 95px;
            @media screen and (max-width: 767px) {
              width: 60px;
            }
          }
        }
        button {
          justify-self: start;
          margin-left: 10%;
          align-self: center;
          opacity: 1 !important;
        }
      }
  }
  .header img {
    transition: .2s;
  }
  .header-elements {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
    a {
      color: white
    }
  }
  .yellow-box {
    transition: .9s ease-in-out;
    background:#FFE100;
    max-width: 126px;
    max-height: 45px;
    border-radius: 23px;
    text-align: center;
    color: black !important;
    font-family: 'Chau Philomene One';
    font-size: 16px;
    font-weight: bold;
    &:hover {
      text-decoration: none;
      transform: scale(1.1);
    }
  }
  .header-menu {
    background-color: var(--red);
    height: auto;
    width: 292px;
    position: fixed;
    left: 0%;
    z-index: 100;
    top: 99px;
    transform: translateY(-600px);
    transition: .4s ease-in-out;
    padding-top: 10px;
    ul {
      list-style: none;
      li {
        margin: 1.2rem 0;
        text-align: left;
        a {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 20px;
          color: var(--white);
          text-decoration: none;
        }
        a:hover,
        a.active.active--exact {
          color: var(--yellow);
        }
      }
    }
    @media screen and (max-width: 767px){
      top: 72px;
    }
  }
  .header-menu.active {
    transform: translateY(0);
  }
  @media screen and (min-width: 996px) {
    .main-wrapper.landing,
    .main-wrapper.post,
    .main-wrapper.start {
      .header-new {
        background-color: var(--red);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        position: fixed;
        width: 100%;
        z-index: 110;
        padding: 0.4em;
        a {
          grid-column: 2 / 2;
          justify-self: center;
          img {
            width: 95px;
            @media screen and (max-width: 767px) {
              width: 60px;
            }
          }
        }
        button {
          grid-column: 3 / 3;
          justify-self: end;
          margin-right: 10%;
          align-self: center;
          opacity: 1 !important;
        }
      }
      .header {
        display: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .header-menu {
      right: 0;
    } 
  }

</style>