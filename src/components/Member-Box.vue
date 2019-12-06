<template>
  <div v-show="show" :id="!inImage ? 'member-box-wrapper-' + index : null" class="member-box-wrapper" :class="{'image-overlay': inImage}">
    <a  v-if="inImage" 
        :href="windowWidth < 768 ? '#member-box-' + index : '#'"
        :id="'member-box-' + index"
        class="member-box"
        v-b-toggle="'member-description-' + index">
      <button class="toggle-description">
        <ArrowDown/>
      </button>
      <h2>{{memberName}}</h2>
      <b-collapse :id="'member-description-' + index" class="member-description">
        <p>{{memberDescription}}</p>
      </b-collapse>
    </a>
    <div v-else :id="'member-box-' + index" class="member-box" v-b-toggle="'member-description-' + index">
      <button class="toggle-description">
        <ArrowDown/>
      </button>
      <h2>{{memberName}}</h2>
      <b-collapse :id="'member-description-' + index" class="member-description">
        <p>{{memberDescription}}</p>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import About from '~/data/footer/About.yml'
import VueMarkdown from 'vue-markdown'
import ArrowDown from '~/assets/svg/arrow_down.svg'

export default {
  components: {
    VueMarkdown,
    ArrowDown
  },
  computed: {
    About() {
      return About
    }
  },
  props: {
    index: Number,
    memberName: String,
    memberDescription: String,
    inImage: Boolean,
    show: Boolean,
    windowWidth: Number
  }
}
</script>

<style lang="scss">
  .member-box {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 85% 15%;
    
    color: #fff;
    background-color: #000;
    padding: 1.2rem 1.5rem;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
    h2 {
      font-family: 'Chau Philomene One';
      font-size: 24px;
      text-transform: uppercase;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
      align-self: center;
      margin-bottom: 0;
    }
    .member-description {
      font-family: 'Roboto';
      grid-row: 2 / 2;
      grid-column: 1 / 3;
      margin-top: 0.8rem;
    }
    button.toggle-description {
      background-color: unset;
      border: none;
      grid-row: 1 / 1;
      grid-column: 2 / 2;
      align-self: center;
      justify-self: center;
      transform: rotateX(180deg);
      transition: .2s;
      svg.arrow-down {
        transform: scale(1.3);
      }
    }
  }
  .member-box.collapsed {
    button.toggle-description{
      transform: rotateX(0);
    }
  }
  .member-box-wrapper.image-overlay {
    .member-box {
      width: 275px;
      @media screen and (max-width: 767px) {
        button.toggle-description {
          display: none;
        }
        .member-description, p {
          display: none;
        }
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        width: 195px;
      }
      @media screen and (min-width: 576px) and (max-width: 767px) {
        width: 130px;
        text-align: center;
        grid-template-columns: auto;
      }
      @media screen and (min-width: 576px) and (max-width: 991px) {
        padding: 0.7rem 1.5rem;
        
        h2 {
          font-size: 20px;
        }
        p {
          font-size: 14px;
        }
        svg.arrow-down {
          transform: scale(1);
        }
      }
      @media screen and (max-width: 575px) {
        padding: 0.5rem;
        width: 62px;
        text-align: center;
        grid-template-columns: auto;
        h2 {
          font-size: 13px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
</style>