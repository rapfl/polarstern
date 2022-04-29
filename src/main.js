// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Import Libraries
import BootsrapVue from 'bootstrap-vue'
import '~/styles/custom-bootstrap.scss'
import AnimateCSS from 'animate.css'
import checkView from 'vue-check-view'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

// Import custom styles
import '~/styles/utilities.scss'
import '~/styles/styles.scss'

// Import Storyblok components
import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/pages/storyblok/Page.vue'
import FooterPage from '~/pages/storyblok/FooterPage.vue'
import Teaser from '~/components/storyblok/Teaser.vue'
import Feature from '~/components/storyblok/Feature.vue'
import Grid from '~/components/storyblok/Grid.vue'
import Container from '~/components/storyblok/Container.vue'
import Hero from '~/components/storyblok/Hero.vue'
import Heading from '~/components/storyblok/Heading.vue'
import Richtext from '~/components/storyblok/Richtext.vue'
import TextEditor from '~/components/storyblok/TextEditor.vue'
import CodeSnippet from '~/components/storyblok/CodeSnippet.vue'
import ImageLink from '~/components/storyblok/ImageLink.vue'
import Button from '~/components/storyblok/Button.vue'
import ThumbnailBox from '~/components/storyblok/ThumbnailBox.vue'
import Carousel from '~/components/storyblok/Carousel.vue'
import Column from '~/components/storyblok/Column.vue'

export default function (Vue, { router, head, isClient }) {
  // Libraries
  Vue.use(BootsrapVue)
  Vue.use(AnimateCSS)
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

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // register Storyblok components
  Vue.component('Page', Page)
  Vue.component('FooterPage', FooterPage)
  Vue.component('Teaser', Teaser)
  Vue.component('Feature', Feature)
  Vue.component('Grid', Grid)
  Vue.component('Hero', Hero)
  Vue.component('Heading', Heading)
  Vue.component('Container', Container)
  Vue.component('Richtext', Richtext)
  Vue.component('TextEditor', TextEditor)
  Vue.component('CodeSnippet', CodeSnippet)
  Vue.component('ImageLink', ImageLink)
  Vue.component('Button', Button)
  Vue.component('ThumbnailBox', ThumbnailBox)
  Vue.component('Carousel', Carousel)
  Vue.component('Column', Column)

  // Google Analytics
  head.script.push({
    src: 'https://www.googletagmanager.com/gtag/js?id=G-2YMZ803M6S',
    async: true
  })
  head.script.push({
    innerHTML: 
      `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-2YMZ803M6S');`,
    type: 'text/javascript',
    charset: 'utf-8'
  })
}
