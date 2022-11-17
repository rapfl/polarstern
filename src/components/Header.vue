<template>
  <header class="header-wrapper">
    <!-- Desktop Header -->
    <div class="header-new">
      <div class="logo-wrapper">
        <ImageLink :blok="headerData.logo[0]"/>
      </div>
      <div class="menu-elements-wrapper">

          <div class="header-elements menu-element" v-for="(page, key) in headerData.pages" :key="key">
            <g-link :to="getLink(page.link)">{{ page.title }}</g-link>
          </div>
        
      </div>
    </div>
    <!-- Mobile Header -->
    <div class="header">
      <div class="header-elements">
        <ImageLink :blok="headerData.logo[0]"/>
      </div>
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
    </div>
    <div v-if="!isStartScreen" class="header-menu " :class="{active: showMenu}">
      <ul>
        <li class="header-elements menu-element" v-for="(page, key) in headerData.pages" :key="key">
          <g-link :to="getLink(page.link)">{{ page.title }}</g-link>
        </li>
      </ul>
    </div>
  </header>
  
</template>

<static-query>
query {
  metadata {
    siteName
  }

  allStoryblokEntry {
    edges {
      node {
        id
        full_slug
        name
        content
      }
    }
  }
}
</static-query>

<script>
import ImageLink from '~/components/storyblok/ImageLink.vue'
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
      color: '#000000',
      activeColor: '#000000',
      showMenu: false
    }
  },
  components: {
    TastyBurgerButton: () =>
        import ('vue-tasty-burgers')
        .then(m => m.TastyBurgerButton)
        .catch(),
    ImageLink
  },
  computed: {
    edges () {
      return this.$static.allStoryblokEntry.edges || []
    },
    headerData() {
      for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i].node.full_slug.includes("global/header")) {
          return this.edges[i].node.content
        }
      }
      return null
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
          window['ga-disable-G-00706SCH2E'] = false;
        } else {
          // if user consent is false
          window['ga-disable-G-00706SCH2E'] = true;
        }
      }
    },
    getLink(blok) {
      switch (blok.linktype) {
        case "story":
          return blok.cached_url
        case "url":
          if (blok.url.includes("https://") || blok.url.includes("http://"))
            return blok.url
          else
            return "http://" + blok.url
        case "email":
          return "mailto:" + blok.email
        default:
          return blok.cached_url
      }
    },
  },
  props: {
    isStartScreen: Boolean
  }
}
</script>

<style lang="scss">
  .header-wrapper {
    height: 88px;
    @media screen and (max-width: 767px){
      height: 72px;
    } 
  }
  .main-wrapper.landing,
  .main-wrapper.post,
  .main-wrapper.start {
    .header-new {
      display: none;
    }
    .header {
        background-color: white;
        display: grid;
        grid-template-columns: 1fr 1fr;
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
          padding-right: 24px;
          justify-self: end;
          opacity: 1 !important;

          @media screen and (max-width: 576px) {
            padding-right: 8px;
            .hamburger-box {
              height: 24px !important;
              transform: scale(1) !important;
            }
          }
        }
      }
  }
  .header img {
    transition: .2s;
  }
  .logo-wrapper {
    padding-left: 60px;
  }
  .header-elements {
    padding-left: 24px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
    &.menu-element {
      display: block;
      padding: 0 20px;
      align-self: center;
      text-align: right;
    }
    a {
      color: black;
      &:hover {
        text-decoration: none;
        color: var(--red);
      }
    }
    @media screen and (max-width: 576px) {
      padding-left: 8px;
    }
  }
  .menu-elements-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
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
    background-color: white;
    height: auto;
    width: 292px;
    position: fixed;
    right: 0%;
    z-index: 100;
    top: 99px;
    transform: translateY(-600px);
    transition: .4s ease-in-out;
    padding-top: 10px;
    ul {
      padding: 0 20px;
      list-style: none;
      li {
        margin: 1.2rem 0;
        text-align: left;
        a {
          font-family: 'Roboto', sans-serif;
          font-size: 20px;
          color: #000000;
          text-decoration: none;
        }
        a:hover,
        a.active.active--exact {
          color: var(--red);
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
        background-color: white;
        display: grid;
        grid-template-columns: 30% 70%;
        position: fixed;
        width: 100%;
        z-index: 110;
        padding: 0.4em;
        a {
          grid-column: 2 / 2;
          justify-self: center;
          img {
            width: 75px;
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