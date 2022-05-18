<template>
  <div v-editable="blok" 
       :style="'text-align: ' + blok.justify" 
       class="heading-block"
       :class="blok.font">
    <h1 v-if="blok.hierarchy == 'h1'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h1>
    <h2 v-if="blok.hierarchy == 'h2'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h2>
    <h3 v-if="blok.hierarchy == 'h3'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h3>
    <h4 v-if="blok.hierarchy == 'h4'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h4>
    <h5 v-if="blok.hierarchy == 'h5'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h5>
    <h6 v-if="blok.hierarchy == 'h6'">
      <a v-if="blok.link_enabled" 
       :href="getLink">
        <span :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
          {{blok.heading}}
        </span>
      </a>
      <span v-else :class="blok.bg_color ? ('text-bg ' + this.blok.bg_color) : this.blok.bg_color">
        {{blok.heading}}
      </span>
    </h6>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    getLink() {
      switch (this.blok.link.linktype) {
        case "story":
          return ('/' + this.blok.link.cached_url)
        case "url":
          if (this.blok.link.url.includes("https://") || this.blok.link.url.includes("http://"))
            return this.blok.link.url
          else
            return "http://" + this.blok.link.url
        case "email":
          return "mailto:" + this.blok.link.email
        default:
          return this.blok.link.cached_url
      }
    },
  }
}
</script>

<style lang="scss">
.heading-block {
  a {
    &:hover {
      text-decoration: none;
    }
  }
}
</style>