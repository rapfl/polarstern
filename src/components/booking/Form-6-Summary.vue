<template>
  <b-row class="overview">
    <b-col cols="12">
      <h2>Übersicht</h2>
    </b-col>
    <b-col 
        v-for="(booking, ind) in formData.bookings"
        :key="ind"
        class="my-2"
        cols="12"
        md="6"
      >
        <h3>Buchung {{ booking.index + 1}}</h3>
        Klasse: <span class="weight-bold">{{ booking.class }}</span> <br>
        Terminvorschläge: 
        <span v-for="(date, index) in booking.appointments"
              :key="index" 
              class="weight-bold d-block">
          {{ date }}
          </span> 
        Workshop: <span class="weight-bold">{{ booking.workshop }}</span> <br>
        Buchungsoption: <span class="weight-bold">{{ booking.bookingoption }}</span> <br>
        Wunschpreis pro Teilnehmer*in & Stunde: <span class="weight-bold">{{ booking.price }}</span> <br>
        Herzkisten-Gutschein: <span class="weight-bold">{{ booking.herzkiste  ? 'Ja' : 'Nein' }}</span> <br> <br>
    </b-col>
    <b-col cols="12" class="my-2">
      <h3>Ihre Daten</h3>
      Name: <span class="weight-bold">{{ formData.name }} </span> <br>
      Kontakt: <span class="weight-bold">{{ formData.email }}, {{ formData.phonenumber }}</span> <br>
      Organisation: <span class="weight-bold">{{ formData.organisationType }} </span> <br>
      Name und Adresse: <span class="weight-bold">{{ formData.organisationNameAndAddress }} </span> <br>
      <div v-if="formData.organisationType === 'Schule'"> 
        Schultyp: <span class="weight-bold">{{ formData.schoolType }} </span><br>
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