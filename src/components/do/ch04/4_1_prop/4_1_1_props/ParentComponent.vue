<template>
  <!-- <ChildComponent name="Red Sweater"></ChildComponent> -->
  <ChildComponent :name="children[0]"></ChildComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChildComponent from '@/components/do/ch04/4.1.1_props/ChildComponent.vue';

export default defineComponent({
  name: 'ParentComponent',
  components: { ChildComponent },
  data(): { children: string[] } {
    return {
      children: ['Red Sweater','Blue T-shirt','Gereen Hat']
    }
  },
})
</script>

<style scoped>

</style>
