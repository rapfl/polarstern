<template>
  <div v-editable="blok">
    <a class="thumbnail-box border"
       :class="blok.color_inverted ? 'border-primary' : 'border-warning'"
       :href="getLink">
      <b-card
        :title="blok.thumbnail_box_title"
        title-tag="h2"
        :img-src="blok.thumbnail_box_image.filename"
        :img-alt="blok.thumbnail_box_image.alt"
        align="center"
        tag="article"
        class="rounded-0 border-0">
      </b-card>
    </a>
    <a v-if="blok.show_button" :href="getLink" class="d-block text-center">
      <b-button
        pill
        size="lg" 
        :class="blok.is_bg_button ? 'bg-btn-wrapper mt-3' : 'mt-5' ">
        <span :class="blok.is_bg_button ? ('text-bg ' + (blok.color_inverted ? 'bg-warning text-dark' : '')) : ''">
          {{ blok.button_title }}
        </span>
      </b-button>
    </a>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    getLink() {
      switch (this.blok.thumbnail_box_link.linktype) {
        case "story":
          return this.blok.thumbnail_box_link.cached_url
        case "url":
          if (this.blok.thumbnail_box_link.url.includes("https://") || this.blok.thumbnail_box_link.url.includes("http://"))
            return this.blok.thumbnail_box_link.url
          else
            return "http://" + this.blok.thumbnail_box_link.url
        case "email":
          return "mailto:" + this.blok.thumbnail_box_link.email
        default:
          return this.blok.thumbnail_box_link.cached_url
      }
    }
  }
}
</script>

<style lang="scss">
  .thumbnail-box {
    display: inline-block;
    border: 3px solid;
    vertical-align: middle;
    margin: 15px;
  }
  .thumbnail-box:hover {
    text-decoration: none;
  }
  .card {
    width: 22vw;
    height: 22vw;
    display: grid;
    justify-items: center;
    img {
      width: 100%;
      height: 100%;
      margin-bottom: 0.6em;
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      object-fit: cover;
    }
    .card-body {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
  }
  @media screen and (max-width: 991px) {
    .thumbnail-box {
      .card {
        width: 38vw;
        height: 38vw;
      }
    }
  }
  @media screen and (max-width: 575px) {
    .thumbnail-box {
      .card {
        width: 75vw;
        height: 75vw;
      }
    }
  }
</style>