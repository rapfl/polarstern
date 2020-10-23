// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Import Libraries
import BootsrapVue from 'bootstrap-vue'
import '~/styles/custom-bootstrap.scss'
import AnimateCSS from 'animate.css'
import * as TastyBurgerButton from 'vue-tasty-burgers'
import 'vue-tasty-burgers/dist/vue-tasty-burgers.css';
import checkView from 'vue-check-view'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

// Import custom styles
import '~/styles/styles.scss'

export default function (Vue, { router, head, isClient }) {
  // Libraries
  Vue.use(BootsrapVue)
  Vue.use(AnimateCSS)
  Vue.use(TastyBurgerButton)
  Vue.use(checkView)
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin)
  
  // Google Fonts
  head.link.push(
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Chau+Philomene+One'
    }
  )
}
