<template>
  <h2 class="heading">{{ message }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyMessageComponent',
  data() {
    return {
      message: 'Welcome to Vue 3!',
    }
  },
})
</script>
