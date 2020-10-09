<template>
  <Layout :blue="true">
    <b-container class="header-padding footer-padding">
      <BookingForm />
    </b-container>
    <ModalBox id="modal-success" :title="successTitle" :message="successMessage"/>
    <ModalBox id="modal-error" :title="errorTitle" :message="errorMessage"/>
  </Layout>
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