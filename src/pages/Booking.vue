<template>
  <Layout>
    <b-container class="header-padding footer-padding ">
      <BookingForm />
    </b-container>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Page.vue'
import BookingForm from '~/components/Booking-Form.vue'

export default {
  components: {
    Layout,
    BookingForm
  },
  props: {}
}
</script>

<style lang="scss"></style>