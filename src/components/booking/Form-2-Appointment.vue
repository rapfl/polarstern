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
    </b-form-group>
    </b-col>
  </b-row>
    
    <!-- Calendar -->
    <div id="formattedDateContainer" >
     <span class="label-option"> Ihr Wunschtermin: </span>
     <span class="text"> {{dateTimeFormatted}} </span>    
    </div> 
    <b-calendar 
      id="date"
      class="calender pb-0 pt-0"
      :start-weekday="1"
      :date-disabled-fn="datesDisabled"
      :min="minDate"
      :show-decade-nav="false"
      :label-no-date-selected="dateTimeFormatted"
      :hide-header="true"
      @selected="dateClicked($event)"
      @input="popoverIsShown($event)"
      @context="changeFormattedDate($event)"
      block
      >
    </b-calendar>
    <b-popover 
      class="popover"
      v-for="(date, index) in clickedDates"
      :key="index"
      :target="`date__cell-${date.dateStr}_`"
      :show="(date.dateStr == selectedDate) && popoverOpen"
      >
        <template v-slot:title>
          <span class="popover-title">{{ booking.workshop }}</span>  <br>
          <b-button @click="onClose" class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button>
        </template>
        
        <!-- Time -->
        <b-time
          v-model="selectedTime"
          locale="de"
          @context="updateSelectedTime($event)"
          :label-no-time-selected="''">
        </b-time>
        <!-- Submit Button -->
        <b-button
          class="mt-2"
          pill 
          variant="secondary"
          @click="submitTime">
          Bestätigen
        </b-button>
      </b-popover>
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
import { BIconSortNumericDownAlt } from 'bootstrap-vue'
export default {
  props: {
    value: null,
    validate: false
  },
  data() {
    return {
      booking: this.value,
      clickedDates: [],
      selectedTime: '12:00',
      selectedDate: null,
      popoverOpen: false,
      dateFormatted: '',
      dateTimeFormatted: '',
      rawDate: '',
      submitClicked: false
    }
  },
  computed: {
    minDate() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      return minDate
    },
    stateClass() {
      if (this.validate) 
        return (this.booking.class === '') ? 'input-element-error' : ''
      else
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
    popoverIsShown(date) {
      this.selectedDate = date
      if (!this.popoverOpen) {                // when a popover is not shown yet
        this.popoverOpen = !this.popoverOpen
      }
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
      // make toast
      /*
      this.$bvToast.toast('Toast body content', {
        title: 'Gratuliere!',
        toaster: 'b-toaster-bottom-center',
        variant: 'primary',
        solid: true
      })
      */
    }
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
  .btn {
    color: #000;
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
