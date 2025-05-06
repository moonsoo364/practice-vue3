<template>
  <div>
    <h2 class="heading">{{ message }}</h2>
    <input type="text" v-model="message" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const message = ref('Hello, Vue 3!')
    return { message }
  },
}
</script>
