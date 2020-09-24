<template>
  <b-form-group label="Last but not least">
    Actually this is a lie, because there will
     be another step after this one...

    <b-form-textarea
        name="price"
        v-model="formData.message"
        placeholder="Anregungen, Wünsche, etc."
        >
      </b-form-textarea>

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

<style lang="scss"></style>