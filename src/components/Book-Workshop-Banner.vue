<template>
  <div class="book-workshop-banner py-5">
    <b-container>
      <b-row align-v="center">
        <b-col cols="12" md="7" class="text-center text-md-left mb-4 mb-md-0">
          <h1>Buche hier Workshops für deine Klassen oder Jugendgruppen</h1>
        </b-col>
        <b-col cols="12" md="5" class="text-center">
          <b-button
            to="/booking"
            pill 
            variant="secondary">
            Workshop Buchen
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .book-workshop-banner {
    .btn {
      font-size: 28px;
      padding: 0.7rem 2rem;
      line-height: 1.5;
    }
    h1 {
      margin: 0;
    }
  }
</style>