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
    <!-- Name -->
      <b-form-group
        label="Vor- & Nachname:"
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
      <!-- Position -->
      <b-form-group
        label="Position:"
        :label-for="'position-' + module_id">
        <b-form-input :id="'position-' + module_id"
                        type="text" 
                        name="position"
                        v-model="formData.position"
                        placeholder="Lehrkraft, Direktion, etc."
                        required/>
      </b-form-group>
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
        :label="'Adresse der ' + (formData.organization == 'Schule' ? 'Schule' : 'Organisation')"
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
      <!-- Phone number -->
      <b-form-group
        label="Telefonnummer:"
        :label-for="'phone-number-' + module_id">
        <b-form-input :id="'phone-number-' + module_id"
                        type="tel" 
                        name="phonenumber"
                        v-model="formData.phonenumber"
                        placeholder="Für Rückfragen am Workshop-Tag"
                        required/>
      </b-form-group>
    </div>
   
   <div class="workshop-info">
    <!-- Workshop selection -->
    <b-form-group
      label="Welche Workshops möchten Sie buchen?" :label-for="'workshops-' + module_id">
      <input type="checkbox" id="ws1" name="workshops1" value="Stärken entdecken" v-model="formData.workshops1">
      <label for="ws1">&nbsp;Stärken entdecken</label><br>
      <input type="checkbox" id="ws2" name="workshops2" value="Zukunftsperspektiven" v-model="formData.workshops2">
      <label for="ws2">&nbsp;Zukunftsperspektiven</label><br>
      <input type="checkbox" id="ws3" name="workshops3" value="Achtsamkeit" v-model="formData.workshops3">
      <label for="ws3">&nbsp;Achtsamkeit</label>
    </b-form-group>
    <!-- Booking selection -->
    <b-form-group
      label="Wählen Sie eine Buchungsoption:" :label-for="'booking-' + module_id">
      <input type="radio" id="booking-class" name="booking" value="Klasse" v-model="formData.booking">
      <label for="booking-class">&nbsp;In der Klasse</label><br>
      <input type="radio" id="booking-outside" name="booking" value="Draußen" v-model="formData.booking">
      <label for="booking-outside">&nbsp;Draußen/im Turnsaal</label><br>
    </b-form-group>
    <!-- Date suggestions -->
    <b-form-group 
      label="Wunschtermine und Klassen:"
      :label-for="'dates-' + module_id">
      <b-form-textarea
        :id="'dates-' + module_id"
        name="dates"
        v-model="formData.dates"
        placeholder="Bitte geben Sie pro Workshop die Klasse und zwei Wunschtermine an von Mo.-Do. 07:30-14:00 Uhr an. Geben Sie uns mindestens eine Woche Vorlaufzeit um uns gut vorzubereiten."
        rows="4"
        max-rows="20"
        required>
      </b-form-textarea>
    </b-form-group>
     <!-- Herzkiste selection -->
    <b-form-group
      label="Haben Sie einen Herzkiste-Gutschein?" :label-for="'herzkiste-' + module_id">
      <input 
      type="radio" 
      id="herzkiste-ja" 
      name="herzkiste" 
      value="Ja"
      v-model="formData.herzkiste">
      <label for="herzkiste-ja">&nbsp;Ja</label><br>
      <input 
      type="radio" 
      id="herzkiste-nein" 
      name="herzkiste" 
      value="Nein"
      v-model="formData.herzkiste">
      <label for="herzkiste-nein">&nbsp;Nein</label><br>
    </b-form-group>
        <!-- Price suggestion -->
    <b-form-group 
      label="Wunschpreis pro Teilnehmer*in und Stunde:"
      :label-for="'price-' + module_id">
      <b-form-textarea
        :id="'price-' + module_id"
        name="price"
        v-model="formData.price"
        placeholder="z.B. 5€"
        rows="1"
        max-rows="1"
        required>
      </b-form-textarea>
    </b-form-group>
    <!-- Message -->
    <b-form-group 
      label="Nachricht (optional):"
      :label-for="'message-' + module_id">
      <b-form-textarea
        :id="'message-' + module_id"
        name="message"
        v-model="formData.message"
        placeholder="Anregungen, Wünsche, etc."
        rows="1"
        max-rows="6">
      </b-form-textarea>
    </b-form-group>
    <!-- Submit Button -->
    <b-button type="submit" pill variant="secondary">
      Buchungsanfrage senden
    </b-button>
    </div>
  </form>
</template>
<script type="text/javascript" src="https://form.jotform.com/jsform/202526486749062"></script>

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
        dates: '',
        message: '',
        herzkiste: '',
        booking: '',
        price: '',
        workshops1: '',
        workshops2: '',
        workshops3: '',
      },
      organizationType: [
        { value: '', text: 'Bitte auswählen ...'},
        { value: 'Schule', text: 'Schule'},
        { value: 'Organisation', text: 'Organisation'}
      ],
      schoolType: [
        { value: '', text: 'Bitte auswählen ...'},
        { value: 'AHS', text: 'AHS'},
        { value: 'NMS', text: 'Mittelschule'},
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