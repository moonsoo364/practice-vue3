<template>
  <div>
    <p>Product : {{ product.name }}</p>
    <p>Price : {{ product.price }}</p>
    <p>Selected IDs: 
      <span v-for="curr in currentSelectedIds" :key="curr"></span>
    </p>
    <button @click="addId">Add ID</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductComp',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        price: 0,
      }),
    },
  },
  inject: {
    currentSelectedIds: {
      from: 'selectedIds',
      default: () => [],
    },
  },
  methods: {
    addId() {
      if (Array.isArray(this.currentSelectedIds)) {
        this.currentSelectedIds.push(this.currentSelectedIds.length + 1);
      }
    },
  },
})
</script>

<style scoped>
</style>
