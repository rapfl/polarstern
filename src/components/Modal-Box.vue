<template>
  <b-modal  :id="id" 
            hide-footer
            centered
            header-class="custom-header" 
            body-class="custom-body" 
            footer-class="custom-footer" 
            :title="title">
    <p class="my-4">{{message}}</p>
    <g-link :to="redirect">
      <b-button 
      class="primary rounded-pill mt-4"
      @click="hideModal"
    >OK</b-button></g-link>
    
  </b-modal>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    message: String,
    redirect: String
  },
  methods: {
    hideModal() {
      this.$bvModal.hide(this.id)
    }
  }
}
</script>

<style lang="scss">
  .modal {
    .modal-dialog {
      .modal-content {
        background-clip: unset;
        border: none;
        border-radius: unset;
        box-shadow: 21px -20px 0px 0px var(--red);
      }
      .custom-header {
        font-family: 'Chau Philomene One';
        text-transform: uppercase;
        border: none;
        h5.modal-title {
          font-size: 24px;
        }
      }
      .custom-body {
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        p {
          font-size: 16px;
        }
      }
      .custom-footer {
        border: none;
        justify-content: flex-start;
      }
    }
  }
</style>