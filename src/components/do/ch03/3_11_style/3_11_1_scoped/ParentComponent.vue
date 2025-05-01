<template>
  <section class="wrapper">
    <HeadingComponent />
    <span class="heading">!!This is span a element in parent</span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadingComponent from '@/components/do/ch03/3_11_style/HeadingComponent.vue'

export default defineComponent({
  name: 'ParentComponent',
  components: { HeadingComponent },
  data(): { title: string; description: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
    }
  },
})
</script>

<style scoped>
.wrapper :deep(p) {
  color: #000;
}
</style>
