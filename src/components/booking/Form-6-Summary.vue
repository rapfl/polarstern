<template>
  <b-row>
    <b-col cols="12">
      <h2>Übersicht</h2>
    </b-col>
    <b-col 
        v-for="(booking, ind) in formData.bookings"
        :key="ind"
        class="my-2"
        cols="6"
      >
        <h4>Buchung {{ booking.index + 1}}</h4>
        Klasse: <strong>{{ booking.class }}</strong> <br>
        Datum: <strong>{{ booking.formattedDate }}</strong> <br>
        Workshop: <strong>{{ booking.workshop }}</strong> <br>
        Buchungsoption: <strong>{{ booking.bookingoption }}</strong> <br>
        Wunschpreis pro Teilnehmer*in & Stunde: <strong>{{ booking.price }}</strong> <br>
        Herzkisten-Gutschein: <strong>{{ booking.herzkiste }}</strong> <br> <br>
    </b-col>
    <b-col cols="12" class="my-2">
      <h4>Ihre Daten</h4>
      Name: <strong>{{ formData.name }} </strong> <br>
      Kontak: <strong>{{ formData.email }}, {{ formData.phonenumber }}</strong> <br>
      Organisation: <strong>{{ formData.organisationType }} </strong> <br>
      Name und Adresse: <strong>{{ formData.organisationNameAndAddress }} </strong> <br>
      <div v-if="formData.organisationType === 'Schule'"> 
        Schultyp: <strong>{{ formData.schoolType }} </strong><br>
      </div>
    </b-col>
    <b-col cols="12" class="my-2">
      <h4>Persönliche Mitteilung</h4>
      {{ (formData.message) ? formData.message : 'Keine Mitteilung'}}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    formData: {
      bookings: []
    }
  }
}
</script>

<style lang="scss"></style>