<template>
  <header class="header-wrapper">
    <div class="header-new">
      <div class="header-elements"></div>
      <div class="header-elements"><g-link to="/junge-menschen">{{Menu.student_label}}</g-link></div>
      <div class="header-elements"><a href="https://polarstern.thinkific.com/courses/starken-entdecken">Online-Kurs</a></div>
      <div class="header-elements"><g-link to="/"><g-image src="~/assets/img/Polarstern_Logo.png" width="200"></g-image></g-link></div>
      <div class="header-elements"><g-link>Lehrmaterial</g-link></div>
      <div class="header-elements"><g-link to="/workshops">{{Menu.workshop_label}}</g-link></div>
      <div class="header-elements "><g-link to="/workshops" class="yellow-box">Workshop Buchen</g-link></div>
    </div>
    <div class="header">
      <ClientOnly>
        <TastyBurgerButton
            v-if="!isStartScreen" 
            :type="buttonType" 
            :active="isActive" 
            :size="size" 
            :color="color" 
            :active-color="activeColor"
            @toggle="toggleMenu"/>
      </ClientOnly>
    
    <div v-if="!isStartScreen" class="header-menu " :class="{active: showMenu}">
      <ul>
        <li><g-link to="/junge-menschen">{{Menu.student_label}}</g-link></li>
        <li><a href="https://polarstern.thinkific.com/courses/starken-entdecken">Online-Kurs</a></li>
        <li><a href="https://eduki.com/de/autor/1208601/polarstern-1/materialien">Lehrmaterial</a></li>
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
  mounted() {
    document.addEventListener('consentUpdate', this.consentToggle)
  },
  beforeDestroy() {
    document.removeEventListener('consentUpdate', this.consentToggle)
  },
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
  components: {
    TastyBurgerButton: () =>
        import ('vue-tasty-burgers')
        .then(m => m.TastyBurgerButton)
        .catch(),
  },
  computed: {
    Menu() {
      return Menu
    }
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu
    },
    consentToggle(event) {
      // only is app is google analytics
      if (event.detail.app === 'googleAnalytics') {
        if (event.detail.consent) {
          // if user consent is true
          this.$gtag.optIn()
        } else {
          // if user consent is false
          this.$gtag.optOut()
          
        }
      }
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