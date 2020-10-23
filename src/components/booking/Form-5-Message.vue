<template>
  <b-form-group
    label="Last but not least"
    label-class="label-group" 
    class="form-group">
    <b-form-group
    label="Wollen Sie uns noch etwas mitteilen?"
    label-class="label-option"  
    class=" form-option">
    <b-form-textarea
        name="price"
        v-model="formData.message"
        placeholder="Anregungen, Wünsche, etc."
        class="message"
        >
      </b-form-textarea>
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
      formData: this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  max-width: 502px;
  height: 316px;
  border-radius: 43px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.5rem;
  padding-bottom:1.5rem;
  border: 3px solid #007770;
}
</style>