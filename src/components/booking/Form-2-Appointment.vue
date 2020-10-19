<template>
  <b-form-group 
  label="Klassen und Wunschtermin"
  label-class="label-group" 
  class="form-group"
  ><b-row>
    <b-col cols="12" md="6">
      <b-form-group 
      label="Klassenname"
      label-class="label-option" 
      class="form-option "
    ><b-form-input
        type="text"
        class="input-element"
        :class="stateClass"
        placeholder="z.B. 1B"
        v-model="booking.class">
      </b-form-input>
      <div v-if="errorClass" class="error-message ml-4">{{ errorMessage.class }} </div>
    </b-form-group>
    </b-col>
  </b-row>
    
    <!-- Calendar -->
    <div id="formattedDateContainer" >
     <span class="label-option"> Ihre Wunschtermine: </span>
    </div>

    <div v-for="index in numDates" 
      :key="index" 
      class="appointment-wrapper mb-4">

      <label>{{'Termin ' + index + ':'}}</label>

      <b-form-datepicker
      class="py-3 mb-4"
      @input="addClickedDate($event, index-1)"
      @context="addFormatedDate($event, index-1)"
      :start-weekday="1"
      :date-disabled-fn="datesDisabled"
      :min="minDate"
      :show-decade-nav="false"
      :hide-header="true"
      :label-no-date-selected="pickDateMessage"
      menu-class="w-100"
      calendar-width="100%"
      dropup>
      </b-form-datepicker>

      <b-form-input 
        class="input-element" 
        type="time"
        :placeholder="pickTimeMessage"
        @input="addTime($event, index-1)">
      </b-form-input> 
      <b-button-group vertical v-if="numDates == index">
        <b-button
          pill 
          variant="warning" 
          :active="clickedDates[index-1] && timesFormatted[index-1]"
          class="mt-3 mr-3"
          @click="addAppointmentWrapper(index)">
          <b-icon class="mr-2" icon="calendar2-plus"></b-icon> Neuen Termin hinzufügen
        </b-button>
        <b-button
          pill 
          variant="secondary" 
          class="mt-3"
          v-if="index > 1"
          @click="removeLastAppointmentWrapper(index)">
          <b-icon class="mr-2" icon="calendar2-minus"></b-icon>Letzten Termin entfernen
        </b-button>
      </b-button-group>
     
    </div>
  </b-form-group>
</template>

<static-query>
query {
  availabilities: allAvailability {
    edges {
      node {
        tag
      }
    }
  }
}
</static-query>

<script>

export default {
  props: {
    value: null,
    validate: false,
    firstDate: ''
  },
  data() {
    return {
      booking: this.value,
      selectedDate: null,
      numDates: 1,
      clickedDates: [],
      datesFormatted: [],
      timesFormatted: [],
      dateTimesFormatted: [],
      rawDate: '',
      submitClicked: false,
      pickDateMessage: 'Wählen Sie hier ein Datum aus',
      pickTimeMessage: 'Wählen Sie hier eine Zeit aus',
      errorMessage: {
        class: 'Bitte geben Sie einen Klassennamen an!'
      }
    }
  },
  computed: {
    minDate() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      return minDate
    },
    errorClass() {
      if (this.validate && this.booking.class === '')
        return true
      false
    },
    stateClass() {
      if (this.errorClass) 
        return 'input-element-error' 
      return ''
    }
  },
  methods: {
    datesDisabled(ymd, date) {
      // is date a weekday?
      const day = date.getDay()
      const isWeekday = (day === 0 || day === 6)
      if (isWeekday) return true

      // is date available?
      const availabilities = this.$static.availabilities.edges
      for (var i = 0; i < availabilities.length; i++) {
        if (ymd == availabilities[i].node.tag) {
          return true
        }
      }
    },
    // TODO: prevent multiple popover in one date
    dateClicked(date) {
      var dateObject = {
        dateStr: date,
        time: 'test'
      }
      this.rawDate = ''
      this.booking.date = ''
      this.clickedDates.push(dateObject)
    },
    updateSelectedTime(time) {
      this.selectedTime = time.formatted
      this.dateTimeFormatted = `${this.dateFormatted}, ${this.selectedTime} Uhr`
    },
    addClickedDate(date, index) {
      this.clickedDates[index] = date
    },
    addFormatedDate(date, index) {
      if (date.selectedFormatted) {
        this.datesFormatted[index] = date.selectedFormatted
        if (this.timesFormatted[index]) {
          this.dateTimesFormatted[index] = `${date.selectedFormatted}, ${this.timesFormatted[index]} Uhr`
        }
        else {
          this.dateTimesFormatted[index] = `${date.selectedFormatted}`
        }
      }
    },
    addTime(time, index) {
      if (time) {
        this.timesFormatted[index] = time
        this.dateTimesFormatted[index] = `${this.datesFormatted[index]}, ${time} Uhr`
      }
    },
    addAppointmentWrapper(index) {
      this.numDates++
    },
    removeLastAppointmentWrapper(index) {
      this.numDates--
      this.clickedDates.pop()
      this.datesFormatted.pop()
      this.timesFormatted.pop()
      this.dateTimesFormatted.pop()
    },
    changeFormattedDate(date) {
      if (this.popoverOpen) {
        this.dateFormatted = date.activeFormatted
      }
    },
    onClose() {
      this.popoverOpen = !this.popoverOpen
    },
    submitTime() {
      // update data
      this.popoverOpen = !this.popoverOpen
      this.rawDate = `${this.selectedDate}T${this.selectedTime}:00`
      this.booking.date = this.rawDate
      this.booking.formattedDate = this.dateTimeFormatted
    },
    

  }
}
</script>

<style lang="scss">
.calender {
  .bg-light {
    background-color:#ECE1D9 !important ;
  }
  .title-big {
    font-size: 30px;
  }
  .row {
    padding-top: .1rem !important;
    padding-bottom: .1rem !important;
  }
  .small{
    display: none;
  }
  .b-calendar-grid-caption {
    background-color: var(--blue);
    font-family: 'Chau Philomene One';
    font-size: 30px;
    color:white;
    text-transform: uppercase;
  }
  .b-calendar-grid {
    border: none;
  }
  .b-calendar-grid-body .col {
    height: 70px;
  }
  .btn {
    color: #000;
  }
}
.b-form-datepicker {
  .btn {
    color: #000;
    padding-left: 0;
    .bi-calendar {
      color: #000;
    }
  }
}

.popover {
  min-width: 280px;
  height: 220px;
  width: 421px;
  border: 3px solid #007770;
  .popover-title {
    color: #E22E77;
    font-size: 20px;
    font-family: 'Roboto';
  }
}
</style>
