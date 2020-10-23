<template>
  <div class="workshop-info-banner" 
    :class="color + (showMoreInfo ? ' show-more-info' : '') 
            + (showAllDetails ? ' show-all-details' : '')">
    
    <!-- Cover Layer -->
    <div class="layer cover-layer">
      <div class="cover-headings">
        <h2>Workshop</h2>
        <h3>{{title}}</h3>
      </div>
      <img :src="icon" :class="color == 'yellow' ? 'mb-5' : ''"/>
    </div>
    
    <!-- More Info Layer -->
    <div class="layer more-info-layer"
      :class="showMoreInfo ? 'show' : ''">
      <div class="clicker" 
        v-if="!showMoreInfo"
        @click="toggleMoreInfo">

      </div>
      <div class="content py-4 d-flex align-items-center">
        <div class="arrow-right" >
        </div>
        <transition name="fade">
          <div class="arrow-description ml-3" v-show="!showMoreInfo && !showAllDetails">
            Mehr <br> Infos
          </div>
        </transition>
        
        <transition name="fade">
          <vue-markdown v-if="(windowWidth <= 991.98) || showMoreInfo" 
            class="markdown-body mt-3 px-4 align-self-start"
            :source="getCurrentPost($page.workshops.edges, title).info">

          </vue-markdown>
        </transition>
        
        <transition name="fade">
        <b-button-close 
          class="ml-auto mr-4"
          v-if="showMoreInfo" 
          @click="toggleMoreInfo">
          x
        </b-button-close>
        </transition>
      </div>
    </div>
    
    <!-- All Details Layer -->
    <div class="layer all-details-layer"
      :class="showAllDetails ? 'show' : ''">
      <div class="clicker" 
        v-if="showMoreInfo"
        @click="toggleAllDetails">
      </div>
      <div class="content py-4 d-flex align-items-center">
        <div class="arrow-right">
        </div>
        <transition name="fade">
          <div class="arrow-description ml-3" v-show="!showAllDetails">
            Mehr <br> Details
          </div>
        </transition>
        
        <transition name="fade">
          <vue-markdown v-if="(windowWidth <= 991.98) || showAllDetails" class="markdown-body mt-3 px-4 align-self-start" :source="getCurrentPost($page.workshops.edges, title).content">

          </vue-markdown>
        </transition>
        <transition name="fade">
          <b-button-close 
            class="ml-auto mr-4" 
            v-if="showAllDetails"
            @click="toggleAllDetails">
            x
          </b-button-close>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Workshops from '~/data/footer/Workshops.yml'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown,
  },
  computed: {
    Workshops() {
      return Workshops
    }
  },
  data() {
    return {
      showMoreInfo: false,
      showAllDetails: false,
      windowWidth: 1000,
    }
  },
  props: {
    color: String,
    title: String,
    icon: String
  },
  methods: {
    toggleMoreInfo() {
      // Show More Info is not open
      if (!this.showMoreInfo) {
        if (this.showAllDetails)
          this.showAllDetails = !this.showAllDetails
      }
      this.showMoreInfo = !this.showMoreInfo
    },
    toggleAllDetails() {
      this.showAllDetails = !this.showAllDetails
      this.showMoreInfo = !this.showMoreInfo
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    getCurrentPost(list, item) {
      for(let i = 0; i < list.length; i++) {
        if (list[i].node.title == item) {
          return list[i].node;
        }
      }
      return list[0].node;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.windowWidth = window.innerWidth
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>

<style lang="scss">
  .clicker,
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .clicker {
    z-index: 100;
  }
  .workshop-info-banner {
    display: flex;
    overflow: hidden;
    
    .more-info-layer,
    .all-details-layer {
      position: relative;
      cursor: pointer;
      &.show {
        cursor: inherit;
      }
      button.close,
      .content {
        align-self: flex-start;
      }
    }

    .cover-layer {
      width: 80%;
      display: grid;
      grid-row: 1 / 1;
      .cover-headings {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        text-align: center;
      }
      img {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        justify-self: center;
        align-self: end;
      }
    }
    .more-info-layer {
      width: 20%;
      grid-row: 1 / 1;
      grid-column: 2 / 3;
      
    }
    .all-details-layer {
      width: 0%;
    }
    
    &.show-more-info {
      .cover-layer {
        width: 48%;
      }
      .more-info-layer {
        width: 36%;
      }
      .all-details-layer {
        width: 16%;

      }
    }
    &.show-all-details {
      .cover-layer {
        width: 48%;
      }
      .more-info-layer {
        width: 4%;
      }
      .all-details-layer {
        width: 48%;
      }
    }
    .cover-layer {
      padding-top: 2em;
    }

    // Show Arrow
    &.show-more-info {
      .more-info-layer {
        .arrow-description {
          opacity: 0;
        }
      }
    }
    &.show-all-details {
      .all-details-layer {
        .arrow-description {
          opacity: 0;
        }
      }
    }

    // Transitions
    .cover-layer,
    .more-info-layer,
    .all-details-layer {
      transition: .7s ease-in-out;
    }
    .arrow-description {
      transition: .3s ease-in-out;
    }
    .content {
      transition: .6s ease-out;
    }
    .show-content-enter-active {
      transition: opacity .8s ease-in;
    }
    .show-content-leave-active {
      transition: opacity .1s ease-in;
    }
    .show-content-enter {
      opacity: 1;
    }
    .show-content-leave-to {
      opacity: 0;
    }
    .fade-enter-active {
      transition: opacity .8s cubic-bezier(.79,.04,.51,.37);
    }
    .fade-leave-active {
      transition: opacity .3s ease-out;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    // Hover Effects
  }
  .workshop-info-banner,
  .layer {
    max-height: 350px;
    min-height: 350px;
    overflow-y: scroll;
  }
  .arrow-right {
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid;
    border-right: none;
  }
  @media (max-width: 991.98px) { 
    .workshop-info-banner {
      overflow: unset;
      display: block;
      max-height: initial;
      min-height: initial;
      .layer {
        width: 100%;
        max-height: inherit;
        min-height: inherit;
      }
      .cover-layer {
        min-height: 270px;
      }
      .content {
        position: relative;
      }
      .clicker,
      .arrow-right,
      .arrow-description {
        display: none;
      }

      
    }
  }
</style>