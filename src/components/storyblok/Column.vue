<template>
  <b-col v-editable="blok"
        :class="blok.justify"
        :align-self="blok.alignment"
        :cols="blok.grid_settings.xsmall || 12"
        :sm="blok.grid_settings.small || blok.grid_settings.xsmall"
        :md="blok.grid_settings.medium || blok.grid_settings.xsmall"
        :lg="blok.grid_settings.large || blok.grid_settings.xsmall"
        :xl="blok.grid_settings.xlarge || blok.grid_settings.xsmall"
        >
        <!-- TODO: offset -->
        <!-- TODO: justify -->
        <!-- TODO: order -->
    <component :blok="blok.block[0]" :is="blok.block[0].component"/>
  </b-col>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>