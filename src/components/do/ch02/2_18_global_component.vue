<template>
    <h2 class="heading">I am a Vue Component</h2>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';

export default defineComponent({
    setup() {
        const message = 'Welcome to Vue 3';
        return () => h('div', message);
    },
})
</script>