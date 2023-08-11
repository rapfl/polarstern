<template>
  <b-row class="overview">
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
      <h3>Buchung {{ booking.index + 1}}</h3>
      Klasse: <span class="weight-bold">{{ booking.class }}</span> <br>
      Anzahl der Teilnehmer: <span class="weight-bold">{{ booking.anzahl }}</span> <br>
      Terminvorschläge: 
      <span v-for="(date, index) in booking.appointments"
            :key="index" 
            class="weight-bold d-block">
        {{ date }}
        </span> 
      Workshop: <span class="weight-bold">{{ booking.workshop }}</span> <br>
      Buchungsoption: <span class="weight-bold">{{ booking.bookingoption }}</span> <br>
      <!-- Wunschpreis pro Teilnehmer*in & Stunde: <span class="weight-bold">{{ booking.price }}</span> <br> -->
      Herzkisten-Gutschein: <span class="weight-bold">{{ booking.herzkiste  ? 'Ja' : 'Nein' }}</span> <br> <br>

      <a 
        href="" 
        class="yellow" 
        @click="correctData(booking.index)"
      > 
        {{correctDataString}}
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
      addAnotherClassText: "<< Weiteren Workshop hinzufügen ",
      correctDataString: "<< Daten korrigieren "
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
.overview{
  font-family: 'Roboto';
  color:white;
  font-weight: normal;
  font-size: 24px;
  h2 {
    font-family: 'Chau Philomene One';
    font-size: 50px;
    text-transform: uppercase;
  }
  h3 {
    font-family: 'Chau Philomene One';
    font-size: 30px;
    text-transform: uppercase;
  }
  .weight-bold {
    font-weight: bold;
  }
}
</style>