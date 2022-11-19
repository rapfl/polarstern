<template>
  <div class="bg-primary">
    <b-container class="py-5">
      <!-- TODO: Make booking more customizable in CMS -->
      <BookingForm />
    </b-container>
    <ModalBox id="modal-success" :title="successTitle" :message="successMessage" :redirect="redirectUrl"/>
    <ModalBox id="modal-error" :title="errorTitle" :message="errorMessage" :redirect="redirectUrl"/>
  </div>
</template>

<script>
import Layout from '~/layouts/Page.vue'
import BookingForm from '~/components/Booking-Form.vue'
import ModalBox from '~/components/Modal-Box.vue'

export default {
  components: {
    Layout,
    BookingForm,
    ModalBox
  },
  data(){
    return {
      successTitle: 'Anfrage erfolgreich :)',
      successMessage: 'Cool, dass Sie jungen Menschen ermöglichen möchten, stark zu sein! Wir melden uns ganz bald mit der Terminbestätigung für die Workshops.',
      errorTitle: 'Etwas ist schief gelaufen :(',
      errorMessage: 'Die Internetverbindung bzw. unsere Website scheint technische Schwierigkeiten zu haben. Versuche es später noch einmal!',
      redirectUrl: '/workshops'
    }
  },
  props: {}
}
</script>

<style lang="scss" scoped>

@media (min-width: 1200px) {
    .container{
        max-width: 1200px;
    }
}
</style>