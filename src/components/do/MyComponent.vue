<template>
    <div>
        <h1>{{ truncateText }}</h1>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

interface Plugins {
  truncate: (text: string) => string
}

const plugins = inject<Plugins>('plugins')
const truncateText = plugins?.truncate('My 2nd truncated text') ?? ''
</script>