<template>
  <h1>{{ reversedMessage }}</h1>
  <input v-model="message" type="text" placeholder="Enter your name" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: 'Hello Vue!',
      reversedMessage: 'Hello Vue!'.split('').reverse().join(''),
    }
  },
  watch: {
    message(newValue: string, oldValue: string) {
      this.reversedMessage = newValue.split('').reverse().join('')
    },
  },
})
</script>
