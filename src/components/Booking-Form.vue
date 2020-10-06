<template>
<b-row class="justify-content-center booking-form">
  <b-col cols="6">
    <Form-1-WorkShop 
      v-if="currentStep === 1"
      v-model="booking" />
    <Form-2-Appointment 
      v-if="currentStep === 2"
      v-model="booking" />
    <Form-3-Bookings 
      v-if="currentStep === 3"
      :formData="formData"
      @savebooking="saveCurrentBooking"
      @loadbooking="loadBookingFromIndex"
      @clearbooking="clearBooking"
      @correctbooking="correctBooking"/>
    <Form-4-PersonalData 
      v-if="currentStep === 4"
      v-model="formData" />
    <Form-5-Message 
      v-if="currentStep === 5"
      v-model="formData" />
    <Form-6-Summary 
      v-if="currentStep === 6"
      :formData="formData" />
    <b-row>
      <b-col>
        <b-button
          @click="prevStep"
        >
          Previous
        </b-button>
        <b-button
          class="mx-4"
          disabled
        >
          {{ currentStep }} / {{ maxSteps }}
        </b-button>
        <b-button
          v-if="currentStep !== 6"
          @click="nextStep"
          :disabled="disableNext"
        >
          Next
        </b-button>
        <b-button v-else class="mx-2" @click="submitData">
          Submit
        </b-button>
      </b-col>
    </b-row>

  </b-col>
</b-row>

</template>

<script>
import Form1WorkShop from "@/components/booking/Form-1-Workshop.vue";
import Form2Appointment from "@/components/booking/Form-2-Appointment.vue";
import Form3Bookings from "@/components/booking/Form-3-Bookings.vue";
import Form4PersonalData from "@/components/booking/Form-4-PersonalData.vue";
import Form5Message from "@/components/booking/Form-5-Message.vue";
import Form6Summary from "@/components/booking/Form-6-Summary.vue";

import axios from 'axios'

export default {
  components: {
    'Form-1-WorkShop': Form1WorkShop,
    'Form-2-Appointment' : Form2Appointment,
    'Form-3-Bookings' : Form3Bookings,
    'Form-4-PersonalData' : Form4PersonalData,
    'Form-5-Message' : Form5Message,
    'Form-6-Summary' : Form6Summary
  },
  data(){
    return {
      formData: {
        bookings: [],
        name: '',
        email: '',
        phonenumber: '',
        organisationType: '',
        organisationNameAndAddress: '',
        schoolType: null,
        message: ''
      },

      booking: {
        index: null,
        class: '',
        date: '',
        formattedDate: '',
        workshop: '',
        bookingoption: '',
        price: '',
        herzkiste: ''
      },
      
      currentStep: 1,
      maxSteps: 6,
      nrOfBookings: 0,
      apiData: null
    }
  },

  computed: {
    currentBookingHasIndex() {
      if (this.booking.index) 
        return true
      else
        return false
    },
    disableNext() {
      if (this.currentStep === 1) {
        if (this.booking.workshop === '' ||
            this.booking.bookingoption === '' ||
            this.booking.price === '')
            return true
          else
            return false
      }
      else if (this.currentStep === 2) {
        if (this.booking.class === '' ||
            this.booking.date === '' )
            return true
          else
            return false
      }
      else if(this. currentStep === 4) {
        if (this.formData.name === '' ||
            this.formData.email === '' ||
            this.formData.phonenumber === '' || 
            this.formData.organisationNameAndAddress === '' ||
            this.formData.organisationType === '' ||
            this.formData.organisationType === 'Schule' && this.formData.schoolType === null)
            return true
          else 
            return false
      }
    }
  },

  methods: {
    async postData() {
      const event = {
        data: this.createBody(),
        config: {
          headers: {
            "Authorization": "Bearer " + process.env.GRIDSOME_API_SECRET,
            "Content-Type": "application/json"
          }
        }
      }
      const URL = process.env.GRIDSOME_API_URL + "?api_key=" + process.env.GRIDSOME_API_SECRET
      await axios.post(URL, event.data, event.config)
        .then((result) => {
            this.apiData = result
            console.log(result)
         })
    },
    
    async getData() {
      const data = {
        httpMethod: 'GET',
      }
      fetch('../.netlify/functions/getAirtableBooking', data)
      .then((result) => {
        console.log(result)
      })
    },
    
    async submitData() {
      const event = {
        method: 'POST',
        body: JSON.stringify(this.createBody())
      }
      console.log(event)
      fetch("../.netlify/functions/postAirtableBooking", event)
      .then((result) => {
        console.log(result)
        this.apiData = result
      })
    },
    // TODO: Herzkiste Debug
    createBody() {
      let records = []
      this.formData.bookings.forEach(booking => {
        let field = { "fields": {
            "Workshop" : booking.workshop,
            "Buchungsoption": booking.bookingoption,
            "Wunschpreis": parseFloat(booking.price),
            "Klassenname": booking.class,
            "Herzkiste": (booking.herzkiste === 'Ja') ? true : null,
            "Start": booking.date,
            "Status": "Ausstehend",
            "Name der Organisation": this.formData.organisationNameAndAddress,
            "Ansprechperson": this.formData.name,
            "Adresse": this.formData.organisationNameAndAddress,
            "E-Mail": this.formData.email,
            "Telefonnummer": this.formData.phonenumber,
            "Art der Organisation": this.formData.organisationType,
            "Schultyp": (this.formData.organisationType === 'Organisation') ? 'Sonstige' : this.formData.schoolType,
            "Nachricht": this.formData.message
        }}
        records.push(field)
      })
      return {
        "records": records
      }
    },

    nextStep() {
      if (this.currentStep < 6)
        this.currentStep++
    },
    prevStep() {
      if (this.currentStep > 1)
        this.currentStep--
    },
    correctBooking(){
      if (this.currentStep === 3) 
        this.currentStep = 1
    },
    correctData(){
      if (this.currentStep === 6)
        this.currentStep = 4
    },
    updateValue(){
      this.$emit('input', this.currentStep)
    },
    saveCurrentBooking() {
      if (this.booking.index !== null) 
        this.formData.bookings[booking.index] = this.booking
      else
        this.booking.index = this.nrOfBookings
        this.formData.bookings.push(this.booking)
        this.nrOfBookings++
    },
    loadBookingFromIndex(payload) {
      if (payload.index < this.nrOfBookings)
        this.booking = this.formData.bookings[payload.index]
    },
    clearBooking() {
      this.booking = {
        index: null,
        class: '',
        date: '',
        workshop: '',
        bookingoption: '',
        price: '',
        herzkiste: ''
      }
    },
  }
}
</script>

<style lang="scss">
.booking-form {
  background-color: #44C7BF;
}
</style>