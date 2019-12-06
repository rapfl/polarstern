<template>
  <div class="main-wrapper post">
    <Header/>
    <SocialButtons/>
    <Dots/>
    <b-container class="header-padding footer-padding">
      <b-row>
        <b-col cols="12">
          <div class="markdown-body">
            <div v-html="$page.post.content" />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <SOSLogo/>
    <Footer/>
  </div>
  
  
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    content
  },
  meta: metadata {
    siteUrl
  }
}
</page-query>

<script>
import Header from '~/components/Header.vue'
import SocialButtons from '~/components/Social-Buttons.vue'
import SOSLogo from '~/components/SOS-Logo.vue'
import Footer from '~/components/Footer.vue'
import Dots from '~/assets/svg/dots.svg'

export default {
  components: {
    Header,
    SocialButtons,
    SOSLogo,
    Footer,
    Dots
  },
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  }
};
</script>
