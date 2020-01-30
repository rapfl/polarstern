<template>
  <form :name="name"
          method="post"
          @submit.prevent="handleSubmitAJAX"
          action="/workshops"
          data-netlify="true"
          data-netlify-honeypot="bot-field">
    <!-- Hidden Honeypot Field -->
    <input type="hidden" name="form-name" :value="name"/>
    <p hidden>
      <label>
        Don't fill this out: <input name="bot-field"/>
      </label>
    </p>
    <div class="organization-info">
      <!-- Organization Type -->
      <b-form-group
        label="Art der Organisation:"
        :label-for="'organization-type-' + module_id">
        <b-form-select 
          :id="'organization-type-' + module_id"
          name="organization"
          v-model="formData.organization"
          :options="organizationType"
          required></b-form-select>
      </b-form-group>
      <!-- School type -->
      <b-form-group
        label="Schultyp:"
        :label-for="'school-type-' + module_id"
        v-show="formData.organization == 'Schule'">
        <b-form-select 
          :id="'school-type-' + module_id"
          name="school"
          v-model="formData.school"
          :options="schoolType"
          :required="formData.organization == 'Schule' ? true : false"></b-form-select>
      </b-form-group>
      <!-- Class -->
      <b-form-group
        label="Klasse:"
        :label-for="'school-class-' + module_id"
        v-show="formData.organization == 'Schule'">
        <b-form-input :id="'school-class-' + module_id"
                        type="text" 
                        name="schoolclass"
                        v-model="formData.schoolclass"
                        :required="formData.organization == 'Schule' ? true : false"/>
      </b-form-group>
      <!-- Name of Organization -->
      <b-form-group
        :label="'Name der ' + (formData.organization == 'Schule' ? 'Schule' : 'Organisation')"
        :label-for="'organization-name-' + module_id">
        <b-form-input :id="'organization-name-' + module_id"
                        type="text" 
                        name="organizationName"
                        v-model="formData.organizationName"
                        required/>
      </b-form-group>
      <!-- Address -->
      <b-form-group
        :label="'Straße der ' + (formData.organization == 'Schule' ? 'Schule' : 'Organisation')"
        :label-for="'address-' + module_id">
        <b-form-textarea
          :id="'address-' + module_id"
          name="address"
          v-model="formData.address"
          rows="3"
          max-rows="3"
          required>
        </b-form-textarea>
      </b-form-group>
    </div>
    <div class="sender-info">
      <!-- Name -->
      <b-form-group
        label="Vor- & Nachname der Ansprechperson:"
        :label-for="'name-' + module_id">
        <b-form-input :id="'name-' + module_id"
                        type="text" 
                        name="name"
                        v-model="formData.name"
                        required/>
      </b-form-group>
      <!-- E-Mail Address -->
      <b-form-group
        label="E-Mail Adresse:"
        :label-for="'email-' + module_id">
        <b-form-input :id="'email-' + module_id"
                        type="email" 
                        name="email"
                        v-model="formData.email"
                        required/>

      </b-form-group>
      <!-- Phone number -->
      <b-form-group
        label="Telefonnummer:"
        :label-for="'phone-number-' + module_id">
        <b-form-input :id="'phone-number-' + module_id"
                        type="tel" 
                        name="phonenumber"
                        v-model="formData.phonenumber"
                        required/>
      </b-form-group>
      
    </div>

    <!-- Message -->
    <b-form-group 
      label="Nachricht (optional):"
      :label-for="'message-' + module_id">
      <b-form-textarea
        :id="'message-' + module_id"
        name="message"
        v-model="formData.message"
        placeholder="Terminvorschläge, Anregungen, Wünsche, etc."
        rows="6"
        max-rows="6"
        required>
      </b-form-textarea>
    </b-form-group>
    <!-- Submit Button -->
    <b-button type="submit" pill variant="secondary">
      Senden
    </b-button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phonenumber: '',
        address: '',
        organization: '',
        organizationName: '',
        school: '',
        schoolclass: '',
        message: '',
      },
      organizationType: [
        { value: '', text: 'Bitte auswählen ...'},
        { value: 'Schule', text: 'Schule'},
        { value: 'Organisation', text: 'Organisation'}
      ],
      schoolType: [
        { value: '', text: 'Bitte auswählen ...'},
        { value: 'AHS', text: 'AHS'},
        { value: 'NMS', text: 'NMS'},
        { value: 'FMS', text: 'FMS'},
        { value: 'PTS', text: 'PTS'},
        { value: 'Sonstiges', text: 'Sonstiges'}
      ]
    }
  },
  props: {
    name: String,
    module_id: Number
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    },
    async handleSubmitAJAX($event) {
      const form = $event.target
      const body = new URLSearchParams(new FormData(form))
      try {
        const res = await fetch(form.action, {method: 'POST', body})
        if (res.ok) {
          this.$bvModal.show('modal-success')
          console.log("Success");
        } else {
          console.log("Not OK");
          this.$bvModal.show('modal-error')
          throw res
        }
      }
      catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
  label, select,
  textarea, input {
    font-family: 'Roboto', sans-serif;
    font-weight: 200;
  }
</style>