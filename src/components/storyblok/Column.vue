<template>
  <b-col v-editable="blok"
        :class="blok.justify"
        :align-self="blok.alignment"
        :cols="blok.grid_settings.xsmall || 12"
        :sm="blok.grid_settings.small || blok.grid_settings.xsmall"
        :md="blok.grid_settings.medium || blok.grid_settings.xsmall"
        :lg="blok.grid_settings.large || blok.grid_settings.xsmall"
        :xl="blok.grid_settings.xlarge || blok.grid_settings.xsmall"
        :order="blok.grid_order.xsmall || 0"
        :order-sm="blok.grid_order.small || blok.grid_order.xsmall"
        :order-md="blok.grid_order.medium || blok.grid_order.xsmall"
        :order-lg="blok.grid_order.large || blok.grid_order.xsmall"
        :order-xl="blok.grid_order.xlarge || blok.grid_order.xsmall"
        :offset="blok.grid_offset.xsmall || 0"
        :offset-sm="blok.grid_offset.small || blok.grid_offset.xsmall"
        :offset-md="blok.grid_offset.medium || blok.grid_offset.xsmall"
        :offset-lg="blok.grid_offset.large || blok.grid_offset.xsmall"
        :offset-xl="blok.grid_offset.xlarge || blok.grid_offset.xsmall"
        >
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