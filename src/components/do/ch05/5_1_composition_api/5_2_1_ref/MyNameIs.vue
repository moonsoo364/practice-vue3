<template>
  <div>
    <h2 class="heading">{{ message }}</h2>
    <input type="text" v-model="message" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const message = ref('Hello, Vue 3!')
</script>
