<template>
<b-row class="justify-content-center booking-form-page">
  <b-col cols="10" class="booking-form">
    <Form-1-WorkShop 
      v-if="currentStep === 1"
      v-model="booking"
      :validate="validate" />
    <Form-2-Appointment 
      v-if="currentStep === 2"
      v-model="booking"
      :validate="validate" />
    <Form-3-Bookings 
      v-if="currentStep === 3"
      :formData="formData"
      @savebooking="saveCurrentBooking"
      @loadbooking="loadBookingFromIndex"
      @clearbooking="clearBooking"
      @correctbooking="correctBooking"/>
    <Form-4-PersonalData 
      v-if="currentStep === 4"
      v-model="formData" 
      :validate="validate"/>
    <Form-5-Message 
      v-if="currentStep === 5"
      v-model="formData" />
    <Form-6-Summary 
      v-if="currentStep === 6"
      :formData="formData" />
    <b-row class="pt-0">
      <b-col class="navigation-column d-flex justify-content-center">
        <b-button
          v-if="currentStep !== 1"
          class="prev-step"
          @click="prevStep"
        >
          zurück
        </b-button>
        <g-image
          src="~/assets/svg/greyCircle.svg"
          class="counter-circle"
        />
        <g-image
          src="~/assets/svg/greenLine.svg"
          class="counter-line"
           />
        <span class="counter">
          {{ currentStep }} / {{ maxSteps }}
        </span>
        <b-button
          class="next-step disabled"
          v-if="currentStep !== 6 && disableNext"
          @click="validateStep"
        >
          weiter
        </b-button>
        <b-button
          class="next-step"
          v-else-if="currentStep !== 6"
          @click="nextStep"
        >
          weiter
        </b-button>
        <b-button v-else class="next-step" @click="submitData">Abschicken</b-button>
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
        message: '',
        confirmTermsOfUse: false,
        confirmNewsletter: false
      },

      booking: {
        index: null,
        class: '',
        date: '',
        formattedDate: '',
        appointments: [],
        datesConfirmed: false,
        workshop: '',
        bookingoption: '',
      //  price: '',
        herzkiste: '',
        anzahl: 0
      },
      
      currentStep: 1,
      maxSteps: 6,
      nrOfBookings: 0,
      apiData: null,
      validate: false,
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
            this.booking.bookingoption === '')
            //this.booking.price === '')
            return true
          else
            return false
      }
      else if (this.currentStep === 2) {
        if (this.booking.class === '' ||
            !this.booking.datesConfirmed)
            return true
          else
            return false
      }
      else if(this. currentStep === 4) {
        if (this.formData.name === '' ||
            this.formData.email === '' ||
            this.validateEmail(this.formData.email) ||
            this.formData.phonenumber === '' || 
            this.validatePhonenumber(this.formData.phonenumber) ||
            this.formData.organisationNameAndAddress === '' ||
            this.formData.organisationType === '' ||
            this.formData.organisationType === 'Schule' && this.formData.schoolType === null ||
            !this.formData.confirmTermsOfUse)
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
      fetch("../.netlify/functions/postAirtableBooking", event)
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          this.$bvModal.show('modal-success')
        }
        else {
          this.$bvModal.show('modal-error')
          throw result
        }
      })
    },
    // TODO: Herzkiste Debug
    // TODO: Continue at step 2 Bug
    createBody() {
      let records = []
      this.formData.bookings.forEach(booking => {
        let field = { "fields": {
            "Workshop" : booking.workshop,
            "Buchungsoption": booking.bookingoption,
            "Wunschpreis": parseFloat(booking.price),
            "Klassenname": booking.class,
            "Anzahl": parseInt(booking.anzahl),
            "Herzkiste": booking.herzkiste ? true : false,
            "Termine": this.printDates(booking.appointments),
            "Status": "Ausstehend",
            "Name der Organisation": this.formData.organisationNameAndAddress,
            "Ansprechperson": this.formData.name,
            "Adresse": this.formData.organisationNameAndAddress,
            "E-Mail": this.formData.email,
            "Telefonnummer": this.formData.phonenumber,
            "Art der Organisation": this.formData.organisationType,
            "Schultyp": (this.formData.organisationType === 'Organisation') ? 'Sonstige' : this.formData.schoolType,
            "Nachricht": this.formData.message,
            "Newsletter": this.formData.confirmNewsletter
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
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.validate = false
    },
    prevStep() {
      if (this.currentStep > 1)
        this.currentStep--
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.validate = false
    },
    validateStep() {
      if (this.validate === false)
        this.validate = true
    },
    correctBooking(){
      if (this.currentStep === 3) 
        this.currentStep = 1
    },
    correctData(){
      if (this.currentStep === 6)
        this.currentStep = 4
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
        herzkiste: '',
        anzahl: 0,
        datesConfirmed: false,
        appointments: []
      }
    },
    validateEmail(email) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
          return (false)
      else
          return (true)
    },
    validatePhonenumber(phonennumber) {
      if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phonennumber))
        return false
      else
        return true
    },
    printDates(appointments) {
      var print = ''
      for (var i = 0; i < appointments.length; i++) {
        print += '(' + (i+1) + ') ' 
        print += appointments[i]
        print += "\n"
      }
      return print
    }
  }
}
</script>

<style lang="scss">
// Safari hover over input fix
input.custom-control,
input.custom-control-input {
  width: 38px;
  height: 38px;
  cursor: pointer;
}
.booking-form-page {
  // TODO: checkup on general mobile behavior
  overflow: hidden;
  .booking-form {
    width: 1281px;
    min-height: 1092px;

    .navigation-column {
      width: 100%;

      .btn-secondary:focus, .btn-secondary.focus {
        box-shadow: none;
      }
      .prev-step {
        position:absolute;
        left: -2rem;
        top: 12.5rem;
        font-family: 'Chau Philomene One';
        font-size: 30px;
        text-transform: uppercase;
        color: #8B2346;
        background-color: #29d4c7;
        border: none;
        :focus{
          border: none;
        }
      }
      .next-step {
        position:absolute;
        right: -2rem;
        top: 12.5rem;
        font-family: 'Chau Philomene One';
        font-size: 30px;
        text-transform: uppercase;
        color: #8B2346;
        background-color: #29d4c7;
        border: none;
        :focus{
          border: none;
        }
      }
      @media screen and (min-width: 480px) {
        .prev-step {
          left: -2rem;
          top:7rem;
        }
        .next-step {
          right: -2rem;
          top: 7rem;
        }
      }
      @media screen and (min-width: 768px) {
        .prev-step {
          left: 1rem;
          top:7rem;
        }
        .next-step {
          right: 1rem;
          top: 7rem;
        }
      }
      
      .counter {
        position:absolute;
        top: 48px;
        font-family: 'Chau Philomene One';
        font-size: 50px;
        color: #007770;
        z-index: 40;
      }
      .counter-circle{
        z-index:30;
      }
      .counter-line {
        position: absolute;
        top: 77px;
        z-index: 20;
      }

    }
  }
}

</style>