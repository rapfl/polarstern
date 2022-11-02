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
        <b-col cols="12" md="6" lg="4"
          v-for="(workshop, ind) in workshopList"
          :key="ind"
          class="form-element workshop mb-5"
          :class="filterGray(ind)"
          @click="setWorkshop(ind)"
        >
          <div class="workshop-box-2 border-checked" :class="(stateWorkshop + ' ' + workshop.color)">
            <h2>{{workshop.name}}</h2>
            <g-image :src="workshop.icon" :alt="workshop.alt"/>
            <h3>{{workshop.length}}</h3>
            <h4 v-if="workshop.price" class="font-white">{{workshop.price}}</h4>
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
          v-if="hasHerzkiste(booking.workshop)" 
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

<static-query>
query {
  allStoryblokEntry {
    edges {
      node {
        id
        full_slug
        name
        content
      }
    }
  }
}
</static-query>

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
        'In der Klasse', 'Draußen','Online'
      ],
    }
  },
  computed: {
    edges () {
      return this.$static.allStoryblokEntry.edges || []
    },
    workshopList () {
      var workshopListArray = []
      for (var i = 0; i < this.edges.length; i++) {
        if (this.$static.allStoryblokEntry.edges[i].node.full_slug.includes("workshop-types")
          && this.$static.allStoryblokEntry.edges[i].node.content.show_workshop) {
          workshopListArray.push(
            {
              id: this.edges[i].node.id,
              name: this.edges[i].node.content.name,
              length: this.edges[i].node.content.length,
              color: this.edges[i].node.content.color,
              icon: this.edges[i].node.content.icon.filename,
              alt: this.edges[i].node.content.icon.alt,
              herzkiste: this.edges[i].node.content.herzkiste,
              airtable_name: this.edges[i].node.content.airtable_name,
              price: this.edges[i].node.content.price
            }
          )
        }
      }
      return workshopListArray
    },
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
      this.booking.workshop = this.workshopList[index].airtable_name
    },
    filterGray(index) {
      if (this.booking.workshop === '') 
        return ''
      else if (this.workshopList[index].airtable_name === this.booking.workshop)
        return 'border-col'
      else
        return 'filter-gray'
    },
    hasHerzkiste(workshopName) {
      for (var i = 0; i < this.workshopList.length; i++) {
        if (workshopName == this.workshopList[i].airtable_name) {
          return this.workshopList[i].herzkiste
        }
      }
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Chau+Philomene+One&display=swap&subset=latin-ext');

.filter-gray{
  filter: grayscale(1);
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
    height: 350px;
    min-width:243px;
    cursor: pointer;
    // TODO: Fix border at yellow workshop box
    // TODO: Fix alignment and sizes in mobile
    // TODO: define more global styles
    .workshop-box-2 {
      width:239px;
      height: 400px;
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
  .custom-control-label,
  .custom-control-label::after {
    cursor: pointer;
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
      content: '';
      opacity: 0;
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

  .input-element,
  .b-form-datepicker {
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
    .custom-control-label::after {
      width: 100%;
      height: 100%;
    }
  }
  .error-message {
    color:#e22e77;
    font-size: 16px;
  }
  .border-col {
    .bg-yellow.border-checked {
      border: 5px solid #e22e77;
    }
    .border-checked {
      border: 5px solid #FFE100;
    }
  }
}
</style>
