<template>
  <header class="header-wrapper">
    <div class="header">
      <g-link to="/"><g-image src="~/assets/img/Polarstern_Logo.png" width="200"></g-image></g-link>
      <tasty-burger-button
          v-if="!isStartScreen" 
          :type="buttonType" 
          :active="isActive" 
          :size="size" 
          :color="color" 
          :active-color="activeColor"
          @toggle="toggleMenu"/>
    </div>
    <div v-if="!isStartScreen" class="header-menu " :class="{active: showMenu}">
      <ul>
        <li><g-link to="/workshops">{{Menu.workshop_label}}</g-link></li>
        <li><g-link to="/unternehmensangebote">{{Menu.company_label}}</g-link></li>
        <li><g-link to="/about">{{Menu.about_label}}</g-link></li>
        <li><g-link to="/junge-menschen">{{Menu.student_label}}</g-link></li>
        <li><g-link to="/paedagoginnen-unterstuetzerinnen-unternehmen">{{Menu.teacher_label}}</g-link></li>
        <li><g-link to="/contact">{{Menu.contact_label}}</g-link></li>
      </ul>
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
    .header {
      background-color: var(--red);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
  }
  .header img {
    transition: .2s;
  }
  .header-menu {
    background-color: var(--red);
    height: auto;
    width: 292px;
    position: fixed;
    right: 3%;
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
  @media screen and (max-width: 768px) {
    .header-menu {
      right: 0;
    }
  }

</style>