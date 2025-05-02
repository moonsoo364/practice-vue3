<template>
  <h1 class="heading">{{ title }}</h1>
  <p class="description">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  data(): { title: string; description: string; titleColor: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
      titleColor: '#178c0e',
    }
  },
})
</script>

<style scoped>
.heading {
  color: v-bind(titleColor);
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>
