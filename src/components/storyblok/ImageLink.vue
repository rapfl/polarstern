<template>
  <div v-editable="blok">
    <a v-if="blok.link_url.cached_url || blok.link_url.email" :href="isExternalLink">
      <b-img :src="blok.image_url.filename" :alt="blok.image_url.alt" fluid/>
    </a>
    <b-img v-else :src="blok.image_url.filename" :alt="blok.image_url.alt" fluid/>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    isExternalLink() {
      switch (this.blok.link_url.linktype) {
        case "story":
          return this.blok.link_url.cached_url
        case "url":
          if (this.blok.link_url.url.includes("https://") || this.blok.link_url.url.includes("http://"))
            return this.blok.link_url.url
          else
            return "http://" + this.blok.link_url.url
        case "email":
          return "mailto:" + this.blok.link_url.email
        default:
          return this.blok.link_url.cached_url
      }
    }
  }
}
</script>