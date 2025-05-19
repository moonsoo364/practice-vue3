<template>
    <h1>404 - Page not found</h1>
    <p>path: {{  route.path }}</p>
</template>
<script lang="ts" setup>

import {useRoute} from 'vue-router'
const route = useRoute();

</script>
