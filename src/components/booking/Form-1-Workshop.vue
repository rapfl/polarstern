<template>
  <b-form-group label="Ihr Workshop">
    <b-form-group label="Welchen Workshop wollen Sie buchen?">
      <b-form-radio
        v-for="(workshop, ind) in workshops"
        :key="ind"
        :value="workshop"
        v-model="booking.workshop">
        {{ workshop}}
      </b-form-radio>
    </b-form-group>
    <b-form-group label="Buchungsoption">
      <b-form-radio
        v-for="(option, ind)  in bookingOptions"
        :key="ind"
        :value="option"
        v-model="booking.bookingoption"
      > 
        {{ option }}
      </b-form-radio>
      
    </b-form-group>
    <b-form-group label="Wunschpreis pro Teilnehmer*in und Stunde">
      <b-form-input
        name="price"
        v-model="booking.price"
        placeholder="z.B. 5€"
        required
        :state="statePrice">
      </b-form-input>
    </b-form-group>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: null
  },
  data() {
    return {
      booking: this.value,
      bookingOptions: [
        'In der Klasse', 'Draußen/Im Turnsaal'
      ],
      workshops: [
        "Stärken Entdecken (1h)",
        "Stärken Entdecken (2h)",
        "Zukunftsperspektive",
        "Achtsamkeit"
      ],
      statePrice: null
    }
  }
}
</script>

<style lang="scss"></style>