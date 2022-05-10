<template>
  <b-col v-editable="blok"
        :class="blok.justify"
        :align-self="blok.alignment"
        :cols="blok.grid_settings.xsmall || 12"
        :sm="blok.grid_settings.small || (blok.grid_settings.xsmall || 12)"
        :md="blok.grid_settings.medium || (blok.grid_settings.xsmall || 12)"
        :lg="blok.grid_settings.large || (blok.grid_settings.xsmall || 12)"
        :xl="blok.grid_settings.xlarge || (blok.grid_settings.xsmall || 12)"
        :order="blok.grid_order.xsmall || 0"
        :order-sm="blok.grid_order.small || (blok.grid_order.xsmall || 0)"
        :order-md="blok.grid_order.medium || (blok.grid_order.xsmall || 0)"
        :order-lg="blok.grid_order.large || (blok.grid_order.xsmall || 0)"
        :order-xl="blok.grid_order.xlarge || (blok.grid_order.xsmall || 0)"
        :offset="blok.grid_offset.xsmall || 0"
        :offset-sm="blok.grid_offset.small || (blok.grid_offset.xsmall || 0)"
        :offset-md="blok.grid_offset.medium || (blok.grid_offset.xsmall || 0)"
        :offset-lg="blok.grid_offset.large || (blok.grid_offset.xsmall || 0)"
        :offset-xl="blok.grid_offset.xlarge || (blok.grid_offset.xsmall || 0)"
        >
    <component v-for="comp in blok.block" :key="comp._uid" :blok="comp" :is="comp.component"/>
  </b-col>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>

</style>