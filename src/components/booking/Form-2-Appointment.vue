<template>
  <b-form-group label="Klassen und Wunschtermin">
    <!-- TODO: maybe put class in step before? -->
    <b-form-group label="Klassenname">
      <b-form-input
        type="text"
        placeholder="z.B. 1B"
        v-model="booking.class">
      </b-form-input>
    </b-form-group>
    <!-- Calendar -->
    <div id="formattedDateContainer">
      {{dateTimeFormatted}}
    </div>
    <b-calendar 
      id="date"
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
      v-for="(date, index) in clickedDates"
      :key="index"
      :target="`date__cell-${date.dateStr}_`"
      :show="(date.dateStr == selectedDate) && popoverOpen"
      >
        <template v-slot:title>
          Welche Zeit?
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
          pill 
          variant="secondary"
          @click="submitTime">
          Bestätigen
        </b-button>
      </b-popover>
  </b-form-group>
</template>

<script>
import { BIconSortNumericDownAlt } from 'bootstrap-vue'
export default {
  props: {
    value: null
  },
  data() {
    return {
      booking: this.value,
      clickedDates: [],
      selectedTime: '12:00',
      selectedDate: null,
      popoverOpen: false,
      dateFormatted: '',
      dateTimeFormatted: 'Bitte Tag und Zeit auswählen',
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
  },
  methods: {
    datesDisabled(ymd, date) {
      const weekday = date.getDay()
      return weekday === 0 || weekday === 6
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

<style lang="scss"></style>