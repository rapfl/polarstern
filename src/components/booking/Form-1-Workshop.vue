<template>
  <b-form-group 
    label="Ihr Workshop"
    label-class="label-group" 
    class="form-group"
  ><b-form-group 
      class=" form-option"
      label="Welchen Workshop wollen Sie buchen?"
      label-class="label-option" 
    >
      <b-row class="p-0">
        <b-col cols="12" md="6" lg="3"
          v-for="(workshop, ind) in workshops"
          :key="ind"
          class="form-element workshop"
          :class="filterGray(ind)"
          @click="setWorkshop(ind)"
        >   
        <div class="workshop-box-2 bg-green border-yellow" :class="stateWorkshop" v-if="ind === 0">
          <h2>STÄRKEN <br> ENTDECKEN</h2>  
          <g-image src='~/assets/svg/StaerkenEntdecken.svg' />
          <h3>1 Stunde</h3>
        </div>
        <div class="workshop-box-2 bg-green border-yellow" :class="stateWorkshop" v-if="ind === 1">
          <h2>STÄRKEN <br> ENTDECKEN</h2>  
          <g-image src='~/assets/svg/StaerkenEntdecken.svg' />
          <h3>2 Stunde</h3>
        </div>
        <div class="workshop-box-2 bg-pink border-yellow" :class="stateWorkshop" v-if="ind === 2">
          <h2>Zukunfts- perspektive</h2>  
          <g-image class="pos-abs" src='~/assets/svg/Zukunftsperspektive.svg' />
          <h3>1 Stunde</h3>
        </div>
        <div class="workshop-box-2 bg-yellow border-yellow" :class="stateWorkshop" v-if="ind === 3">
          <h2>Achtsamkeit</h2>  
          <g-image src='~/assets/svg/Achtsamkeit.svg' />
          <h3>1 Stunde</h3>
        </div>
        </b-col>
      </b-row>
      <div v-if="errorWorkshop" class="error-message mt-1"> {{errorMessage.workshop }}</div>
    </b-form-group>
    <!-- Herzkiste -->
    <!-- TODO: implement get URL with herzkiste as default -->
    <b-row class="p-0">
      <b-col cols="12" class="mt-3">
        <b-form-group 
          v-if="booking.workshop == 'Stärken Entdecken (2h)'" 
          label="Haben Sie einen Herzkiste-Gutschein?"
          label-class="label-option"
          class="form-option">
          <b-form-checkbox
            class="form-element herzkiste"
            v-model="booking.herzkiste">
            Ja
          </b-form-checkbox>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" class="mt-3">
        <b-form-group 
          label="Buchungsoption"
          label-class="label-option" 
          class="form-option"
        >
          <b-form-radio
            v-for="(option, ind)  in bookingOptions"
            :key="ind"
            class="form-element bookingoption"
            :class="stateBookingoption"
            :value="option"
            v-model="booking.bookingoption"
          > 
            {{ option }}
          </b-form-radio>
          <div v-if="errorBookingoption" class="error-message">{{ errorMessage.bookingoption }}</div>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" class="mt-3">
        <b-form-group   
          label="Wunschpreis pro Teilnehmer*in und Stunde"
          label-class="label-option" 
          class="form-option"
        >
          <b-form-input
            name="price"
            v-model="booking.price"
            class="form-element price input-element"
            :class="statePrice"
            placeholder="z.B. 5€"
            
            >
          </b-form-input>
          <div v-if="errorPrice" class="error-message ml-4">{{ errorMessage.price }} </div>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: null,
    clickedNext: false,
    validate: false
  },
  data() {
    return {
      errorMessage: {
        workshop: 'Bitte wählen Sie einen Workshop aus!',
        bookingoption: 'Bitte wählen Sie eine Buchungsoption aus!',
        price: 'Bitte geben Sie einen Wunschpreis an!'
      },
      booking: this.value,
      bookingOptions: [
        'In der Klasse', 'Draußen','Im Turnsaal'
      ],
      workshops: [
        "Stärken Entdecken (1h)",
        "Stärken Entdecken (2h)",
        "Zukunftsperspektive",
        "Achtsamkeit"
      ]
    }
  },
  computed: {
    statePrice() {
      if (this.validate && this.booking.price === '') 
        return 'input-element-error'
      return ''
    },
    errorPrice(){
      if (this.validate && this.booking.price === '') 
        return true
      return false
    },
    stateBookingoption() {
      if (this.validate && this.booking.bookingoption === '')
        return 'radio-element-error' 
      return ''
    },
    errorBookingoption() {
      if (this.validate && this.booking.bookingoption === '')
        return true
      return false
    },
    errorWorkshop() {
      if (this.validate && this.booking.workshop === '')
        return true
      return false
    },
    stateWorkshop() {
      if (this.errorWorkshop)
        return 'workshop-element-error'
      return ''
    }
  },
  
  methods: {
    setWorkshop(index) {
      this.booking.workshop = this.workshops[index]
    },
    filterGray(index) {
      if (this.booking.workshop === '') 
        return ''
      else if (this.workshops[index] === this.booking.workshop)
        return 'border-col'
      else
        return 'filter-gray'
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap&subset=latin-ext');

.filter-gray{
  filter: grayscale(1);
}
.border-col {
  .border-yellow {
    border: 5px solid #FFE100 !important;
}
}

.label-group {
  font-family: 'Chau Philomene One';
  font-size: 50px;
  color:white;
  text-transform: uppercase;
}

.label-option {
  font-family: 'Chau Philomene One';
  font-size: 30px;
  color:white;
  text-transform: uppercase;
}

.form-group {
  font-family: 'Roboto';
  font-size: 24px;
  color: white;
  .form-element {
    font-weight: 500;
  }
  .workshop {
    margin-top: 1rem;
    height: 350;
    min-width:243px;
    .workshop-box-2 {
      width:239px;
      height: 350.88px;
      border: 5px solid white;
      display: grid;
      text-align: center;
      align-content: space-between;
      justify-items: center;
      padding-top: 1.7rem;
      padding-bottom: 1rem;
      h2 {
        font-family: 'Chau Philomene One';
        font-size: 26px;
        text-transform: uppercase;
        color: #FFE100;
      }
      h3 {
        font-family: 'Chau Philomene One';
        font-size: 30px;
        text-transform: uppercase;
        color: #8B2346;
      }
      .pos-abs {
          position: absolute;
          top: 100px;
        }
    }
    .workshop-element-error {
      border: 6px solid #E22E77;
      box-shadow: 0 0 0 0.2rem rgba(226, 46, 119, 0.25) !important;
    }
    .bg-yellow {
        background-color: #FFE100;
        h2 {
          color:#E22E77 !important;
        }
    }
    .bg-pink {
      background: #E22E77;
    }
    .bg-green {
      background:#44C7BF;
    }
  }
  .herzkiste {
    .custom-control-label {
      padding-left: 38px;
      padding-top: 6px;
    }
     .custom-control-label::before {
      border: 3px solid #007770;
      border-radius: 0px;
      width: 38px;
      height: 38px;
    }
    .custom-control-label::after {
      content: none;
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      background-color:#E22E77;
    }
  }
  .bookingoption{
    margin-bottom: 1rem;
    .custom-control-label {
      padding-left: 38px;
      padding-top: 6px;
    }
    .custom-control-label::before{
      border: 3px solid #007770;
      width: 38px;
      height: 38px;
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      background-color:#E22E77;
    }
    .custom-control-input:checked ~ .custom-control-label::after {
      background-image: none; 
    }
  }

  .input-element {
    height: 86px;
    border-radius: 43px;
    border: 3px solid #007770;
    font-family: 'Roboto';
    font-size: 20px;
    padding-left: 2rem;
  }
  .input-element-error {
    border: 4px solid #e22e77;
    box-shadow: 0 0 0 0.2rem rgba(226, 46, 119, 0.25)
  }
  .radio-element-error {
    color: #e22e77;
    .custom-control-label::before{
      border: 4px solid #e22e77 !important;
      box-shadow: 0 0 0 0.2rem rgba(226, 46, 119, 0.25) !important;
    }
  }
  .error-message {
    color:#e22e77;
    font-size: 16px;
  }
}
</style>
