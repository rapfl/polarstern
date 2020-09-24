<template>
  <b-form-group label="Ihre Daten">
    <b-form-group label="Vor- und Nachname">
      <b-form-input
        type="text"
        v-model="formData.name">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Kontakt">
      <b-form-input
        type="text"
        placeholder="E-Mail Adresse"
        v-model="formData.email">
      </b-form-input>
      <b-form-input
        type="text"
        placeholder="Telefonnummer"
        v-model="formData.phonennumer">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Art der Organisation">
      <b-form-radio
        v-for="(organisation, ind)  in organisationTypes"
        :key="ind"
        :value="organisation"
        v-model="formData.organisationType"
      > 
        {{ organisation }}
      </b-form-radio>
      <b-form-input
        type="text"
        placeholder="Name und Adresse der Organisation"
        v-model="formData.organisationNameAndAddress">
      </b-form-input>
      <b-form-select
          v-if="formData.organisationType === 'Schule'"
          v-model="formData.schoolType"
          :options="schoolTypes">
      </b-form-select>
    </b-form-group>
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
        { value: 'NMS', text: 'Mittelschule'},
        { value: 'FMS', text: 'FMS'},
        { value: 'PTS', text: 'PTS'},
        { value: 'Sonstiges', text: 'Sonstiges'}
      ]
    }
  }
}
</script>

<style lang="scss"></style>