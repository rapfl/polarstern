<template>
  <b-row>
    <b-col cols="12">
      <h2>{{ nrOfBookings > 1 
        ? 'Übersicht ihrer Buchungen' 
        : 'Übersicht ihrer Buchung' }}
      </h2> 
    </b-col>
    <b-col 
      v-for="(booking, ind) in formData.bookings"
      :key="ind"
      class="my-2"
      cols="12"
    >
      <h4>Buchung {{ booking.index + 1}}</h4>
      Klasse: <strong>{{ booking.class }}</strong> <br>
      Datum: <strong>{{ booking.date }}</strong> <br>
      Workshop: <strong>{{ booking.workshop }}</strong> <br>
      Buchungsoption: <strong>{{ booking.bookingoption }}</strong> <br>
      Wunschpreis pro Teilnehmer*in & Stunde: <strong>{{ booking.price }}</strong> <br>
      Herzkisten-Gutschein: <strong>{{ booking.herzkiste }}</strong> <br> <br>

      <a 
        href="" 
        class="yellow" 
        @click="correctData(booking.index)"
      > 
        {{correctData}}
      </a>
    </b-col>
    <b-col cols="12">
      <a 
        href="" 
        class="yellow" 
        @click="addClass"
      > 
        {{addAnotherClassText}}
      </a>
    </b-col>
  </b-row> 
</template>

<script>
export default {
  props: {
    formData: {
      bookings: []
    },
  },
  data() {
    return {
      addAnotherClassText: "<< Weitere Klasse hinzufügen ",
      correctData: "<< Daten korrigieren "
    }
  },
  computed: {
    nrOfBookings() {
      return this.formData.bookings.length
    }
  },
  beforeMount() {
    this.$emit('savebooking')
  },
  methods: {
    correctData(index){
      this.$emit('loadbooking', {index: index})
      this.$emit('correctbooking')
    },
    addClass(){
      this.$emit('clearbooking')
      this.$emit('correctbooking')
    }
  }
}
</script>

<style lang="scss">
.yellow {
  color: #FFE100;
}
</style>