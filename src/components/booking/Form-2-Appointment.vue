<template>
  <b-form-group label="Klassen und Wunschtermin">
    <b-form-group label="Klassenname">
      <b-form-input
        type="text"
        placeholder="z.B. 1B"
        v-model="booking.class">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Haben Sie einen Herzkiste-Gutschein?">
      <b-form-radio
        v-model="booking.herzkiste"
        value="Ja"
      >
        Ja
      </b-form-radio>
    </b-form-group>

    CalenderAPI
    
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: null
  },
  data() {
    return {
      booking: this.value
    }
  }
}
</script>

<style lang="scss"></style>