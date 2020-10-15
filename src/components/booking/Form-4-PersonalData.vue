<template>
  <b-form-group 
    label="Ihre Daten" 
    label-class="label-group" 
    class="form-group">
    <b-row class="pt-2">
      <b-col cols="12">
         <b-form-group 
          label="Vor- und Nachname" 
          label-class="label-option"  
           class=" form-option">
            <b-form-input
              type="text"
              v-model="formData.name"
              placeholder=""
              class="form-element input-element name"
              :class="stateName">
            </b-form-input>
         </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group 
          label="Kontakt"
          label-class="label-option" 
          class="form-option">
          <b-row class="p-0">
            <b-col cols="12" md="6">
              <b-form-input
                type="email"
                placeholder="E-Mail Adresse"
                v-model="formData.email"
                class="form-element input-element"
                :class="stateEmail">
              </b-form-input>
            </b-col>
            <b-col cols="12" md="6" class="sm-mt-1">
              <b-form-input
                type="text"
                placeholder="Telefonnummer"
                v-model="formData.phonenumber"
                class="form-element input-element"
                :class="statePhonenumber">
              </b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group 
          label="Art der Organisation"
          label-class="label-option"  
          class=" form-option">
          <b-row class="mt-0 p-0">
            <b-col 
              cols="12" sm="6" md="3"
              v-for="(organisation, ind)  in organisationTypes"
              :key="ind">
              <b-form-radio
                :value="organisation"
                v-model="formData.organisationType"
                class="form-element bookingoption"
                :class="stateOrganisationType"
              > 
                {{ organisation }}
              </b-form-radio>
            </b-col>
            <b-col cols="12">
              <b-form-input
                type="text"
                placeholder="Name und Adresse der Organisation"
                v-model="formData.organisationNameAndAddress"
                class="form-element input-element"
                :class="stateOrganisationNameAndAddress">
              </b-form-input>
            </b-col>
            <b-col cols="12" sm="10" md="6" class="pt-3"
            v-if="formData.organisationType === 'Schule'">
              <b-form-select
                  v-model="formData.schoolType"
                  class="form-element input-element schooltype"
                  :class="stateSchoolType"
                  :options="schoolTypes">
              </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: null,
    validate: false
  },
  data() {
    return {
      formData: this.value,
      organisationTypes: ['Schule', 'Organisation'],
      schoolTypes: [
        { value: null, text: 'Schultyp auswählen'},
        { value: 'AHS', text: 'AHS'},
        { value: 'Mittelschule', text: 'Mittelschule'},
        { value: 'FMS', text: 'FMS'},
        { value: 'PTS', text: 'PTS'},
        { value: 'Sonstige', text: 'Sonstige'}
      ]
    }
  },
  computed: {
    stateName() {
      if (this.validate)
        return (this.formData.name === '') ? 'input-element-error' : ''
      else 
        return ''
    },
    stateEmail() {
      if (this.validate)
        return (this.formData.email === '' ||
                this.validateEmail(this.formData.email)) ? 'input-element-error' : ''
      else 
        return ''
    },
    statePhonenumber() {
      if (this.validate)
        return (this.formData.phonenumber === '') ? 'input-element-error' : ''
      else 
        return ''
    },
    stateOrganisationType() {
      if (this.validate)
        return (this.formData.organisationType === '') ? 'radio-element-error' : ''
      else 
        return ''
    },
    stateSchoolType() {
      if (this.validate && this.formData.organisationType === 'Schule')
        return (this.formData.schoolType === null) ? 'input-element-error' : ''
      else 
        return ''
    },
    stateOrganisationNameAndAddress() {
      if (this.validate)
        return (this.formData.organisationNameAndAddress === '') ? 'input-element-error' : ''
      else 
        return ''
    }
  },
  methods: {
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
      }
  }
}
</script>

<style lang="scss" scoped>

.name{
  max-width: 470px;
}

.sm-mt-1 {
  margin-top: 4px;
}

@media screen and (min-width: 768px) {
  .sm-mt-1 {
    margin-top: 0px;
  }
}
</style>