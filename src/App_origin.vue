<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
  <router-link :to="{name:'about'}"></router-link>
  <RouterView class="view"/>
</template>


<style scoped>

</style>
