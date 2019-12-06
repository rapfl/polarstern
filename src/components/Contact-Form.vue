<template>
  <form name="Kontakt-Formular"
        method="post"
        @submit.prevent="handleSubmitAJAX"
        action="/contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field">
    <!-- Hidden Honeypot Field -->
    <input type="hidden" name="form-name" value="Kontakt-Formular"/>
    <p hidden>
      <label>
        Don't fill this out: <input name="bot-field"/>
      </label>
    </p>
    <!-- Name -->
    <b-form-group
      label="Name:"
      label-for="contact-name">
      <b-form-input id="contact-name"
                    type="text" 
                    name="name"
                    v-model="formData.name"
                    required/>
    </b-form-group>
    <!-- E-Mail Address -->
    <b-form-group
      label="E-Mail Adresse:"
      label-for="contact-email">
      <b-form-input id="contact-email"
                      type="email" 
                      name="email"
                      v-model="formData.email"
                      required/>
    </b-form-group>
    <!-- Message -->
    <b-form-group 
      label="Nachricht:"
      label-for="contact-message">
      <b-form-textarea
        id="contact-message"
        name="message"
        v-model="formData.message"
        placeholder="Anregungen, Wünsche, etc."
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
        message: ''
      }
    }
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