<template>
  <div class="workshop-info-banner" 
    :class="color + (showMoreInfo ? ' show-more-info' : '') 
            + (showAllDetails ? ' show-all-details' : '')
            + (moreInfoTeaser ? ' more-info-teaser' : '')
            + (allDetailsTeaser ? ' all-details-teaser' : '')">
    
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
        :class="moreInfoTeaser ? ' teaser' : ''"
        @click="toggleMoreInfo"
        @mouseover="turnOnMoreInfoTeaser" 
        @mouseout="turnOffMoreInfoTeaser">
      <div class="arrow-right" >
      </div>
      <div class="arrow-description ml-3">
          Mehr <br> Info
      </div>
      <div class="content markdown-body pr-5">
        <h4>
          Der Workshop, der dir deine Stärken zeigt.
        </h4>
        <p>Im Workshop Stärken entdecken finden junge Menschen ihre persönlichen Stärken und erkennen Möglichkeiten, diese selbstbewusst in Schule, Freizeit und Beruf einzusetzen.</p>
      </div>
    </div>
    
    <!-- All Details Layer -->
    <div class="layer all-details-layer"
      :class="allDetailsTeaser ? ' teaser' : ''"
      @mouseover="turnOnAllDetailsTeaser"
      @mouseout="turnOffAllDetailsTeaser"
      @click="toggleAllDetails">
      <div class="arrow-right">
      </div>
      <div class="arrow-description ml-3">
          Mehr <br> Details
      </div>
      <div v-if="showAllDetails" class="content markdown-body pr-5">
        <p>Im Workshop Stärken entdecken ermöglichen wir jungen Menschen, die eigenen Stärken zu entdecken und so Vertrauen in sich selbst zu gewinnen. Denn das Bewusstsein über die eigenen Stärken hilft dabei, mutige und selbstbewusste Entscheidungen zu treffen.

Mit diversen interaktiven Methoden wie
- Stärken-Brainstorming | - Phantasiereise | - Selbst- und Fremdfeedback
sowie dazu passenden, altersadequaten Arbeitsmaterialien fördern wir Schlüsselkompetenzen wie Selbsterfahrung, Empathie, Team- und Kommunikationsfähigkeit.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMoreInfo: false,
      showAllDetails: false,
      moreInfoTeaser: false,
      allDetailsTeaser: false,
      transitioning: false
    }
  },
  props: {
    color: String,
    title: String,
    icon: String
  },
  methods: {
    toggleMoreInfo() {
      this.showMoreInfo = !this.showMoreInfo
    },
    toggleAllDetails() {
      this.showAllDetails = !this.showAllDetails
      this.showMoreInfo = !this.showMoreInfo
    },
    turnOnMoreInfoTeaser() {
      if (!this.showAllDetails && !this.showMoreInfo) {
        this.moreInfoTeaser = true
      }
    },
    turnOffMoreInfoTeaser() {
      this.moreInfoTeaser = false
    },
    turnOnAllDetailsTeaser() {
      if (this.showMoreInfo && !this.showAllDetails) {
        this.allDetailsTeaser = true
      }
    },
    turnOffAllDetailsTeaser() {
      this.allDetailsTeaser = false
    }
  }
}
</script>

<style lang="scss">
  .workshop-info-banner {
    display: flex;
    overflow: hidden;
    
    .cover-layer {
      transition: .7s ease-in-out;
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
      transition: .7s ease-in-out;
      cursor: pointer;
      width: 20%;
      display: flex;
      grid-row: 1 / 1;
      grid-column: 2 / 3;
      align-items: center;

    }
    .all-details-layer {
      transition: .7s ease-in-out;
      cursor: pointer;
      width: 0%;
      display: flex;
      align-items: center;
    }
    .arrow-description {
      transition: .3s ease-in-out;
    }
    .content {
      transition: .6s ease-out;
      opacity: 0;
    }
    &.show-more-info {
      .cover-layer,
      .more-info-layer {
        width: 40%;
        .content {
          opacity: 1;
        }
      }
      .all-details-layer {
        width: 20%;

      }
    }
    &.show-all-details {
      .cover-layer {
        width: 20%;
      }
      .more-info-layer {
        width: 5%;
      }
      .all-details-layer {
        width: 75%;
        .content {
          opacity: 1;
        }
      }
    }
    .cover-layer {
      padding-top: 2em;
    }

    // Show Cursors
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
    // Hover Effects
    &.more-info-teaser {
      .cover-layer {
        width: 78%;
      }
      .more-info-layer {
        width: 22%;
      }
    }
    &.all-details-teaser {
      .more-info-layer {
        width: 38%;
      }
      .all-details-layer {
        width: 22%;
      }
    }
  }
  .workshop-info-banner,
  .layer {
    max-height: 300px;
    min-height: 300px;
  }
  .arrow-right {
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid;
    border-right: none;
  }

</style>