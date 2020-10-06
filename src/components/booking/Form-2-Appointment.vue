<template>
  <b-form-group label="Klassen und Wunschtermin">
    <b-form-group label="Klassenname">
      <b-form-input
        type="text"
        placeholder="z.B. 1B"
        v-model="booking.class">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Haben Sie einen Herzkiste-Gutschein?">
      <!-- TODO: should be a checkbox -->
      <b-form-radio
        v-model="booking.herzkiste"
        value="Ja"
        >

        Ja
      </b-form-radio>
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
      // TODO: get selected date into form model (ask Anton)
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
      this.clickedDates.push(dateObject)
    },
    updateSelectedTime(time) {
      this.selectedTime = time.formatted
      this.dateTimeFormatted = `${this.dateFormatted}, ${this.selectedTime}`
      this.rawDate = `${this.selectedDate}T${this.selectedTime}:00Z`
      this.booking.date = this.rawDate
    },
    popoverIsShown(date) {
      this.selectedDate = date
      // when a popover is not shown yet
      if (!this.popoverOpen) {
        this.popoverOpen = !this.popoverOpen

      }
      // when a popover is already shown
      else {
        
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
      this.popoverOpen = !this.popoverOpen
      // TODO: turn on next button
      // TODO: show maybe some notification that date & time are submited correctly
    }
  }
}
</script>

<style lang="scss"></style>