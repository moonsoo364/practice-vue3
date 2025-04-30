<template>
  <DiningComponent></DiningComponent>
  <cafe-component></cafe-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DiningComponent from '@/components/do/ch03/3_10_mixin/DiningComponent.vue'
import CafeComponent from '@/components/do/ch03/3_10_mixin/CafeComponent.vue'



export default defineComponent({
  components: {DiningComponent,CafeComponent},

  name: 'MyComponent'
    ,

})
</script>
