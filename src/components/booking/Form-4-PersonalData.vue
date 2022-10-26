<template>
  <b-form-group 
    label="Ihre Daten" 
    label-class="label-group" 
    class="form-group">
    <b-row class="pt-2">
      <!-- Vor- & Nachname -->
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
            <div v-if="errorName" class="error-message ml-4">{{ errorMessage.name }}</div>
         </b-form-group>
      </b-col>
      <!-- Kontakt -->
      <b-col cols="12">
        <b-form-group 
          label="Kontakt"
          label-class="label-option" 
          class="form-option">
          <b-row class="p-0">
            <!-- E-Mail -->
            <b-col cols="12" md="6">
              <b-form-input
                type="email"
                placeholder="E-Mail Adresse"
                v-model="formData.email"
                class="form-element input-element"
                :class="stateEmail">
              </b-form-input>
              <div v-if="errorEmail" class="error-message ml-4">{{ errorMessage.email }}</div>
            </b-col>
            <!-- Telefonnummer -->
            <b-col cols="12" md="6" class="sm-mt-1">
              <b-form-input
                type="text"
                placeholder="Telefonnummer"
                v-model="formData.phonenumber"
                class="form-element input-element"
                :class="statePhonenumber">
              </b-form-input>
              <div v-if="errorPhonenumber" class="error-message ml-4">{{ errorMessage.phonenumber }}</div>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
      <!-- Art der Organisation -->
      <b-col cols="12">
        <b-form-group 
          label="Art der Organisation"
          label-class="label-option"  
          class=" form-option">
          <b-row class="mt-0 p-0">
            <!-- Radio Button - Art der Organisation -->
            <b-col 
              cols="12" sm="6" md="3"
              v-for="(organisation, ind)  in organisationTypes"
              :key="ind" class="ml-4">
              <b-form-radio
                :value="organisation"
                v-model="formData.organisationType"
                class="form-element bookingoption"
                :class="stateOrganisationType"
              > 
                {{ organisation }}
              </b-form-radio>
            </b-col>
            <b-col cols="12" v-if="errorOrganisationType" class="error-message mt-0 ml-4 mb-3">{{ errorMessage.organisationType }}</b-col>
            <!-- Name und Adresse der Organisation -->
            <b-col cols="12">
              <b-form-input
                type="text"
                placeholder="Name und Adresse der Organisation"
                v-model="formData.organisationNameAndAddress"
                class="form-element input-element"
                :class="stateOrganisationNameAndAddress">
              </b-form-input>
              <div v-if="errorOrganisationNameAndAddress" class="error-message ml-4">{{ errorMessage.organisationNameAndAddress }}</div>
            </b-col>
            <!-- Dropdown Schultyp -->
            <b-col cols="12" sm="10" md="6" class="pt-3"
            v-if="formData.organisationType === 'Schule'">
              <b-form-select
                  v-model="formData.schoolType"
                  class="form-element input-element schooltype"
                  :class="stateSchoolType"
                  :options="schoolTypes">
              </b-form-select>
              <div v-if="errorSchoolType" class="error-message ml-4">{{ errorMessage.schoolType }}</div>
            </b-col>
          </b-row>
        </b-form-group>
        <!-- DSGVO Einverständniserklärung -->
        <b-form-group 
          label="Einverständniserklärung"
          label-class="label-option"  
          class="form-option">
          <b-row class="mt-0 p-0">
            <b-col cols="12" class="ml-4">
              <b-form-checkbox
                id="terms-of-use"
                class="form-element herzkiste"
                v-model="formData.confirmTermsOfUse"
                name="terms-of-use"
                :value="true"
                :unchecked-value="false">
                I accept the terms and use
              </b-form-checkbox>
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
      ],
      errorMessage: {
        name: 'Bitte geben Sie einen Namen an!',
        email: 'Bitte geben Sie eine gültige Emailaddresse an!',
        phonenumber: 'Bitte geben Sie eine gültige Telefonnummer an!',
        organisationType: 'Bitte wählen Sie die Art der Organisation aus!',
        organisationNameAndAddress: 'Bitte geben Sie Name und Addresse der Organisation an!',
        schoolType: 'Bitte wählen Sie einen Schultypen!'
      }
    }
  },
  computed: {
    errorName() {
      if (this.validate && this.formData.name === '')
        return true
      return false
    },
    stateName() {
      if (this.errorName)
        return 'input-element-error' 
      return ''
    },
    errorEmail() {
      if (this.validate && (this.formData.email === '' ||
            this.validateEmail(this.formData.email))) {
              return true
            }
      return false
    },
    stateEmail() {
      if (this.errorEmail)
        return 'input-element-error' 
      return ''
    },
    errorPhonenumber() {
      if (this.validate && (this.formData.phonenumber === ''||
          this.validatePhonenumber(this.formData.phonenumber))) {
            return true
          }
      return false
    },
    statePhonenumber() {
      if (this.errorPhonenumber)
        return 'input-element-error'
      return ''
    },
    errorOrganisationType() {
      if (this.validate && this.formData.organisationType === '')
        return true
      return false
    },
    stateOrganisationType() {
      if (this.errorOrganisationType)
        'radio-element-error mb-0' 
      return ''
    },
    errorSchoolType() {
      if (this.validate && this.formData.organisationType === 'Schule')
        if (this.formData.schoolType === null)
          return true
      return false
    },
    stateSchoolType() {
      if (this.validate && this.formData.organisationType === 'Schule')
        return (this.formData.schoolType === null) ? 'input-element-error' : ''
      else 
        return ''
    },
    errorOrganisationNameAndAddress() {
      if (this.validate && this.formData.organisationNameAndAddress === '')
        return true
      return false
    },
    stateOrganisationNameAndAddress() {
      if (this.errorOrganisationNameAndAddress)
        return 'input-element-error'
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
      validatePhonenumber(phonenumber) {
        if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phonenumber))
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
.mb-0 {
  margin-bottom: 0px;
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