<template>
  <b-form-group label="Ihr Workshop">
    <b-form-group label="Welchen Workshop wollen Sie buchen?">
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
      <b-form-textarea
        name="price"
        v-model="booking.price"
        placeholder="z.B. 5€"
        rows="1"
        max-rows="1"
        required>
      </b-form-textarea>
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
        'In der Klasse', 'Draußen/im Turnsaal'
      ]
    }
  }
}
</script>

<style lang="scss"></style>