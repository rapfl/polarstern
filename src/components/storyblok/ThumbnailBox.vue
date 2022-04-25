<template>
  <div v-editable="blok">
    <a class="thumbnail-box border border-warning" :href="getLink">
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
    width: 19rem;
    height: 19rem;
    display: grid;
    justify-items: center;
    transition: .2s;
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
  // TODO: Adjust media queries
  @media screen and (max-width: 767px) {
    .thumbnail-box {
      .card {
        width: 14rem;
        height: 14rem;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .thumbnail-box {
      .card {
        width: 26rem;
        height: 26rem;
      }
    }
  }
</style>