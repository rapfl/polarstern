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
              class="form-element input-element name">
            </b-form-input>
         </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group 
          label="Kontakt"
          label-class="label-option" 
          class="form-option">
          <b-row class="p-0">
            <b-col>
              <b-form-input
                type="text"
                placeholder="E-Mail Adresse"
                v-model="formData.email"
                class="form-element input-element">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-input
                type="text"
                placeholder="Telefonnummer"
                v-model="formData.phonenumber"
                class="form-element input-element">
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
              cols="3" 
              v-for="(organisation, ind)  in organisationTypes"
              :key="ind">
              <b-form-radio
                :value="organisation"
                v-model="formData.organisationType"
                class="form-element bookingoption"
              > 
                {{ organisation }}
              </b-form-radio>
            </b-col>
            <b-col cols="12">
              <b-form-input
                type="text"
                placeholder="Name und Adresse der Organisation"
                v-model="formData.organisationNameAndAddress"
                class="form-element input-element">
              </b-form-input>
            </b-col>
            <b-col cols="6" class="pt-3">
              <b-form-select
                  v-if="formData.organisationType === 'Schule'"
                  v-model="formData.schoolType"
                  class="form-element input-element schooltype"
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
    value: null
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
  }
}
</script>

<style lang="scss" scoped>

.name{
  max-width: 470px;
}

.schooltype {
  
}
</style>